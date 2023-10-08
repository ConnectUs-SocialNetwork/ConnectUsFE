import { useEffect, useState } from "react";
import Posts from "../../../../model/response/PagePostsResponse";
import useHttp from "../../../../hooks/useHttp";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import LoadingPage from "../../../../pages/LoadingPage";
import { useParams } from "react-router-dom";
import PostsComponent from "../../../PagePost/PostsComponent";
import classes from "../../../../styles/Pages/Feed.module.css";
import PagePost from "../../../../model/response/PagePostResponse";
import CreatePost from "../../../PagePost/CreatePost";

const PagePostsList = () => {
  const [posts, setPosts] = useState<Posts>(new Posts([]));
  const { isLoading, sendRequest: sendGetPostsRequest } = useHttp();
  const userInformation = useLoggedUserInformation();
  const params = useParams();

  const applyData = (posts: Posts) => {
    console.log(posts)
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
          "http://localhost:8081/api/v1/page-post/getPagePosts?pageId=" +
          params.pageId +
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
  }, []);

  const addPostToPostsList = (post: PagePost) => {
    setPosts((prevPosts) => new Posts([post, ...prevPosts.posts]));
  };

  console.log(userInformation?.user.id + params.administratorId!)

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <div>
          {userInformation?.user.id == params.administratorId && (
            <div className={classes.createPostContainer}>
              <CreatePost
                onCreatePost={(post: PagePost) => {
                  addPostToPostsList(post);
                }}
              />
            </div>
          )}
          <PostsComponent posts={posts!} />
        </div>
      )}
    </>
  );
};

export default PagePostsList;
