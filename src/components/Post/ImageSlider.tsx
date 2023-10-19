import React, { useState } from "react";
import classes from "../../styles/Feed/ImageSlider.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className={classes.sliderContainer}>
      <div className={classes.imageContainer}>
        <img
          className={classes.imageInBase64}
          src={`data:image/jpeg;base64,${images[currentImageIndex]}`}
          alt={`Image ${currentImageIndex + 1}`}
        />
      </div>
      <div className={classes.navigation}>
        {currentImageIndex > 0 && (
          <button onClick={goToPreviousImage} className={classes.prevButton}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        {currentImageIndex < images.length - 1 && (
          <button onClick={goToNextImage} className={classes.nextButton}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
