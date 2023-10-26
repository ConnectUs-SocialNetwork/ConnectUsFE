import CommentResponse from "../../model/response/CommentResponse";
import classes from "../../styles/Comments/Comment.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import CommentText from "./CommentText";
import { useState } from "react";
import ConfirmModal from "../UI/ConfirmModal";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";

interface CommentProp {
  comment: CommentResponse;
  onDelete: (commentId: number) => void;
}

const Comment: React.FC<CommentProp> = ({ comment, onDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const userInformation = useLoggedUserInformation();
  var imageInBase64;

  if (comment.profilePicture) {
    imageInBase64 = "data:image/jpeg;base64," + comment.profilePicture;
  } else {
    imageInBase64 = BlankProfilePicture;
  }
  return (
    <div className={classes.commentContainer}>
      {showConfirmModal && (
        <ConfirmModal
          entityId={comment.id}
          message="Are you sure you want to delete the comment?"
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            onDelete(comment.id);
            setShowConfirmModal(false);
          }}
        />
      )}
      <div className={classes.profileImageContainer}>
        <img
          src={imageInBase64}
          alt="Profile image"
          className={classes.profileImage}
        />
      </div>
      <div className={classes.commentContentContainer}>
        <div>
          <p className={classes.credentials}>
            {comment.firstname} {comment.lastname}
          </p>
          {comment.userId === userInformation?.user.id && (
            <button
              className={classes.trash}
              onClick={() => setShowConfirmModal(true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
        <CommentText text={comment.text} />
      </div>
    </div>
  );
};

export default Comment;
