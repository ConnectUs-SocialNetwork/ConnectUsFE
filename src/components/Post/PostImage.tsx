import React from "react";
import classes from '../../styles/Feed/PostImage.module.css'

interface PostImageProps {
  imageSrc: string;
  altText: string;
}

const PostImage: React.FC<PostImageProps> = ({ imageSrc, altText }) => {

  const imageInBase64 = 'data:image/jpeg;base64,' + imageSrc;

  return (
    <div className={classes.imageContainer}>
      <img className={classes.image} src={imageInBase64} alt={altText} width="590" height="400"/>
    </div>
  );
};

export default PostImage;
