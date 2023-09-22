import React, { useState } from "react";
import StyledButton from "../UI/StyledButton";
import classes from "../../styles/Feed/PostActions.module.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import useHttp from "../../hooks/useHttp";
import UserResponse from "../../model/response/UserResponse";
import LikesModal from "./LikesModal";

interface PostActionsProps {
  postId: number;
  liked: boolean;
  likes: UserResponse[];
}

const PostActions: React.FC<PostActionsProps> = ({ postId, liked, likes }) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likesCounter, setLikesCounter] = useState(likes.length);
  const [likesModalOpen, setLikesModalOpen] = useState(false);
  const userInformation = useLoggedUserInformation();
  const { sendRequest: sendLikeRequest } = useHttp();
  const { sendRequest: sendUnlikeRequest } = useHttp();

  var likesString = "";

  if (likesCounter === 1) {
    likesString = "like";
  } else if (likesCounter > 1) {
    likesString = "likes";
  }

  const applyLikeData = () => {
    setIsLiked(!isLiked);
    setLikesCounter(likesCounter + 1);
  };

  const applyUnlikeData = () => {
    setIsLiked(!isLiked);
    setLikesCounter(likesCounter - 1);
  };

  const likeRequest = () => {
    if (isLiked) {
      sendUnlikeRequest(
        {
          url:
            "http://localhost:8081/api/v1/post/unlike?userId=" +
            userInformation?.user.id +
            "&postId=" +
            postId,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
        applyUnlikeData
      );
    } else {
      sendLikeRequest(
        {
          url:
            "http://localhost:8081/api/v1/post/like?userId=" +
            userInformation?.user.id +
            "&postId=" +
            postId,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
        applyLikeData
      );
    }
  };
  return (
    <>
    {likesModalOpen && <LikesModal likes={likes} onClose={() => {setLikesModalOpen(false)}}/>}
      <div>
        <div className={classes.likesAndCommentsContainer}>
          <div className={classes.likes}>
            <p className={classes.likesText} onClick={() => setLikesModalOpen(true)}>
              {likesCounter === 0 ? "" : likesCounter} {likesString}
            </p>
          </div>
          <div className={classes.comments}>
            <p className={classes.commentText}>13 comments</p>
          </div>
        </div>
        <div className={classes.actionsContainer}>
          <StyledButton
            iconType={faThumbsUp}
            text="Like"
            color={isLiked ? "blue" : "gray"}
            onClick={likeRequest}
            textColor={isLiked ? "blue" : "gray"}
          />
          <StyledButton
            iconType={faComment}
            text="Comment"
            color="grey"
            onClick={() => {}}
            textColor="gray"
          />
          <StyledButton
            iconType={faShare}
            text="Share"
            color="grey"
            onClick={() => {}}
            textColor="gray"
          />
        </div>
      </div>
    </>
  );
};

export default PostActions;
