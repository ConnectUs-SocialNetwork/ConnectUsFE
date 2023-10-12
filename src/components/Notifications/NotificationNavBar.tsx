import { NavLink } from "react-router-dom";
import classes from "../../styles/Notifications/NotificationsNavBar.module.css";

const NotificationsNavBar = () => {

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
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='unread'
            className={({ isActive }) =>
              isActive
                ? `${classes.navItem} ${classes.navLink} ${classes.active}`
                : `${classes.navItem} ${classes.navLink}`
            }
          >
            Unread
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NotificationsNavBar;
