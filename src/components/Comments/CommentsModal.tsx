import React from "react";
import ReactDOM from "react-dom";
import Card from "../UI/Card";
import classes from "../../styles/Comments/CommentsModal.module.css";
import CommentResponse from "../../model/response/CommentResponse";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";

interface BackdropProps {
  onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

interface ModalOverlayProps {
  onClose: () => void;
  onAddComment: (comment: CommentResponse) => void;
  comments: CommentResponse[];
  path: string;
  postId: number;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const userInformation = useLoggedUserInformation();

  return (
    <Card className={classes.modal}>
      <header className={classes.commentsHeader}>
        <h2>Comments</h2>
      </header>
      {props.comments.length !== 0 && (
        <div className={classes.content}>
          {props.comments.map((comment) => 
            <Comment comment={comment} key={comment.id} />
          )}
        </div>
      )}
      <AddComment imageSrc={userInformation?.user.profileImage!} path={props.path} postId={props.postId} onAddComment={props.onAddComment} />
    </Card>
  );
};

interface CommentsModalProps {
  comments: CommentResponse[];
  path: string;
  postId: number;
  onClose: () => void;
  onAddComment: (comment: CommentResponse) => void;
}

const CommentsModal: React.FC<CommentsModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} comments={props.comments} path={props.path} postId={props.postId} onAddComment={props.onAddComment}/>,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default CommentsModal;
