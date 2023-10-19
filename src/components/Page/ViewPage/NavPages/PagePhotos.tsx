import { useEffect, useState } from "react";
import ImageResponse from "../../../../model/response/ImageResponse";
import classes from "../../../../styles/Page/PagePhotos.module.css";
import useHttp from "../../../../hooks/useHttp";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import { useNavigate, useParams } from "react-router-dom";

const PagePhotos = () => {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const { isLoading, sendRequest } = useHttp();
  const userInformation = useLoggedUserInformation();
  const navigate = useNavigate();
  const params = useParams()

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
          "http://localhost:8081/api/v1/page-post-image/getPageImages?pageId=" + params.pageId,
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
    <div className={classes.container}>
      <h2 className={classes.h2}>Photos</h2>
      <div className={classes.userImages}>
      {images.map((image, index) => (
        <div
          className={classes.imageWrapper}
          key={index}
          onClick={() => {
            navigate("/viewPagePost/" + image.pagePostId);
          }}
        >
          <img
            src={`data:image/jpeg;base64,${image.image}`}
            alt={`Image ${index + 1}`}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default PagePhotos;
