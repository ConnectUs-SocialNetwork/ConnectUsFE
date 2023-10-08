import React from "react";
import AvatarAndFullName from "./AvatarAndFullName";
import classes from "../../styles/Feed/Post.module.css";
import PostText from "../Post/PostText";
import PostImage from "../Post/PostImage";
import PostActions from "../Post/PostActions";
import PagePost from "../../model/response/PagePostResponse";
import AddComment from "../Post/AddComment";

interface PagePostProps {
  post: PagePost;
}

const PagePostComponent: React.FC<PagePostProps> = ({ post }) => {
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
      <PostActions postId={post.postId} liked={post.liked} likes={post.likes} path="page-post" />
      <AddComment imageSrc={post.profileImage} postId={post.postId} path="page-comment"/>
    </div>
  );
};

export default PagePostComponent;
