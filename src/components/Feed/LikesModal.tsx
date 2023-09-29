import React from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "../../styles/Feed/LikesModal.module.css";
import PostRequest from "../../model/request/PostRequest";
import UserResponse from "../../model/response/UserResponse";
import FriendCard from "./FriendCard";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";

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
  const user = useLoggedUserInformation()
  return (
    <Card className={classes.modal}>
      <header className={classes.likesHeader}>
        <h2>Likes</h2>
      </header>
      <div className={classes.content}>
        <FriendCard avatar="" />
      </div>
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
