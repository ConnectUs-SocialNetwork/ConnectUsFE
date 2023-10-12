import Post from "../model/response/Post";
import PostComponent from "../components/Post/Post";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";
import LoadingPage from "./LoadingPage";
import classes from '../styles/Pages/ViewPostPage.module.css'

const ViewPostPage = () => {
  const [post, setPost] = useState<Post>();
  const params = useParams();
  const userInformation = useLoggedUserInformation();
  const { isLoading, sendRequest } = useHttp();

  const applyData = (post: Post) => {
    setPost(post);
  };

  console.log("aaaaaaaaa")

  useEffect(() => {
    sendRequest(
        {
          url:
            "http://localhost:8081/api/v1/post/getPost?postId=" +
            params.postId +
            "&myId=" +
            userInformation?.user.id,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInformation?.tokens.accessToken,
          },
        },
        applyData
      );
  }, [])

  return (
    <div className={classes.viewPostContainer}>
        {isLoading && <LoadingPage />}
        {!isLoading && post &&  <PostComponent post={post!} />}
    </div>
  );
};

export default ViewPostPage;
