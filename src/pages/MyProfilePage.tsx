import { Outlet } from "react-router-dom";
import ProfileHeader from "../components/MyProfile/Header/ProfileHeader";
import NavBar from "../components/MyProfile/Navigation/NavBar";
import classes from "../styles/Pages/MyProfilePage.module.css";

const MyProfilePage = () => {
  return (
    <div className={classes.viewUserProfileContainer}>
      <ProfileHeader />
      <NavBar />
      <div className={classes.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default MyProfilePage;
