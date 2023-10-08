import { useEffect, useState } from "react";
import CreatePost from "../components/Post/CreatePost";
import useHttp from "../hooks/useHttp";
import Posts from "../model/response/PostsResponse";
import PostsComponent from "../components/Post/PostsComponent";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";
import LoadingPage from "./LoadingPage";
import Post from "../model/response/Post";
import classes from '../styles/Pages/Feed.module.css'

const Feed = () => {
  const [posts, setPosts] = useState<Posts>(new Posts([]));
  const { isLoading, sendRequest: sendGetPostsRequest } = useHttp();
  const userInformation = useLoggedUserInformation();

  const applyData = (posts: Posts) => {
    if (posts === undefined) {
      setPosts(new Posts([]));
    } else {
      setPosts(posts);
    }
  };

  useEffect(() => {
    sendGetPostsRequest(
      {
        url:
          "http://localhost:8081/api/v1/post/feed" +
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

    console.log("Render iz useEffect hooka u Feed komponenti.");
  }, []);

  console.log("Render iz Feed komponente");

  const addPostToPostsList = (post: Post) => {
    setPosts((prevPosts) => new Posts([post, ...prevPosts.posts]));
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <>
          <div className={classes.createPostContainer}>
            <CreatePost onCreatePost={addPostToPostsList} onCreatePagePost={() => {}} type="post"/>
          </div>
          <PostsComponent posts={posts!} />
        </>
      )}
    </>
  );
};

export default Feed;
