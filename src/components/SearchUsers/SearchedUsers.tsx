import React from "react";
import ReactDOM from "react-dom";
import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import classes from "../../styles/SearchUsers/SearchedUser.module.css";
import FriendCard from "./FriendCard";

interface BackdropProps {
  onConfirm: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

interface ModalOverlayProps {
  users: SearchUserResponse[];
  onClose: () => void;
}

const SearchedUsersOverlay: React.FC<ModalOverlayProps> = (props) => {
  const firstSevenUsers = props.users.slice(0, 7);
  return (
    <div className={classes.searchedUsersContainer}>
      <ul className={classes.ul}>
        {firstSevenUsers.map((user) => (
          <li key={user.id}>
            <FriendCard user={user} />
          </li>
        ))}
      </ul>
      {props.users.length > 7 && (
        <button className={classes.button}>Show all users</button>
      )}
    </div>
  );
};

interface SearchedUserComponentProps {
  users: SearchUserResponse[];
  onClose: () => void;
}

const SearchedUserComponent: React.FC<SearchedUserComponentProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <SearchedUsersOverlay users={props.users} onClose={props.onClose} />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default SearchedUserComponent;
