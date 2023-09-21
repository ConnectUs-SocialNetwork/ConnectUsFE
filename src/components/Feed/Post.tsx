import React from 'react';
import AvatarAndFullName from "./AvatarAndFullName";
import classes from '../../styles/Feed/Post.module.css'
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import Post from "../../model/response/Post";

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => { 
  return (
    <div className={classes.postContainer}>
      <AvatarAndFullName time={post.dateAndTime}/>
      <PostText text={post.text} />
      <PostImage imageSrc={post.imageInBase64} altText="slika" />
      <PostActions postId={post.id}/>
    </div>
  );
};

export default PostComponent;
