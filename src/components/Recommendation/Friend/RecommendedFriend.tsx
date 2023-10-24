import RecommendedUserResponse from "../../../model/response/RecommendedUserResponse";
import classes from "../../../styles/Recommendation/Friend/RecommendedFriend.module.css";
import BlankProfilePicture from "../../../assets/BlankProfilePicture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useHttp from "../../../hooks/useHttp";
import FriendRequestResponse from "../../../model/response/FriendRequestResponse";
import { useNavigate } from "react-router-dom";

interface RecommendedFriendProps {
  user: RecommendedUserResponse;
  onRemove: (user: RecommendedUserResponse) => void;
}

const RecommendedFriend: React.FC<RecommendedFriendProps> = ({ user, onRemove }) => {
  const navigate = useNavigate();
  var imageInBase64;

  if (user.profileImage) {
    imageInBase64 = "data:image/jpeg;base64," + user.profileImage;
  } else {
    imageInBase64 = BlankProfilePicture;
  }

  

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <img src={imageInBase64} className={classes.img}></img>
        <div className={classes.credentialContainer}>
            <p className={classes.fullname}>{user.firstname} {user.lastname}</p>
            <p className={classes.info}><FontAwesomeIcon icon={faUsers} />&nbsp;{user.numberOfFriends} friends</p>
            <p className={classes.info}><FontAwesomeIcon icon={faUserGroup} />&nbsp;{user.numberOfMutualFriends} mutual friends</p>
            <p className={classes.info}>&nbsp;<FontAwesomeIcon icon={faLocationDot} />&nbsp;&nbsp;{user.country}, {user.city}</p>
        </div>
        <div className={classes.removeButtonContainer}>
          <button className={classes.removeButton} onClick={() => onRemove(user)}><FontAwesomeIcon icon={faXmark}/></button>
        </div>
      </div>
      <div className={classes.buttomContainer}>
        <button className={classes.addButton}>Add friend</button>
        <button className={classes.addButton} onClick={() => navigate('/viewUserProfile/' + user.id)}>View profile</button>
      </div>
    </div>
  );
};

export default RecommendedFriend;
