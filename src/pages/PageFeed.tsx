import { useEffect, useState } from "react";
import PagePosts from "../model/response/PagePostsResponse";
import useHttp from "../hooks/useHttp";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";
import LoadingPage from "./LoadingPage";
import PostsComponent from "../components/PagePost/PostsComponent";
import classes from '../styles/Pages/PageFeed.module.css'

const PageFeed = () => {
    const [posts, setPosts] = useState<PagePosts>(new PagePosts([]));
  const { isLoading, sendRequest: sendGetPostsRequest } = useHttp();
  const userInformation = useLoggedUserInformation();

  const applyData = (posts: PagePosts) => {
    if (posts === undefined) {
      setPosts(new PagePosts([]));
    } else {
      setPosts(posts);
    }
  };

  useEffect(() => {
    sendGetPostsRequest(
      {
        url:
          "http://localhost:8081/api/v1/page-post/feed" +
          "?userId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyData
    );
  }, []);

  console.log("Render iz Feed komponente");

  return (
    <div className={classes.pageFeedContainer}>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <>
          <PostsComponent posts={posts!} />
        </>
      )}
    </div>
  );
};

export default PageFeed;