import NavBar from "./NavBar/NavBar";
import classes from '../../../../styles/Profile/NavPages/Friends/FriendsNavPage.module.css'
import { Outlet } from "react-router-dom";

const FriendsNavPage = () => {
    return <div className={classes.friendsNavPageContainer}>
        <h2 className={classes.h2}>Friends</h2>
        <NavBar />
        <Outlet />
    </div>
}

export default FriendsNavPage;