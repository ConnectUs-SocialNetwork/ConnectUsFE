import React, { useState } from "react";
import StyledButton from "../UI/StyledButton";
import classes from "../../styles/Feed/PostActions.module.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import useHttp from "../../hooks/useHttp";

interface PostActionsProps {
  postId: number;
  liked: boolean;
  numberOfLikes: number;
  numberOfComments: number;
  path: string;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  liked,
  numberOfLikes,
  numberOfComments,
  path,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likesCounter, setLikesCounter] = useState(numberOfLikes);
  const [commentCounter, setCommentsCounter] = useState(numberOfComments);
  const [likesModalOpen, setLikesModalOpen] = useState(false);
  const userInformation = useLoggedUserInformation();
  const { sendRequest: sendLikeRequest } = useHttp();
  const { sendRequest: sendUnlikeRequest } = useHttp();

  var likesString = "";
  var commentsString = "";

  if (likesCounter === 1) {
    likesString = "like";
  } else if (likesCounter > 1) {
    likesString = "likes";
  }

  if (commentCounter === 1) {
    commentsString = "comment";
  } else if (commentCounter > 1) {
    commentsString = "comments";
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
            "http://localhost:8081/api/v1/" +
            path +
            "/unlike?userId=" +
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
            "http://localhost:8081/api/v1/" +
            path +
            "/like?userId=" +
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

  //{likesModalOpen && <LikesModal likes={likes} onClose={() => {setLikesModalOpen(false)}}/>}
  return (
    <>
      <div>
        <div className={classes.likesAndCommentsContainer}>
          <div className={classes.likes}>
            <p
              className={classes.likesText}
              onClick={() => setLikesModalOpen(true)}
            >
              {likesCounter === 0 ? "" : likesCounter} {likesString}
            </p>
          </div>
          <div className={classes.comments}>
            <p className={classes.commentText}>
              {commentCounter === 0 ? "" : commentCounter} {commentsString}
            </p>
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
