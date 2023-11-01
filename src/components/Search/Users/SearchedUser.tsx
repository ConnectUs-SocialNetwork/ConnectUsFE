import SearchUserResponse from "../../../model/response/SearchFriendsResponse";
import classes from "../../../styles/SearchUsers/OneSearchedUser.module.css";
import BlankPhoto from "../../../assets/BlankProfilePicture.png";
import StyledButton from "../../UI/StyledButton";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import { useEffect, useState } from "react";

interface SearchedUserProps {
  user: SearchUserResponse;
}

const SearchedUser: React.FC<SearchedUserProps> = ({ user }) => {
  const [isMyProfile, setIsMyProfiile] = useState(false);
  const userInformation = useLoggedUserInformation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === userInformation?.user.id) {
      setIsMyProfiile(true);
    }
  }, []);

  const handleViewProfile = () => {
    if (userInformation?.user.id == user.id) {
      navigate("/viewMyProfile");
    } else {
      navigate("/viewUserProfile/" + user.id);
    }
  };

  var imageInBase64;

  if (user.profileImage) {
    imageInBase64 = "data:image/jpeg;base64," + user.profileImage;
  } else {
    imageInBase64 = BlankPhoto;
  }

  /* */

  return (
    <div className={classes.oneSearchedUserContainer}>
      <div className={classes.avatar}>
        <img
          src={imageInBase64}
          alt="User Avatar"
          className={classes["avatar"]}
        />
      </div>
      <div className={classes.nameAndSurnameContainer}>
        <p className={classes.nameAndSurname}>
          {user.firstname} {user.lastname}
        </p>
        {user.friend && <p className={classes.isFriend}>Friend</p>}
        {!isMyProfile && !user.friend && (
          <p className={classes.isFriend}>
            Number of friends:{" "}
            {user.numberOfFriends === null || 0 ? 0 : user.numberOfFriends}
          </p>
        )}
        {!isMyProfile && !user.friend && (
          <p className={classes.isFriend}>
            Number of mutual friends:{" "}
            {user.numberOfMutualFriends === null || 0
              ? 0
              : user.numberOfMutualFriends}
          </p>
        )}
      </div>
      <div className={classes.buttonContainer}>
        <StyledButton
          color="black"
          iconType={faUser}
          onClick={() => {
            handleViewProfile();
          }}
          text="View profile"
          textColor="black"
        />
      </div>
    </div>
  );
};

export default SearchedUser;
