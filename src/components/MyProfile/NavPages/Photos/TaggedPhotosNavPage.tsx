import { useEffect, useState } from "react";
import ImageResponse from "../../../../model/response/ImageResponse";
import classes from "../../../../styles/MyProfile/PhotosNavPage.module.css";
import useHttp from "../../../../hooks/useHttp";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../UI/Spinner";

const TaggedPhotosNavPage = () => {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const { isLoading, sendRequest } = useHttp();
  const userInformation = useLoggedUserInformation();
  const navigate = useNavigate();

  useEffect(() => {
    getImages();
  }, []);

  const applyImages = (images: ImageResponse[]) => {
    setImages(images);
  };

  const getImages = () => {
    sendRequest(
      {
        url:
          "http://localhost:8081/api/v1/image/getUserTaggedImages?userId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyImages
    );
  };

  return (
    <div className={classes.userImages}>
      {isLoading && <Spinner />}
      {!isLoading &&
        images.map((image, index) => (
          <div
            className={classes.imageWrapper}
            key={index}
            onClick={() => {
              navigate("/viewPost/" + image.postId);
            }}
          >
            <img
              src={`data:image/jpeg;base64,${image.image}`}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
    </div>
  );
};

export default TaggedPhotosNavPage;
