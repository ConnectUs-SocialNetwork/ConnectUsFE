import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import classes from "../../../styles/Profile/Header/Actions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHttp from "../../../hooks/useHttp";
import FriendRequestDTO from "../../../model/request/FriendRequestDTO";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import { useEffect, useState } from "react";
import FriendRequestResponse from "../../../model/response/FriendRequestResponse";
import ProcessRequestDTO from "../../../model/request/ProcessRequestDTO";

interface ActionsProps {
  friends: boolean;
  iSentFriendRequest: boolean;
  heSentFriendRequest: boolean;
  userId: number;
  requestId: number;
  onAddOrRemoveFriend: (type: string) => void;
}

const Actions: React.FC<ActionsProps> = (props) => {
  const [friends, setFriends] = useState(props.friends);
  const [iSentFriendRequest, setiSendFriendRequest] = useState(
    props.iSentFriendRequest
  );
  const [heSentFriendRequest, setHeSendFriendRequest] = useState(
    props.heSentFriendRequest
  );
  const userInformation = useLoggedUserInformation();
  const { isLoading, sendRequest } = useHttp();
  useHttp();

  useEffect(() => {
    setFriends(props.friends);
    setiSendFriendRequest(props.iSentFriendRequest);
    setHeSendFriendRequest(props.heSentFriendRequest);
  }, [props.friends, props.iSentFriendRequest, props.heSentFriendRequest]);

  const applyAddFriend = (data: FriendRequestResponse) => {
    if (data.success) {
      setiSendFriendRequest(true);
    }
  };

  const addFriend = () => {
    const requestData = new FriendRequestDTO(
      userInformation?.user.id!,
      props.userId
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

  const applyUnsendRequest = (data: any) => {
    setiSendFriendRequest(false);
  };

  const unsendRequest = () => {
    const requestData = new FriendRequestDTO(
      userInformation?.user.id!,
      props.userId
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

  const applyProcessRequestData = (data: any) => {
    if (data.status === "REJECTED") {
      setFriends(false);
      setHeSendFriendRequest(false);
      setiSendFriendRequest(false);
    } else {
      setFriends(true);
      props.onAddOrRemoveFriend("add");
    }
    
  };

  const processRequest = (accept: boolean) => {
    const requestData = new ProcessRequestDTO(props.requestId, accept);
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

  const applyRemoveFriendData = (data: any) => {
    setFriends(false);
    setiSendFriendRequest(false);
    setHeSendFriendRequest(false);
    props.onAddOrRemoveFriend("remove");
  };

  const removeFriendRequest = () => {
    const requestData = new ProcessRequestDTO(props.requestId, true);
    sendRequest(
      {
        url:
          "http://localhost:8081/api/v1/user/removeFriend?userId=" +
          userInformation?.user.id +
          "&friendId=" +
          props.userId,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
        body: requestData,
      },
      applyRemoveFriendData
    );
  };

  return (
    <div className={classes.headerActions}>
      {!friends && iSentFriendRequest && !heSentFriendRequest && (
        <button
          className={classes.button}
          onClick={unsendRequest}
          disabled={isLoading}
        >
          {!isLoading && (
            <>
              <FontAwesomeIcon icon={faPaperPlane} size="xl" />
              <p className={classes.p}>Unsend request</p>
            </>
          )}
          {isLoading && (
            <>
              <FontAwesomeIcon icon={faPaperPlane} size="xl" />
              <p className={classes.p}>Unsending request...</p>
            </>
          )}
        </button>
      )}
      {!friends && heSentFriendRequest && (
        <button
          className={classes.button}
          onClick={() => {
            processRequest(true);
          }}
          disabled={isLoading}
        >
          {!isLoading && (
            <>
              <FontAwesomeIcon icon={faPaperPlane} size="xl" />
              <p className={classes.p}>Accept request</p>
            </>
          )}
          {isLoading && (
            <>
              <FontAwesomeIcon icon={faPaperPlane} size="xl" />
              <p className={classes.p}>Accepting request...</p>
            </>
          )}
        </button>
      )}
      {!friends && heSentFriendRequest && (
        <button
          className={classes.button}
          onClick={() => {
            processRequest(false);
          }}
          disabled={isLoading}
        >
          {!isLoading && (
            <>
              <FontAwesomeIcon icon={faPaperPlane} size="xl" />
              <p className={classes.p}>Reject request</p>
            </>
          )}
          {isLoading && (
            <>
              <FontAwesomeIcon icon={faPaperPlane} size="xl" />
              <p className={classes.p}>Rejecting request...</p>
            </>
          )}
        </button>
      )}
      {friends && (
        <button
          className={classes.button}
          onClick={removeFriendRequest}
          disabled={isLoading}
        >
          {!isLoading && (
            <>
              <FontAwesomeIcon icon={faUserXmark} size="xl" />
              <p className={classes.p}>Remove friend</p>
            </>
          )}
          {isLoading && (
            <>
              <FontAwesomeIcon icon={faUserXmark} size="xl" />
              <p className={classes.p}>Removing friend...</p>
            </>
          )}
        </button>
      )}
      {!friends && !iSentFriendRequest && !heSentFriendRequest && (
        <button
          className={classes.button}
          onClick={addFriend}
          disabled={isLoading}
        >
          {!isLoading && (
            <>
              <FontAwesomeIcon icon={faUserPlus} size="xl" />
              <p className={classes.p}>Add friend</p>
            </>
          )}
          {isLoading && (
            <>
              <FontAwesomeIcon icon={faUserPlus} size="xl" />
              <p className={classes.p}>Adding friend...</p>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default Actions;
