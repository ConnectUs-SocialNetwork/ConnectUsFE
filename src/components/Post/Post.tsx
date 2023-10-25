import React, { useState } from "react";
import AvatarAndFullName from "./AvatarAndFullName";
import classes from "../../styles/Feed/Post.module.css";
import PostText from "./PostText";
import PostActions from "./PostActions";
import Post from "../../model/response/Post";
import AddComment from "../Comments/AddComment";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import CommentResponse from "../../model/response/CommentResponse";
import ImageSlider from "./ImageSlider";

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  const userInformation = useLoggedUserInformation();
  const [numberOfComments, setNumberOfComments] = useState(
    post.numberOfComments
  );

  const addComment = (data: CommentResponse) => {
    setNumberOfComments((prevState) => prevState + 1);
  };

  return (
    <>
      <div className={classes.postContainer}>
        <AvatarAndFullName
          time={post.dateAndTime}
          firstname={post.firstname}
          lastname={post.lastname}
          userId={post.userId}
          profilePicture={post.profileImage}
          taggedUsers={post.taggedUsers}
        />
        <PostText text={post.text} />
        {post.images.length !== 0 && <ImageSlider images={post.images} />}
        <PostActions
          postId={post.id}
          liked={post.liked}
          numberOfLikes={post.numberOfLikes}
          numberOfComments={numberOfComments}
          path="post"
        />
        <AddComment
          imageSrc={userInformation?.user.profileImage!}
          postId={post.id}
          path="comment"
          onAddComment={addComment}
        />
      </div>
    </>
  );
};

export default PostComponent;
