import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import classes from "../styles/NavigationBar.module.css";
import NavItem from "./NavItem";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <nav>
      <ul className={classes.ul}>
        <li className={classes.navItem}>
          <img src="src\assets\Logo.png" />
        </li>
        <li className={classes.navItem}>
          <SearchBar />
        </li>
        <li className={classes.navItem}>
          <NavItem iconType={faHome} text="Home" to="/" />
        </li>
        <li className={classes.navItem}>
          <NavItem iconType={faUserGroup} text="My network" to="/my-network" />
        </li>
        <li className={classes.navItem}>
          <NavItem iconType={faUser} text="My profile" to="/notifications" />
        </li>
        <li className={classes.navItem}>
          <NavItem iconType={faBell} text="Notifications" to="/notifications" />
        </li>
        <li className={classes.navItem}>
          <NavItem
            iconType={faRightFromBracket}
            text="Sign out"
            to="/notifications"
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
