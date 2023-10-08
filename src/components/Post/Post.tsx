import React from "react";
import AvatarAndFullName from "./AvatarAndFullName";
import classes from "../../styles/Feed/Post.module.css";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import Post from "../../model/response/Post";
import AddComment from "./AddComment";

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  return (
    <div className={classes.postContainer}>
      <AvatarAndFullName
        time={post.dateAndTime}
        firstname={post.firstname}
        lastname={post.lastname}
        userId={post.userId}
        profilePicture={""}
      />
      <PostText text={post.text} />
      {post.imageInBase64 !== "" && (
        <PostImage imageSrc={post.imageInBase64} altText="slika" />
      )}
      <PostActions postId={post.id} liked={post.liked} likes={post.likes} path="post" />
      <AddComment imageSrc={post.profileImage} postId={post.id} path="comment"/>
    </div>
  );
};

export default PostComponent;
