import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "../../styles/Feed/TagUserModal.module.css";
import Card from "../UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import useHttp from "../../hooks/useHttp";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import Spinner from "../UI/Spinner";

interface ModalOverlayProps {
  onAddTaggedFriend: (id: SearchUserResponse) => void;
  onRemoveTaggedFriend: (id: SearchUserResponse) => void;
  onOpetPostModal: () => void;
  alreadyTaggedUsers: SearchUserResponse[];
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const [friends, setFriends] = useState<SearchUserResponse[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<SearchUserResponse[]>(
    []
  );
  const [taggedFriends, setTaggedFriends] = useState<SearchUserResponse[]>(props.alreadyTaggedUsers);
  const { isLoading, sendRequest: sendSearchRequest } = useHttp();
  const userInformation = useLoggedUserInformation();

  const applyData = (users: SearchUserResponse[]) => {
    setFriends(users);
  
    if (props.alreadyTaggedUsers.length !== 0) {
      const updatedFilteredFriends = filteredFriends.filter((user) => (
        !props.alreadyTaggedUsers.some((taggedUser) => taggedUser.id === user.id)
      ));
      setFilteredFriends(updatedFilteredFriends);
    } else {
      setFilteredFriends(users);
    }
  };
  

  useEffect(() => {
    sendSearchRequest(
      {
        url:
          "http://localhost:8081/api/v1/user/getUserFriends" +
          "?userId=" +
          userInformation?.user.id +
          "&myId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyData
    );
  }, []);

  const addTaggedFriend = (friend: SearchUserResponse) => {
    setTaggedFriends((prevState) => [...prevState, friend]);
    setFilteredFriends((prevState) => prevState.filter((user) => user.id != friend.id));
    props.onAddTaggedFriend(friend);
  };

  const removeTaggedFriend = (friend: SearchUserResponse) => {
    setTaggedFriends((prevState) =>
      prevState.filter((user) => user.id != friend.id)
    );
    setFilteredFriends((prevState) => [...prevState, friend]);
    props.onRemoveTaggedFriend(friend);
  };

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
  
    const updatedFilteredFriends = friends.filter((friend) => {
      const fullName = `${friend.firstname} ${friend.lastname}`.toLowerCase();
      return (
        fullName.includes(searchText) &&
        !props.alreadyTaggedUsers.some((taggedUser) => taggedUser.id === friend.id)
      );
    });
  
    setFilteredFriends(updatedFilteredFriends);
  };
  

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2 className={classes.h2}>Tag friends</h2>
        <button className={classes.backButton} onClick={props.onOpetPostModal}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </header>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search friends..."
          className={classes.searchInput}
          onChange={handleOnInputChange}
        />
        <button className={classes.finish} onClick={props.onOpetPostModal}>
          Finish
        </button>
      </div>
      {taggedFriends && taggedFriends.length > 0 && (
        <div className={classes.taggedFriendContainer}>
          <p>Tagged users</p>
          <div>
            {taggedFriends.map((taggedFriend) => (
              <>
                <div key={taggedFriend.id}>
                  <p>
                    {taggedFriend.firstname} {taggedFriend.lastname}{" "}
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => removeTaggedFriend(taggedFriend)}
                      className={classes.removeIcon}
                    />
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
      <div className={classes.friendsConatiner}>
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            {filteredFriends.map((friend) => {
              var imageInBase64;

              if (friend.profileImage) {
                imageInBase64 = "data:image/jpeg;base64," + friend.profileImage;
              } else {
                imageInBase64 = BlankProfilePicture;
              }
              return (
                <div
                  className={classes.friendContainer}
                  onClick={() => addTaggedFriend(friend)}
                >
                  <img src={imageInBase64} className={classes.img} />
                  <p>
                    {friend.firstname} {friend.lastname}
                  </p>
                </div>
              );
            })}
          </>
        )}
        {!isLoading && friends && friends.length === 0 && <>
          <h3 className={classes.message}>You dont have friends!</h3>
        </>}
      </div>
    </Card>
  );
};

interface PostModalProps {
  onAddTaggedFriend: (id: SearchUserResponse) => void;
  onRemoveTaggedFriend: (id: SearchUserResponse) => void;
  onOpetPostModal: () => void;
  onClose: () => void;
  alreadyTaggedUsers: SearchUserResponse[];
}

const TagUserModal: React.FC<PostModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay
          onAddTaggedFriend={props.onAddTaggedFriend}
          onRemoveTaggedFriend={props.onRemoveTaggedFriend}
          onOpetPostModal={props.onOpetPostModal}
          alreadyTaggedUsers={props.alreadyTaggedUsers}
        />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default TagUserModal;
