import { NavLink } from "react-router-dom";
import classes from "../../../../../styles/Profile/NavPages/Friends/NavBar/NabBar.module.css";

const NavBar = () => {
  return (
    <nav className={classes.navBar}>
      <ul className={classes.ul}>
        <li>
          <NavLink
            to=""
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
            to="mutual"
            className={({ isActive }) =>
              isActive
                ? `${classes.navItem} ${classes.navLink} ${classes.active}`
                : `${classes.navItem} ${classes.navLink}`
            }
          >
            Mutual
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
