import React from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "../../styles/Feed/LikesModal.module.css";
import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import UserCart from "../Search/Users/UserCart";

interface BackdropProps {
  onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

interface ModalOverlayProps {
  onClose: () => void;
  users: SearchUserResponse[];
  title: string;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.likesHeader}>
        <h2>{props.title}</h2>
      </header>
      {props.users.length !== 0 && (
        <div className={classes.content}>
          {props.users.map((user) => (
            <UserCart user={user} key={user.id}/>
          ))}
        </div>
      )}
    </Card>
  );
};

interface LikesModalProps {
  users: SearchUserResponse[];
  title: string;
  onClose: () => void;
}

const UsersModal: React.FC<LikesModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} users={props.users} title={props.title}/>,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default UsersModal;
