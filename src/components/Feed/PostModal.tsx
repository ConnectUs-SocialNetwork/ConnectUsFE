import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "../../styles/Feed/PostModal.module.css";
import PAV_0001 from "../../assets/PAV_0001.png";
import LoginResponse from "../../model/response/LoginResponse";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import * as base64 from "base64-js";
import PostRequest from "../../model/request/PostRequest";

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

  const [isDisabled, setIsDisabled] = useState(true);

  const userInformation: LoginResponse = useLoggedUserInformation()!;
  const fileInputRef = useRef<HTMLInputElement>(null); // Dodajte tip input elementa ovde

  useEffect(() => {
    if (props.type === "Media" && fileInputRef.current) {
      fileInputRef.current.click(); // Kliknite na skriveni input element
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
      fileInputRef.current.click(); // Kliknite na skriveni input element
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

  /*const handleCreatePost = () => {
    if(selectedImage !== null){
      imageToBase64(selectedImage).then((base64Image) => {
        console.log('Base64 slika:', base64Image);
        let postData = new PostRequest(userInformation.user.email, base64Image, postText)
        props.onConfirm(postData)
      });
      
    }else{
      let imageInBase64 = '';
      let postData = new PostRequest(userInformation.user.email, imageInBase64, postText)
      props.onConfirm(postData)
    }
  }*/
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
          let postData = new PostRequest(
            userInformation.user.email,
            encodedImage,
            postText
          );
          props.onConfirm(postData);
        }
      };
      reader.readAsArrayBuffer(selectedImage);
    }
  };

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <div className={classes["avatar-container"]}>
          <img src={PAV_0001} alt="User Avatar" className={classes["avatar"]} />
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
