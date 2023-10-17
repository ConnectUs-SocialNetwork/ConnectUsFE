import { useEffect, useRef, useState } from "react";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import classes from "../../../../styles/Profile/Header/Credentials.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import useHttp from "../../../../hooks/useHttp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as base64 from "base64-js";
import UpdatePageRequest from "../../../../model/request/UpdatePageRequest";
import PageResponse from "../../../../model/response/PageResponse";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface CredentialsProps {
  id: number;
  name: string;
  description: string;
  numberOfLikes: number;
  liked: boolean;
}

const Credentials: React.FC<CredentialsProps> = (props) => {
  const [liked, setLiked] = useState(props.liked);
  const [numberOfLikes, setNumberOfLikes] = useState(props.numberOfLikes);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const userInformations = useLoggedUserInformation();
  const params = useParams();
  const userInformation = useLoggedUserInformation();
  const { sendRequest } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(props.liked);
    setNumberOfLikes(props.numberOfLikes);
  }, [props.liked, props.numberOfLikes]);

  const applyData = () => {
    if (liked) {
      setNumberOfLikes((prevState) => prevState - 1);
    } else {
      setNumberOfLikes((prevState) => prevState + 1);
    }
    setLiked(!liked);
  };

  const handleSendRequest = () => {
    if (!liked) {
      sendRequest(
        {
          url:
            "http://localhost:8081/api/v1/page/like?" +
            "pageId=" +
            params.pageId +
            "&userId=" +
            userInformation?.user.id,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInformation?.tokens.accessToken,
          },
        },
        applyData
      );
    } else {
      sendRequest(
        {
          url:
            "http://localhost:8081/api/v1/page/unlike?" +
            "pageId=" +
            params.pageId +
            "&userId=" +
            userInformation?.user.id,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInformation?.tokens.accessToken,
          },
        },
        applyData
      );
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result && typeof result === "object") {
          // Konvertujemo rezultat u Uint8Array
          const buffer = new Uint8Array(result);
          // Enkodiranje slike u base64
          const encodedImage = base64.fromByteArray(buffer);

          const requestData = new UpdatePageRequest(
            props.id,
            null,
            null,
            null,
            encodedImage
          );

          console.log(requestData)
          sendUpdatePageRequest(requestData);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const applyPageResponseData = (pageResponse: PageResponse) => {
    window.location.reload();
  };

  const sendUpdatePageRequest = (requestData: UpdatePageRequest) => {
    sendRequest(
      {
        url: "http://localhost:8081/api/v1/page/update",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformations?.tokens.accessToken,
        },
        body: requestData,
      },
      applyPageResponseData
    );
  };

  return (
    <>
      <div className={classes.credentialsContainer}>
        <p className={classes.nameAndSurname}>{props.name}</p>
        <p className={classes.numberOfFriends}>
          Number of likes: {numberOfLikes}
        </p>
        <p className={classes.description}>Description: {props.description}</p>
      </div>
      <div>
        <div className={classes.headerActions}>
          <button className={classes.button} onClick={handleSendRequest}>
            {!liked && (
              <>
                <FontAwesomeIcon icon={faThumbsUp} size="xl" />
                <p className={classes.p}>Like</p>
              </>
            )}
            {liked && (
              <>
                <FontAwesomeIcon icon={faThumbsDown} size="xl" />
                <p className={classes.p}>Unlike</p>
              </>
            )}
          </button>
        </div>
        {userInformation?.user.id == params.administratorId && (
          <>
            <div className={classes.headerActions}>
              <button className={classes.button} onClick={() => {navigate("/editPage/" + props.id)}}>
                <>
                  <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                  <p className={classes.p}>Edit</p>
                </>
              </button>
            </div>
            <div className={classes.headerActions}>
              <button className={classes.button} onClick={handleButtonClick}>
                <>
                  <FontAwesomeIcon icon={faImage} size="xl" />
                  <p className={classes.p}>Change picture</p>
                </>
              </button>
              <input
        type="file"
        accept="image/jpeg"
        id="imageInput"
        ref={fileInputRef}
        className={classes.fileInput}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Credentials;
