import { useEffect, useState } from "react";
import CreatePost from "../components/Post/CreatePost";
import useHttp from "../hooks/useHttp";
import Posts from "../model/response/PostsResponse";
import PostsComponent from "../components/Post/PostsComponent";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";
import LoadingPage from "./LoadingPage";
import Post from "../model/response/Post";
import classes from "../styles/Pages/Feed.module.css";
import RecommendedFriendList from "../components/Recommendation/Friend/RecommendedFriendList";
import RecommendedPageList from "../components/Recommendation/Page/RecommendedPageList";

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
  }, []);

  const addPostToPostsList = (post: Post) => {
    setPosts((prevPosts) => new Posts([post, ...prevPosts.posts]));
  };

  const applyDeleteData = (post: Post) => {
    setPosts((prevState) => new Posts(prevState.posts.filter((currentPost) => currentPost.id != post.id)))
  }

  const sendDeletePostRequest = (postId: number) => {
    sendGetPostsRequest(
      {
        url:
          "http://localhost:8081/api/v1/post/delete" +
          "?postId=" + postId,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyDeleteData
    );
  }

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <div className={classes.mainContainer}>
          <div className={classes.friendRecommendations}>
            <RecommendedPageList />
          </div>
          <div>
            <div className={classes.createPostContainer}>
              <CreatePost
                onCreatePost={addPostToPostsList}
                onCreatePagePost={() => {}}
                type="post"
              />
            </div>
            <div className={classes.postsContainer}>
              <PostsComponent posts={posts!} onDeletePost={sendDeletePostRequest}/>
            </div>
          </div>
          <div className={classes.friendRecommendations}>
            <RecommendedFriendList />
          </div>
        </div>
      )}
    </>
  );
};

export default Feed;
