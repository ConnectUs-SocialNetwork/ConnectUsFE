import React, { useState } from "react";
import AvatarAndFullName from "./AvatarAndFullName";
import classes from "../../styles/Feed/Post.module.css";
import PostText from "../Post/PostText";
import PagePost from "../../model/response/PagePostResponse";
import AddComment from "../Comments/AddComment";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import PostActions from "./PostActions";
import CommentResponse from "../../model/response/CommentResponse";
import ImageSlider from "../Post/ImageSlider";

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
        profilePicture={post.profileImage}
      />
      <PostText text={post.text} />
      {post.images.length !== 0 && (
        <ImageSlider images={post.images} />
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
