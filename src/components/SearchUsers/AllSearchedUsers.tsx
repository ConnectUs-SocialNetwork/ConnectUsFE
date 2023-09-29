import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import classes from "../../styles/SearchUsers/AllSearchedUsers.module.css";
import OneSearchedUser from "./OneSearchedUser";

interface AllSearchedUsersProps {
  users: SearchUserResponse[];
}

/*<ul className={classes.ul}>
        {users.map((user) => (
          <li key={user.id}>
            <OneSearchedUser user={user} />
          </li>
        ))}
      </ul> */

const AllSearchedUsers: React.FC<AllSearchedUsersProps> = ({ users }) => {
  return (
    <div className={classes.allSearchedUsersContainier}>
      <h2 className={classes.h2}>Users</h2>
      <ul className={classes.ul}>
        {users.map((user) => (
          <li key={user.id} className={classes.li}>
            <OneSearchedUser user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllSearchedUsers;
