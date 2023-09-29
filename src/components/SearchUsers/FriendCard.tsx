import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import classes from "../../styles/SearchUsers/FriendCard.module.css";
import BlankPhoto from '../../assets/BlankProfilePicture.png'

interface FriendCardProps {
  user: SearchUserResponse;
}

const FriendCard: React.FC<FriendCardProps> = ({ user }) => {
  return (
    <div className={classes.friendCardContainer}>
      <div className={classes.avatar}>
        <img src={user.profileImage ? user.profileImage : BlankPhoto} alt="User Avatar" className={classes["avatar"]} />
      </div>
      <div>
        <p className={classes.nameAndSurname}>
          {user.firstname} {user.lastname}
        </p>
        <p className={classes.isFriend}>{user.friend ? "Friend" : ""}</p>
      </div>
    </div>
  );
};

export default FriendCard;
