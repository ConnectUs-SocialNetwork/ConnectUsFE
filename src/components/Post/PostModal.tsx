import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "../../styles/Feed/PostModal.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import LoginResponse from "../../model/response/LoginResponse";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import * as base64 from "base64-js";
import PostRequest from "../../model/request/PostRequest";
import { text } from "@fortawesome/fontawesome-svg-core";

interface BackdropProps {
  onConfirm: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

interface ModalOverlayProps {
  title: string;
  message: string;
  type: string;
  onConfirm: (postData: PostRequest) => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);

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
      // Kreirajmo Promise za svaku sliku i sačekajmo da se svi završe pre nego što nastavimo
      await Promise.all(selectedImages.map(async (image) => {
        if (image) {
          const encodedImage = await readImageAsBase64(image);
          images.push(encodedImage);
        }
      }));
    }
  
    const postRequest = new PostRequest(
      userInformation.user.email,
      images,
      postText
    );
  
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
    imageInBase64 = "data:image/jpeg;base64," + userInformation.user.profileImage;
  } else {
    imageInBase64 = BlankProfilePicture;
  }

  return (
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
  title: string;
  message: string;
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
          title={props.title}
          message={props.message}
          type={props.type}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default PostModal;
