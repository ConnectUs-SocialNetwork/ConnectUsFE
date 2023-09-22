import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "../../styles/Feed/PostModal.module.css";
import PAV_0001 from "../../assets/PAV_0001.png";
import LoginResponse from "../../model/response/LoginResponse";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import * as base64 from "base64-js";
import PostRequest from "../../model/request/PostRequest";
import UserResponse from "../../model/response/UserResponse";

interface BackdropProps {
  onConfirm: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

interface ModalOverlayProps {
  onClose: (postData: PostRequest) => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>Likes</h2>
      </header>
      <div className={classes.content}></div>
      <div className={classes.actions}>
        {" "}
        <button>Post</button>
      </div>
    </Card>
  );
};

interface LikesModalProps {
  likes: UserResponse[];
  onClose: () => void;
}

const LikesModal: React.FC<LikesModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}
        />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default LikesModal;
