import SearchUserResponse from "../../../model/response/SearchFriendsResponse";
import classes from "../../../styles/SearchUsers/AllSearchedUsers.module.css";
import NoUsers from "./NoUsers";
import OneSearchedUser from "./SearchedUser";

interface AllSearchedUsersProps {
  users: SearchUserResponse[];
}

const AllSearchedUsers: React.FC<AllSearchedUsersProps> = ({ users }) => {
  return (
    <div className={classes.allSearchedUsersContainier}>
      {users.length !== 0 && (
        <>
          {users.map((user) => (
            <div key={user.id} className={classes.oneSearchedFriendContainer}>
              <OneSearchedUser user={user} />
            </div>
          ))}
        </>
      )}
      {users.length === 0 && <NoUsers />}
    </div>
  );
};

export default AllSearchedUsers;
