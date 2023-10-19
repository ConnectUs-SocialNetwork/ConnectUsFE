import { NavLink } from "react-router-dom";
import classes from "../../../../styles/MyProfile/PhotosNavBar.module.css";

const PhotosNavBar = () => {
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
            Photos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="tagged"
            className={({ isActive }) =>
              isActive
                ? `${classes.navItem} ${classes.navLink} ${classes.active}`
                : `${classes.navItem} ${classes.navLink}`
            }
          >
            Tagged
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PhotosNavBar;
