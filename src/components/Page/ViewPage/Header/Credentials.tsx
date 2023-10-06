import { useEffect, useState } from "react";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import classes from "../../../../styles/Profile/Header/Credentials.module.css";
import { useParams } from "react-router-dom";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import useHttp from "../../../../hooks/useHttp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CredentialsProps {
  name: string;
  description: string;
  numberOfLikes: number;
  liked: boolean;
}

const Credentials: React.FC<CredentialsProps> = (props) => {
  const [liked, setLiked] = useState(props.liked);
  const [numberOfLikes, setNumberOfLikes] = useState(props.numberOfLikes)
  const params = useParams();
  const userInformation = useLoggedUserInformation();
  const { sendRequest } = useHttp();

  useEffect(() => {
    setLiked(props.liked);
    setNumberOfLikes(props.numberOfLikes)
  }, [props.liked, props.numberOfLikes]);

  const applyData = () => {
    if(liked){
        setNumberOfLikes((prevState) => prevState - 1)
    }else{
        setNumberOfLikes((prevState) => prevState + 1)
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

  return (
    <>
      <div className={classes.credentialsContainer}>
        <p className={classes.nameAndSurname}>{props.name}</p>
        <p className={classes.numberOfFriends}>
          Number of likes: {numberOfLikes}
        </p>
      </div>
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
              <FontAwesomeIcon icon={faThumbsUp} size="xl" />
              <p className={classes.p}>Unlike</p>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Credentials;
