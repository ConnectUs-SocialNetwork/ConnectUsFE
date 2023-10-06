import React from "react";
import ReactDOM from "react-dom";
import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import classes from "../../styles/SearchUsers/SearchedUser.module.css";
import FriendCard from "./FriendCard";

interface ModalOverlayProps {
  users: SearchUserResponse[];
  onClose: () => void;
}

const SearchedUsersOverlay: React.FC<ModalOverlayProps> = (props) => {
  const firstSevenUsers = props.users.slice(0, 7);
  return (
    <>
      <div className={classes.searchedUsersContainer}>
        {props.users.length === 0 && (
          <div>
            <p>No users found!</p>
          </div>
        )}
        {props.users.length !== 0 && (
          <ul className={classes.ul}>
            {firstSevenUsers.map((user) => (
              <li key={user.id}>
                <FriendCard user={user} />
              </li>
            ))}
          </ul>
        )}
        {props.users.length > 7 && (
          <button className={classes.button}>Show all users</button>
        )}
      </div>
    </>
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
        <SearchedUsersOverlay users={props.users} onClose={props.onClose} />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default SearchedUserComponent;
