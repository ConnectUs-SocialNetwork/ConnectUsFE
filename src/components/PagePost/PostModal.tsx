import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "../../styles/Feed/PostModal.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import LoginResponse from "../../model/response/LoginResponse";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import * as base64 from "base64-js";
import PagePostRequest from "../../model/request/PagePostRequest";

interface BackdropProps {
  onConfirm: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

interface ModalOverlayProps {
  type: string;
  pageId: string;
  onConfirm: (postData: PagePostRequest) => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [isDisabled, setIsDisabled] = useState(true);

  const userInformation: LoginResponse = useLoggedUserInformation()!;
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.type === "Media" && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
      setIsDisabled(false);
    }

    if (selectedImage) {
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
    } else if (event.target.value === "" && selectedImage === null) {
      setIsDisabled(true);
    }
  };

  const handleCreatePost = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result && typeof result === "object") {
          // Konvertujemo rezultat u Uint8Array
          const buffer = new Uint8Array(result);
          // Enkodiranje slike u base64
          const encodedImage = base64.fromByteArray(buffer);
          let postData = new PagePostRequest(
            props.pageId,
            encodedImage,
            postText
          );
          props.onConfirm(postData);
        }
      };
      reader.readAsArrayBuffer(selectedImage);
    } else {
      let postData = new PagePostRequest(props.pageId, "", postText);
      props.onConfirm(postData);
    }
  };

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <div className={classes["avatar-container"]}>
          <img
            src={
              userInformation.user.profileImage === null
                ? BlankProfilePicture
                : userInformation.user.profileImage
            }
            alt="User Avatar"
            className={classes["avatar"]}
          />
          <p className={classes.p}>
            {userInformation.user.firstname} {userInformation.user.lastname}
          </p>
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
            {selectedImage ? selectedImage.name : "No image chosen"}
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
  );
};

interface PostModalProps {
  pageId: string;
  type: string;
  onSavePost: (postData: PagePostRequest) => void;
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
          pageId={props.pageId}
          type={props.type}
          onConfirm={props.onSavePost}
        />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default PostModal;
