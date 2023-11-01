import SearchUserResponse from "../../../model/response/SearchFriendsResponse";
import classes from "../../../styles/SearchUsers/AllSearchedUsers.module.css";
import NoUsers from "./NoUsers";
import UserCart from "./UserCart";

interface AllSearchedUsersProps {
  users: SearchUserResponse[];
}

const AllSearchedUsers: React.FC<AllSearchedUsersProps> = ({ users }) => {
  return (
    <div className={classes.allSearchedUsersContainier}>
      {users.length !== 0 && (
        <>
          {users.map((user) => (
              <UserCart user={user} key={user.id}/>
          ))}
        </>
      )}
      {users.length === 0 && <NoUsers />}
    </div>
  );
};

export default AllSearchedUsers;
