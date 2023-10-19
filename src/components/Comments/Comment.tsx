import CommentResponse from "../../model/response/CommentResponse";
import classes from "../../styles/Comments/Comment.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import CommentText from "./CommentText";

interface CommentProp {
  comment: CommentResponse;
}

const Comment: React.FC<CommentProp> = ({ comment }) => {
  var imageInBase64;

  if (comment.profilePicture) {
    imageInBase64 = "data:image/jpeg;base64," + comment.profilePicture;
  } else {
    imageInBase64 = BlankProfilePicture;
  }
  return (
    <div className={classes.commentContainer}>
      <div className={classes.profileImageContainer}>
        <img
          src={imageInBase64}
          alt="Profile image"
          className={classes.profileImage}
        />
      </div>
      <div className={classes.commentContentContainer}>
        <p className={classes.credentials}>
          {comment.firstname} {comment.lastname}
        </p>
        <CommentText text={comment.text} />
      </div>
    </div>
  );
};

export default Comment;
