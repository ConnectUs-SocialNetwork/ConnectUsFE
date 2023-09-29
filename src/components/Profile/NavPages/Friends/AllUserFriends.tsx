import SearchUserResponse from "../../../../model/response/SearchFriendsResponse";
import OneSearchedUser from "../../../SearchUsers/OneSearchedUser";
import classes from "../../../../styles/Profile/NavPages/Friends/AllUserFriends.module.css";

interface AllSearchedUsersProps {
  users: SearchUserResponse[];
}

const AllUserFriends: React.FC<AllSearchedUsersProps> = ({ users }) => {
  return (
    <div className={classes.allSearchedUsersContainier}>
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

export default AllUserFriends;
