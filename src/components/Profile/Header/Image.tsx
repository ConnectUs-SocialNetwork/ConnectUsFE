import classes from "../../../styles/Profile/Header/Image.module.css";
import BlankProfilePicture from "../../../assets/BlankProfilePicture.png";

interface ImageProps {
  imageSrc: string;
}

const Image: React.FC<ImageProps> = ({ imageSrc }) => {
  var imageInBase64;

  if (imageSrc) {
    imageInBase64 = "data:image/jpeg;base64," + imageSrc;
  } else {
    imageInBase64 = BlankProfilePicture;
  }
  return (
    <>
      <img src={imageInBase64} className={classes.imageContainer} />
    </>
  );
};

export default Image;
