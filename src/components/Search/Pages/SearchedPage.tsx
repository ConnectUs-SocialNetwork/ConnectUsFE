import SearchPageResponse from "../../../model/response/SearchPageResponse";
import classes from "../../../styles/Search/SearchedPage.module.css";
import BlankProfilePicture from "../../../assets/BlankProfilePicture.png";
import StyledButton from "../../UI/StyledButton";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import useHttp from "../../../hooks/useHttp";
import { useNavigate } from "react-router-dom";

interface SearchedPageProps {
  page: SearchPageResponse;
}

const SearchedPage: React.FC<SearchedPageProps> = ({ page }) => {
  const [liked, setLiked] = useState(page.liked);
  const [numberOfLikes, setNumberOfLikes] = useState(page.numberOfLikes);
  const userInformation = useLoggedUserInformation();
  const { sendRequest } = useHttp();
  const navigate = useNavigate();

  const applyData = () => {
    if (liked) {
      setNumberOfLikes((prevState) => prevState - 1);
    } else {
      setNumberOfLikes((prevState) => prevState + 1);
    }
    setLiked(!liked);
  };

  useEffect(() => {
    setLiked(page.liked);
    setNumberOfLikes(page.numberOfLikes);
  }, [page.liked, page.numberOfLikes]);

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
  var imageInBase64;

  if (page.avatar) {
    imageInBase64 = "data:image/jpeg;base64," + page.avatar;
  } else {
    imageInBase64 = BlankProfilePicture;
  }
  return (
    <div className={classes.oneSearchedPageContainer} onClick={() => {navigate("/viewPage/" + page.id + "/" + page.administratorId)}}>
      <div className={classes.avatar}>
        <img
          src={imageInBase64}
          alt="Page Avatar"
          className={classes["avatar"]}
        />
      </div>
      <div className={classes.nameContainer}>
        <p className={classes.name}>{page.name}</p>
        <p className={classes.category}>Category: {page.category}</p>
        <p className={classes.numberOfLikes}>
          Number of likes: {numberOfLikes}
        </p>
      </div>
      <div className={classes.buttonContainer}>
        {liked && (
          <StyledButton
            color="black"
            iconType={faThumbsDown}
            onClick={(event) => {
              handleSendRequest();
              event.stopPropagation();
            }}
            text="Unlike page"
            textColor="black"
          />
        )}
        {!liked && (
          <StyledButton
            color="black"
            iconType={faThumbsUp}
            onClick={(event) => {
              handleSendRequest();
              event.stopPropagation();
            }}
            text="Like page"
            textColor="black"
          />
        )}
      </div>
    </div>
  );
};

export default SearchedPage;
