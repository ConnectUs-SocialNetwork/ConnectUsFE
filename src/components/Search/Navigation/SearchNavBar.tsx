import { NavLink } from "react-router-dom";
import classes from "../../../styles/Notifications/NotificationsNavBar.module.css";

const SearchNavBar = () => {

  return (
    <nav className={classes.navBar}>
      <ul className={classes.ul}>
        <li>
          <NavLink
            to=''
            className={({ isActive }) =>
            isActive
              ? `${classes.navItem} ${classes.navLink} ${classes.active}`
              : `${classes.navItem} ${classes.navLink}`
          }
          end
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to='pages'
            className={({ isActive }) =>
              isActive
                ? `${classes.navItem} ${classes.navLink} ${classes.active}`
                : `${classes.navItem} ${classes.navLink}`
            }
          >
            Pages
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SearchNavBar;
