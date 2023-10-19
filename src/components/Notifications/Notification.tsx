import classes from "../../styles/Notifications/Notification.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import NotificationResponse from "../../model/response/NotificationResponse";
import { calculateTimeAgo1 } from "../../util/helperFuntions";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import ProcessRequestDTO from "../../model/request/ProcessRequestDTO";
import useHttp from "../../hooks/useHttp";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface NotificationProps {
  notification: NotificationResponse;
  onRemoveNotification: (notification: NotificationResponse) => void;
  isUnread: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  notification,
  onRemoveNotification,
  isUnread,
}) => {
  const navigate = useNavigate();
  const userInformation = useLoggedUserInformation();
  const formattedDateTimeFromServer = notification.dateAndTime;
  const parsedDateTime = new Date(formattedDateTimeFromServer);
  const { sendRequest } = useHttp();

  let timeAgo = calculateTimeAgo1(parsedDateTime);
  let content;

  const handleClick = () => {
    if (notification.type === "LIKE") {
      navigate("/viewPost/" + notification.entityId);
    } else if (notification.type === "PAGE_POST_LIKE") {
      navigate("/viewPagePost/" + notification.entityId);
    } else if (notification.type === "COMMENT") {
      navigate("/viewPost/" + notification.entityId);
    } else if (notification.type === "PAGE_POST_COMMENT") {
      navigate("/viewPagePost/" + notification.entityId);
    } else if (notification.type === "FRIEND_REQUEST") {
      navigate("/viewUserProfile/" + notification.entityId);
    } else if (notification.type === "PAGE_LIKE") {
      navigate(
        "/viewPage/" + notification.entityId + "/" + userInformation?.user.id
      );
    } else if (notification.type === "FRIEND_REQUEST_ACCEPTED") {
      navigate("/viewUserProfile/" + notification.entityId);
    }
  };

  const applyAcceptRequestData = (data: any) => {
    onRemoveNotification(notification);
  };

  const processRequest = (accept: boolean) => {
    const requestData = new ProcessRequestDTO(notification.requestId, accept);
    console.log(requestData);
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
      applyAcceptRequestData
    );
  };

  const applySetNotificationToReadData = (data: any) => {
    onRemoveNotification(notification);
  };

  const setNotificationToRead = () => {
    sendRequest(
      {
        url:
          "http://localhost:8081/api/v1/notification?" +
          "notificationId=" +
          notification.id,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applySetNotificationToReadData
    );
  };

  var imageInBase64;

  if(notification.avatar){
    imageInBase64 = 'data:image/jpeg;base64,' + notification.avatar;
  }else{
    imageInBase64 = BlankProfilePicture;
  }

  if (notification.type === "FRIEND_REQUEST") {
    content = (
      <div className={classes.notificationContainer} onClick={handleClick}>
        <div>
          <img
            className={classes.notificationAvatar}
            src={imageInBase64}
          />
        </div>
        <div>
          <div>
            <p className={classes.text}>
              <b>
                {notification.firstname} {notification.lastname}{" "}
              </b>
              {notification.text}
            </p>
            <p className={classes.timeAgo}>{timeAgo}</p>
          </div>
          <div className={classes.actions}>
            <button
              className={classes.button}
              onClick={(event) => {
                processRequest(true);
                event.stopPropagation();
              }}
            >
              <>
                <FontAwesomeIcon icon={faUserPlus} size="xl" />
                <p className={classes.p}>Accept request</p>
              </>
            </button>
            <button
              className={classes.button}
              onClick={(event) => {
                processRequest(false);
                event.stopPropagation();
              }}
            >
              <>
                <FontAwesomeIcon icon={faXmark} size="xl" />
                <p className={classes.p}>Delete</p>
              </>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={classes.notificationContainer} onClick={handleClick}>
        <div>
          <img
            className={classes.notificationAvatar}
            src={imageInBase64}
          />
        </div>
        <div>
          <p className={classes.text}>
            <b>
              {notification.firstname} {notification.lastname}{" "}
            </b>
            {notification.text}
          </p>
          <p className={classes.timeAgo}>{timeAgo}</p>
        </div>
        {isUnread && (
          <div>
            <button
              className={classes.readButton}
              onClick={(event) => {
                setNotificationToRead();
                event.stopPropagation();
              }}
            >
              <>
                <FontAwesomeIcon icon={faCheck} size="xl" />
              </>
            </button>
          </div>
        )}
      </div>
    );
  }

  return <>{content}</>;
};

export default Notification;
