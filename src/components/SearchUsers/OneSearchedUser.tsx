import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import classes from "../../styles/SearchUsers/OneSearchedUser.module.css";
import BlankPhoto from "../../assets/BlankProfilePicture.png";
import StyledButton from "../UI/StyledButton";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";

interface OneSearchedUserProps {
  user: SearchUserResponse;
}

const OneSearchedUser: React.FC<OneSearchedUserProps> = ({ user }) => {
  const userInformation = useLoggedUserInformation();
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if(userInformation?.user.id == user.id){
      navigate('/viewMyProfile')
    }else{
      navigate('/viewUserProfile/' + user.id)
    }
  }

  return (
    <div className={classes.oneSearchedUserContainer}>
      <div className={classes.avatar}>
        <img
          src={user.profileImage ? user.profileImage : BlankPhoto}
          alt="User Avatar"
          className={classes["avatar"]}
        />
      </div>
      <div className={classes.nameAndSurnameContainer}>
        <p className={classes.nameAndSurname}>
          {user.firstname} {user.lastname}
        </p>
        <p className={classes.isFriend}>{user.friend ? "Friend" : ""}</p>
      </div>
      <div className={classes.buttonContainer}>
          <StyledButton
            color="black"
            iconType={faUser}
            onClick={() => {handleViewProfile()}}
            text="View profile"
            textColor="black"
            
          />
      </div>
    </div>
  );
};

export default OneSearchedUser;
