import React from 'react'
import StyledButton from "../UI/StyledButton";
import classes from '../../styles/Feed/PostActions.module.css'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useLoggedUserInformation } from '../../hooks/useLoggedUserInformation';
import useHttp from '../../hooks/useHttp';

interface PostActionsProps{
    postId: number;
}

const PostActions:React.FC<PostActionsProps> = ({postId}) => {
    const userInformation = useLoggedUserInformation();
    const { isLoading, sendRequest: sendLikeRequest } = useHttp();

    const applyLikeData = () => {}

    const likeRequest = () => {
        sendLikeRequest(
            {
              url: "http://localhost:8081/api/v1/post/like?userId=" + userInformation?.user.id + "&postId=" + postId,
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              }
            },
            applyLikeData
          );
    
    }
    return <div className={classes.actionsContainer}>
        <StyledButton iconType={faThumbsUp} text="Like" color="blue" onClick={() => {}} />
        <StyledButton iconType={faComment} text="Comment" color="grey" onClick={() => {}} />
        <StyledButton iconType={faShare} text="Share" color="grey" onClick={() => {}} /> 
    </div>
}

export default PostActions;