import React, { useEffect, useState } from "react";
import StyledButton from "../UI/StyledButton";
import classes from "../../styles/Feed/PostActions.module.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import useHttp from "../../hooks/useHttp";
import LikesModal from "../Post/LikesModal";
import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import CommentResponse from "../../model/response/CommentResponse";
import CommentsModal from "../Comments/CommentsModal";

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
  const [usersWhoLikedPost, setUsersWhoLikedPost] = useState<
    SearchUserResponse[]
  >([]);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [isLiked, setIsLiked] = useState(liked);
  const [likesCounter, setLikesCounter] = useState(numberOfLikes);
  const [commentCounter, setCommentsCounter] = useState(numberOfComments);
  const [likesModalOpen, setLikesModalOpen] = useState(false);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const userInformation = useLoggedUserInformation();
  const { sendRequest: sendLikeRequest } = useHttp();
  const { sendRequest: sendUnlikeRequest } = useHttp();
  const { sendRequest: sendGetUsersWhoLikedPost } = useHttp();
  const { sendRequest: sendGetComments } = useHttp();

  useEffect(() => {
    setCommentsCounter(numberOfComments)
  }, [numberOfComments])

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
            Authorization: "Bearer " + userInformation?.tokens.accessToken,
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
            Authorization: "Bearer " + userInformation?.tokens.accessToken,
          },
        },
        applyLikeData
      );
    }
  };

  const applyUsersWhoLikedPostData = (data: SearchUserResponse[]) => {
    setUsersWhoLikedPost(data);
  };

  const getUserWhoLikedPost = () => {
    sendGetUsersWhoLikedPost(
      {
        url:
          "http://localhost:8081/api/v1/page-post/getUsersWhoLikedPost?postId=" +
          postId +
          "&myId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyUsersWhoLikedPostData
    );
  };

  const addCommentToList = (comment: CommentResponse) => {
    console.log("Pozivam metodu za dodavanje komentara u listu!")
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    setCommentsCounter((prevState) => prevState + 1)
  }

  const applyComments = (data: CommentResponse[]) => {
    setComments(data);
  };

  const getComments = () => {
    sendGetComments(
      {
        url:
          "http://localhost:8081/api/v1/page-post-comment?postId=" +
          postId,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyComments
    );
  };

  return (
    <>
      {likesModalOpen && (
        <LikesModal
          likes={usersWhoLikedPost}
          onClose={() => {
            setLikesModalOpen(false);
          }}
        />
      )}
      {commentsModalOpen && (
        <CommentsModal
          comments={comments}
          onClose={() => {
            setCommentsModalOpen(false);
          }}
          path="page-post-comment"
          postId={postId}
          onAddComment={addCommentToList}
        />
      )}
      <div>
        <div className={classes.likesAndCommentsContainer}>
          <div className={classes.likes}>
            <p
              className={classes.likesText}
              onClick={() => {
                setLikesModalOpen(true);
                getUserWhoLikedPost();
              }}
            >
              {likesCounter === 0 ? "" : likesCounter} {likesString}
            </p>
          </div>
          <div className={classes.comments}>
            <p
              className={classes.commentText}
              onClick={() => {
                setCommentsModalOpen(true);
                getComments();
              }}
            >
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
