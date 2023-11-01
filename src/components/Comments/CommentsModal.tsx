import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Card from "../UI/Card";
import classes from "../../styles/Comments/CommentsModal.module.css";
import CommentResponse from "../../model/response/CommentResponse";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import NoComment from "./NoComments";

interface BackdropProps {
  onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

interface ModalOverlayProps {
  onClose: () => void;
  onAddComment: (comment: CommentResponse) => void;
  onDelete: (commentId: number) => void;
  comments: CommentResponse[];
  path: string;
  postId: number;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const [comments, setComments] = useState<CommentResponse[]>(props.comments);
  const userInformation = useLoggedUserInformation();

  useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);

  

  return (
    <Card className={classes.modal}>
      <header className={classes.commentsHeader}>
        <h2>Comments</h2>
      </header>
      {props.comments.length !== 0 && (
        <div className={classes.content}>
          {comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              onDelete={props.onDelete}
            />
          ))}
        </div>
      )}
      {props.comments.length === 0 && <NoComment />}
      <AddComment
        imageSrc={userInformation?.user.profileImage!}
        path={props.path}
        postId={props.postId}
        onAddComment={props.onAddComment}
      />
    </Card>
  );
};

interface CommentsModalProps {
  comments: CommentResponse[];
  path: string;
  postId: number;
  onClose: () => void;
  onAddComment: (comment: CommentResponse) => void;
  onDelete: (commentId: number) => void;
}

const CommentsModal: React.FC<CommentsModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.onClose}
          comments={props.comments}
          path={props.path}
          postId={props.postId}
          onAddComment={props.onAddComment}
          onDelete={props.onDelete}
        />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default CommentsModal;
