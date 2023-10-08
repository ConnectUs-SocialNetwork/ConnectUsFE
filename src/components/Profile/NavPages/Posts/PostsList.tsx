import { useEffect, useState } from "react";
import Posts from "../../../../model/response/PostsResponse";
import PostsComponent from "../../../Post/PostsComponent";
import useHttp from "../../../../hooks/useHttp";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import LoadingPage from "../../../../pages/LoadingPage";
import { useParams } from "react-router-dom";


const PostsList = () => {
  const [posts, setPosts] = useState<Posts>(new Posts([]));
  const { isLoading, sendRequest: sendGetPostsRequest } = useHttp();
  const userInformation = useLoggedUserInformation();
  const params = useParams()

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
          "http://localhost:8081/api/v1/post/getUserPosts?userId=" + params.userId +
          "&myId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userInformation?.tokens.accessToken,
        },
      },
      applyData
    );

    console.log("Render iz useEffect hooka u Feed komponenti.");
  }, []);

  console.log("Render iz Feed komponente");

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <div>
          <PostsComponent posts={posts!} />
        </div>
      )}
    </>
  );
};

export default PostsList;
