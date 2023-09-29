import ProfileHeader from "../components/Profile/Header/ProfileHeader";
import ImageSrc from "../assets/ProfileImg.png";
import classes from "../styles/Profile/UserProfilePage.module.css";
import NavBar from "../components/Profile/Navigation/NavBar";
import { Outlet } from "react-router-dom";

const UserProfilePage = () => {
  return (
    <div className={classes.viewUserProfileContainer}>
      <ProfileHeader
        imageSrc={ImageSrc}
        firstaname="Mirko"
        lastname="Mirkovic"
        numberOfFriends={2700}
        numberOfMutualFriends={147}
      />
      <NavBar />
      <div className={classes.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfilePage;
