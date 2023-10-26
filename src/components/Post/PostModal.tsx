import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Card from "../UI/Card";
import classes from "../../styles/Feed/PostModal.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import LoginResponse from "../../model/response/LoginResponse";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import * as base64 from "base64-js";
import PostRequest from "../../model/request/PostRequest";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TagUserModal from "./TagUserModal";
import SearchUserResponse from "../../model/response/SearchFriendsResponse";

interface BackdropProps {
  onConfirm: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

interface ModalOverlayProps {
  type: string;
  onConfirm: (postData: PostRequest) => void;
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const [postText, setPostText] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
  const [showPostModal, setShowPostModal] = useState(true);
  const [showTagUserModal, setShowTagUserModal] = useState(false);
  const [taggedFriendIds, setTaggedFriendIds] = useState<SearchUserResponse[]>([]);

  const [isDisabled, setIsDisabled] = useState(true);

  const userInformation: LoginResponse = useLoggedUserInformation()!;
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.type === "Media" && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const addTaggedFriend = (friend: SearchUserResponse) => {
    setTaggedFriendIds((prevState) => [...prevState, friend]);
  };

  const removeTaggedFriend = (user: SearchUserResponse) => {
    setTaggedFriendIds((prevState) => prevState.filter((friend) => friend.id != user.id))
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImages((prevState) => {
        if (prevState === null) {
          return [selectedFile];
        } else {
          return [...prevState, selectedFile];
        }
      });
      setIsDisabled(false);
    }

    if (selectedImages) {
      setIsDisabled(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(event.target.value);
    if (event.target.value !== "") {
      setIsDisabled(false);
    } else if (event.target.value === "" && selectedImages === null) {
      setIsDisabled(true);
    }
  };

  const handleCreatePost = async () => {
    var images: string[] = [];
    if (selectedImages) {
      await Promise.all(
        selectedImages.map(async (image) => {
          if (image) {
            const encodedImage = await readImageAsBase64(image);
            images.push(encodedImage);
          }
        })
      );
    }

    const postRequest = new PostRequest(
      userInformation.user.email,
      images,
      postText,
      taggedFriendIds.map((user) => user.id)
    );

    console.log(postRequest)
    console.log("User infomations: " + userInformation.user.id)

    props.onConfirm(postRequest);
  };

  // Funkcija za čitanje slike kao base64
  const readImageAsBase64 = (image: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (result && typeof result === "object") {
          const buffer = new Uint8Array(result);
          const encodedImage = base64.fromByteArray(buffer);
          resolve(encodedImage);
        } else {
          reject(new Error("Nemoguće učitati sliku."));
        }
      };

      reader.readAsArrayBuffer(image);
    });
  };

  var imageInBase64;

  if (userInformation.user.profileImage) {
    imageInBase64 =
      "data:image/jpeg;base64," + userInformation.user.profileImage;
  } else {
    imageInBase64 = BlankProfilePicture;
  }
  return (
    <>
      {showTagUserModal && (
        <TagUserModal
          onAddTaggedFriend={addTaggedFriend}
          onRemoveTaggedFriend={removeTaggedFriend}
          onClose={() => setShowTagUserModal(false)}
          onOpetPostModal={() => {
            setShowPostModal(true);
            setShowTagUserModal(false);
          }}
          alreadyTaggedUsers={taggedFriendIds}
        />
      )}
      {showPostModal && (
        <Card className={classes.modal}>
          <header className={classes.header}>
            <div className={classes["avatar-container"]}>
              <img
                src={imageInBase64}
                alt="User Avatar"
                className={classes["avatar"]}
              />
              <p className={classes.p}>
                {userInformation.user.firstname} {userInformation.user.lastname}
              </p>
              <button
                className={classes.tag}
                onClick={() => {
                  setShowPostModal(false);
                  setShowTagUserModal(true);
                }}
              >
                <FontAwesomeIcon icon={faTag} />
              </button>
            </div>
          </header>
          <div className={classes.content}>
            <textarea
              className={classes.postText}
              placeholder="What do you want to talk about?"
              onChange={handleInputChange}
              value={postText}
            />
          </div>
          <div className={classes.actions}>
            <div className={classes.fileInputContainer}>
              <button
                className={classes.fileInputButton}
                onClick={handleButtonClick}
              >
                Add image
              </button>
              <span className={classes.fileInputLabel}>
                {!selectedImages
                  ? "No image chosen"
                  : selectedImages?.map((image) => image.name).join(", ")}
              </span>
              <input
                type="file"
                accept="image/jpeg"
                id="imageInput"
                ref={fileInputRef}
                className={classes.fileInput}
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
            </div>
            <button
              onClick={handleCreatePost}
              className={classes.button}
              disabled={isDisabled}
            >
              Post
            </button>
          </div>
        </Card>
      )}
    </>
  );
};

interface PostModalProps {
  type: string;
  onConfirm: (postData: PostRequest) => void;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          type={props.type}
          onConfirm={props.onConfirm}
          onClose={props.onClose}
        />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default PostModal;
