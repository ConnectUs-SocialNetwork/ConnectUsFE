import RecommendedUserResponse from "../../../model/response/RecommendedUserResponse";
import classes from "../../../styles/Recommendation/Friend/RecommendedFriend.module.css";
import BlankProfilePicture from "../../../assets/BlankProfilePicture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import useHttp from "../../../hooks/useHttp";
import ProcessRequestDTO from "../../../model/request/ProcessRequestDTO";
import FriendRequestDTO from "../../../model/request/FriendRequestDTO";
import FriendRequestResponse from "../../../model/response/FriendRequestResponse";

interface RecommendedFriendProps {
  user: RecommendedUserResponse;
  onRemove: (user: RecommendedUserResponse) => void;
}

const RecommendedFriend: React.FC<RecommendedFriendProps> = ({
  user,
  onRemove,
}) => {
  const [iSentFriendRequest, setiSendFriendRequest] = useState(
    user.requestSentByMe
  );
  const [heSentFriendRequest, setHeSendFriendRequest] = useState(
    user.heSentFriendRequest
  );
  const userInformation = useLoggedUserInformation();
  const { isLoading, sendRequest } = useHttp();
  const navigate = useNavigate();
  var imageInBase64;

  if (user.profileImage) {
    imageInBase64 = "data:image/jpeg;base64," + user.profileImage;
  } else {
    imageInBase64 = BlankProfilePicture;
  }

  const applyProcessRequestData = (data: any) => {
    if (data.status === "REJECTED") {
      setHeSendFriendRequest(false);
      setiSendFriendRequest(false);
    } else {
      onRemove(user);
    }
  };

  const processRequest = (accept: boolean) => {
    console.log(user.requestId)
    const requestData = new ProcessRequestDTO(user.requestId, accept);
    sendRequest(
      {
        url: "http://localhost:8081/api/v1/friend-request/processRequest",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
        body: requestData,
      },
      applyProcessRequestData
    );
  };

  const applyUnsendRequest = (data: any) => {
    setiSendFriendRequest(false);
  };

  const unsendRequest = () => {
    const requestData = new FriendRequestDTO(
      userInformation?.user.id!,
      user.id
    );
    sendRequest(
      {
        url: "http://localhost:8081/api/v1/friend-request/unsendRequest",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
        body: requestData,
      },
      applyUnsendRequest
    );
  };

  const applyAddFriend = (data: FriendRequestResponse) => {
    if (data.success) {
      setiSendFriendRequest(true);
      onRemove(user)
    }
  };

  const addFriend = () => {
    const requestData = new FriendRequestDTO(
      userInformation?.user.id!,
      user.id
    );
    sendRequest(
      {
        url: "http://localhost:8081/api/v1/friend-request/addFriend",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
        body: requestData,
      },
      applyAddFriend
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <img src={imageInBase64} className={classes.img}></img>
        <div className={classes.credentialContainer}>
          <p className={classes.fullname}>
            {user.firstname} {user.lastname}
          </p>
          <p className={classes.info}>
            <FontAwesomeIcon icon={faUsers} />
            &nbsp;{user.numberOfFriends} friends
          </p>
          <p className={classes.info}>
            <FontAwesomeIcon icon={faUserGroup} />
            &nbsp;{user.numberOfMutualFriends} mutual friends
          </p>
          <p className={classes.info}>
            &nbsp;
            <FontAwesomeIcon icon={faLocationDot} />
            &nbsp;&nbsp;{user.country}, {user.city}
          </p>
        </div>
        <div className={classes.removeButtonContainer}>
          <button
            className={classes.removeButton}
            onClick={() => onRemove(user)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
      <div className={classes.buttomContainer}>
        {!user.heSentFriendRequest && !user.requestSentByMe && (
          <button className={classes.addButton} onClick={addFriend}>Add friend</button>
        )}
        {!user.heSentFriendRequest && user.requestSentByMe && (
          <button className={classes.addButton} onClick={unsendRequest}>
            Unsend request
          </button>
        )}
        {!user.requestSentByMe && user.heSentFriendRequest && (
          <button
            className={classes.addButton}
            onClick={() => processRequest(true)}
          >
            Accept request
          </button>
        )}
        <button
          className={classes.addButton}
          onClick={() => navigate("/viewUserProfile/" + user.id)}
        >
          View profile
        </button>
      </div>
    </div>
  );
};

export default RecommendedFriend;
