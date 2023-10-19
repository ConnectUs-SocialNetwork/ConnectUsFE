import React from "react";
import classes from "../../styles/Feed/PostImages.module.css";

interface PostImagesProps {
  imageSrcs: string[];
  altText: string;
}

// Definirajte funkciju izvan komponente
function getImageOrientation(imageSrc: string): "landscape" | "portrait" {
  const img = new Image();
  img.src = `data:image/jpeg;base64,${imageSrc}`;
  return img.width > img.height ? "landscape" : "portrait";
}

const PostImages: React.FC<PostImagesProps> = ({ imageSrcs, altText }) => {
  const landscapeImages = imageSrcs.filter((imageSrc) => {
    return getImageOrientation(imageSrc) === "landscape";
  });

  const portraitImages = imageSrcs.filter((imageSrc) => {
    return getImageOrientation(imageSrc) === "portrait";
  });

  return (
    <div className={classes.imagesContainer}>
      <div className={classes.imageGroup}>
        {landscapeImages.map((imageSrc, index) => 
          <div key={index} className={classes.imageContainer}>
            <img src={`data:image/jpeg;base64,${imageSrc}`} alt={`${altText} ${index + 1}`} />
          </div>
        )}
      </div>
      <div className={classes.imageGroup}>
        {portraitImages.map((imageSrc, index) => 
          <div key={index} className={classes.imageContainer}>
            <img src={`data:image/jpeg;base64,${imageSrc}`} alt={`${altText} ${index + 1}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostImages;
