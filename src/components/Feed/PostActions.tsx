import React, { useState } from 'react'
import StyledButton from "../UI/StyledButton";
import classes from '../../styles/Feed/PostActions.module.css'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useLoggedUserInformation } from '../../hooks/useLoggedUserInformation';
import useHttp from '../../hooks/useHttp';

interface PostActionsProps{
    postId: number;
    liked: boolean;
}

const PostActions:React.FC<PostActionsProps> = ({postId, liked}) => {
    const [isLiked, setIsLiked] = useState(liked)
    const userInformation = useLoggedUserInformation();
    const { sendRequest: sendLikeRequest } = useHttp();
    const { sendRequest: sendUnlikeRequest } = useHttp();

    const applyLikeData = () => {
        console.log("like")
        setIsLiked(!isLiked)
    }

    const likeRequest = () => {
        if(isLiked){
            sendUnlikeRequest(
                {
                    url: "http://localhost:8081/api/v1/post/unlike?userId=" + userInformation?.user.id + "&postId=" + postId,
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  },
                  applyLikeData
            )
        }else{
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
        
    
    }
    return <div className={classes.actionsContainer}>
        <StyledButton iconType={faThumbsUp} text="Like" color={isLiked ? 'blue' : 'gray'} onClick={likeRequest} textColor={isLiked ? 'blue' : 'gray'}/>
        <StyledButton iconType={faComment} text="Comment" color="grey" onClick={() => {}} textColor='gray'/>
        <StyledButton iconType={faShare} text="Share" color="grey" onClick={() => {}} textColor='gray' /> 
    </div>
}

export default PostActions;