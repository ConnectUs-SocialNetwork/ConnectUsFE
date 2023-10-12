import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";
import LoadingPage from "./LoadingPage";
import classes from '../styles/Pages/ViewPostPage.module.css'
import PagePostComponent from "../components/PagePost/PagePost";
import PagePost from "../model/response/PagePostResponse";

const ViewPagePostPage = () => {
  const [post, setPost] = useState<PagePost>();
  const params = useParams();
  const userInformation = useLoggedUserInformation();
  const { isLoading, sendRequest } = useHttp();

  const applyData = (post: PagePost) => {
    setPost(post);
  };

  console.log("aaaaaaaaa")

  useEffect(() => {
    sendRequest(
        {
          url:
            "http://localhost:8081/api/v1/page-post/getPost?postId=" +
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
        {!isLoading && post &&  <PagePostComponent post={post!} />}
    </div>
  );
};

export default ViewPagePostPage;
