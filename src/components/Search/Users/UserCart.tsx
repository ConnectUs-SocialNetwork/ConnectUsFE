import SearchUserResponse from "../../../model/response/SearchFriendsResponse";
import classes from "../../../styles/SearchUsers/UserCart.module.css";
import BlankProfilePicture from "../../../assets/BlankProfilePicture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faLocationDot, faUserGroup, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";

interface UserCartProps {
  user: SearchUserResponse;
}

const UserCart: React.FC<UserCartProps> = ({ user }) => {
  const navigate = useNavigate();
  const userInformation = useLoggedUserInformation();
  var imageInBase64;

  if (user.profileImage) {
    imageInBase64 = "data:image/jpeg;base64," + user.profileImage;
  } else {
    imageInBase64 = BlankProfilePicture;
  }

  const navigateToViewProfile = () => {
    if(user.id === userInformation?.user.id){
      navigate("/viewMyProfile")
    }else{
      navigate("/viewUserProfile/" + user.id)
      window.location.reload();
    }
  }

  return (
    <div className={classes.container} onClick={navigateToViewProfile}>
      <div>
        <img src={imageInBase64} />
      </div>
      <div className={classes.rightContainer}>
        <p className={classes.fullname}>
          {user.firstname} {user.lastname}
        </p>
        <p className={classes.numberOfFriends}>
          <FontAwesomeIcon icon={faUsers} /> {user.numberOfFriends} friends
        </p>
        <p className={classes.numberOfMutualFriends}>
          <FontAwesomeIcon icon={faUserGroup} /> {user.numberOfMutualFriends}{" "}
          mutual friends
        </p>
        <p className={classes.location}>
          <FontAwesomeIcon icon={faLocationDot} />&nbsp; {user.country}, {user.city}, {user.street} {user.number}
        </p>
      </div>
    </div>
  );
};

export default UserCart;
