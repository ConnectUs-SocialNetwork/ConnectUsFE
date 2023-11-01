import SearchUserResponse from "../../../../model/response/SearchFriendsResponse";
import classes from "../../../../styles/Profile/NavPages/Friends/AllUserFriends.module.css";
import UserCart from "../../../Search/Users/UserCart";

interface AllSearchedUsersProps {
  users: SearchUserResponse[];
}

const AllUserFriends: React.FC<AllSearchedUsersProps> = ({ users }) => {
  return (
    <div className={classes.allSearchedUsersContainier}>
        {users.map((user) => <UserCart user={user} key={user.id}/>)}
    </div>
  );
};

export default AllUserFriends;
