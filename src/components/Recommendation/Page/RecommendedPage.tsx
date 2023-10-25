import classes from "../../../styles/Recommendation/Friend/RecommendedFriend.module.css";
import BlankProfilePicture from "../../../assets/BlankProfilePicture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import RecommendedPageResponse from "../../../model/response/RecommendedPageResponse";
import { useState } from "react";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import useHttp from "../../../hooks/useHttp";

interface RecommendedPageProps {
  page: RecommendedPageResponse;
  onRemove: (page: RecommendedPageResponse) => void;
}

const RecommendedPage: React.FC<RecommendedPageProps> = ({ page, onRemove }) => {
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(page.numberOfLikes);
  const userInformation = useLoggedUserInformation();
  const {isLoading, sendRequest} = useHttp();
  const navigate = useNavigate();
  var imageInBase64;

  if (page.avatar) {
    imageInBase64 = "data:image/jpeg;base64," + page.avatar;
  } else {
    imageInBase64 = BlankProfilePicture;
  }

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
            page.id +
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
            page.id +
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

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <img src={imageInBase64} className={classes.img}></img>
        <div className={classes.credentialContainer}>
            <p className={classes.fullname}>{page.name}</p>
            <p className={classes.info}><FontAwesomeIcon icon={faUsers} />&nbsp;{numberOfLikes} likes</p>
            <p className={classes.info}>&nbsp;<FontAwesomeIcon icon={faPaperclip} />&nbsp;&nbsp;{page.category}</p>
        </div>
        <div className={classes.removeButtonContainer}>
          <button className={classes.removeButton} onClick={() => onRemove(page)}><FontAwesomeIcon icon={faXmark}/></button>
        </div>
      </div>
      <div className={classes.buttomContainer}>
        <button className={classes.addButton} onClick={handleSendRequest} disabled={isLoading}>
          {!liked && "Like"}
          {liked && "Unlike"}
        </button>
        <button className={classes.addButton} onClick={() => navigate("viewPage/" + page.id + "/" + page.administratorId)}>View page</button>
      </div>
    </div>
  );
};

export default RecommendedPage;
