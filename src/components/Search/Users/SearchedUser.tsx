import SearchUserResponse from "../../../model/response/SearchFriendsResponse";
import classes from "../../../styles/SearchUsers/OneSearchedUser.module.css";
import BlankPhoto from "../../../assets/BlankProfilePicture.png";
import StyledButton from "../../UI/StyledButton";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";

interface SearchedUserProps {
  user: SearchUserResponse;
}

const SearchedUser: React.FC<SearchedUserProps> = ({ user }) => {
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
        {user.friend &&  <p className={classes.isFriend}>Friend</p>}
        {!user.friend && <p className={classes.isFriend}>Number of friends: {user.numberOfFriends}</p>}
        {!user.friend && <p className={classes.isFriend}>Number of mutual friends: {user.numberOfMutualFriends}</p>}
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

export default SearchedUser;
