import React, { useState } from "react";
import AvatarAndFullName from "./AvatarAndFullName";
import classes from "../../styles/Feed/Post.module.css";
import PostText from "../Post/PostText";
import PostImage from "../Post/PostImage";
import PagePost from "../../model/response/PagePostResponse";
import AddComment from "../Comments/AddComment";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import PostActions from "./PostActions";
import CommentResponse from "../../model/response/CommentResponse";

interface PagePostProps {
  post: PagePost;
}

const PagePostComponent: React.FC<PagePostProps> = ({ post }) => {
  const userInformation = useLoggedUserInformation();
  const [numberOfComments, setNumberOfComments] = useState(
    post.numberOfComments
  );

  const addComment = (data: CommentResponse) => {
    setNumberOfComments((prevState) => prevState + 1);
  };

  return (
    <div className={classes.postContainer}>
      <AvatarAndFullName
        time={post.dateAndTime}
        name={post.name}
        pageId={post.pageId}
        profilePicture={""}
      />
      <PostText text={post.text} />
      {post.imageInBase64 !== "" && (
        <PostImage imageSrc={post.imageInBase64} altText="slika" />
      )}
      <PostActions
        postId={post.postId}
        liked={post.liked}
        numberOfLikes={post.numberOfLikes}
        numberOfComments={numberOfComments}
        path="page-post"
      />
      <AddComment
        imageSrc={userInformation?.user.profileImage!}
        postId={post.postId}
        path="page-post-comment"
        onAddComment={addComment}
      />
    </div>
  );
};

export default PagePostComponent;
