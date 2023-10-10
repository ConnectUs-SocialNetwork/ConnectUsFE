import React from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "../../styles/Feed/LikesModal.module.css";
import OneSearchedUser from "../SearchUsers/OneSearchedUser";
import SearchUserResponse from "../../model/response/SearchFriendsResponse";

interface BackdropProps {
  onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

interface ModalOverlayProps {
  onClose: () => void;
  likes: SearchUserResponse[];
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.likesHeader}>
        <h2>Likes</h2>
      </header>
      {props.likes.length !== 0 && (
        <div className={classes.content}>
          {props.likes.map((user) => (
            <OneSearchedUser user={user} key={user.id}/>
          ))}
        </div>
      )}
    </Card>
  );
};

interface LikesModalProps {
  likes: SearchUserResponse[];
  onClose: () => void;
}

const LikesModal: React.FC<LikesModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} likes={props.likes} />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default LikesModal;
