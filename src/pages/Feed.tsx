import { useEffect, useState, useMemo } from "react";
import CreatePost from "../components/Feed/CreatePost";
import useHttp from "../hooks/useHttp";
import Posts from "../model/response/PostsResponse";
import PostsComponent from "../components/Feed/PostsComponent";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";

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
        },
      },
      applyData
    );

    console.log("Render iz useEffect hooka u Feed komponenti.");
  }, []);

  console.log("Render iz Feed komponente");

  return (
    <>
      <CreatePost />
      <PostsComponent posts={posts!} />
    </>
  );
};

export default Feed;
