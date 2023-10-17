import classes from "../../styles/Feed/AddComment.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useHttp from "../../hooks/useHttp";
import { useState } from "react";
import CommentRequest from "../../model/request/CommentRequest";
import CommentResponse from "../../model/response/CommentResponse";

interface AddCommentProps {
  imageSrc: string;
  postId: number;
  path: string;
  onAddComment: (comment: CommentResponse) => void;
}

const AddComment: React.FC<AddCommentProps> = (props) => {
  const [text, setText] = useState("");
  const user = useLoggedUserInformation();
  const { sendRequest: saveComment } = useHttp();

  const applyData = (commentData: CommentResponse) => {
    props.onAddComment(commentData);
    setText("");
  };

  const handleSaveComment = () => {
    let commentData = new CommentRequest(text, user?.user.id!, props.postId);

    saveComment(
      {
        url: "http://localhost:8081/api/v1/" + props.path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user?.tokens.accessToken,
        },
        body: commentData,
      },
      applyData
    );
  };

  var imageInBase64;

  if (props.imageSrc) {
    imageInBase64 = "data:image/jpeg;base64," + props.imageSrc;
  } else {
    imageInBase64 = BlankProfilePicture;
  }

  return (
    <div className={classes.addCommentContainer}>
      <img src={imageInBase64} className={classes.img} />

      <input
        type="text"
        className={classes.input}
        value={text}
        placeholder="Write a comment..."
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button className={classes.button} onClick={handleSaveComment}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default AddComment;
