import { NavLink, useNavigate } from "react-router-dom";
import classes from "../../../../styles/Profile/Navigation/NavBar.module.css";

const NavBar = () => {

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
            Posts
          </NavLink>
        </li>
        <li>
        <NavLink
            to='about'
            className={({ isActive }) =>
              isActive
                ? `${classes.navItem} ${classes.navLink} ${classes.active}`
                : `${classes.navItem} ${classes.navLink}`
            }
          >
            Information
          </NavLink>
        </li>
        <li>
          <NavLink
            to='friends'
            className={({ isActive }) =>
              isActive
                ? `${classes.navItem} ${classes.navLink} ${classes.active}`
                : `${classes.navItem} ${classes.navLink}`
            }
          >
            Likes
          </NavLink>
        </li>
        <li>
        <NavLink
            to='photos'
            className={({ isActive }) =>
              isActive
                ? `${classes.navItem} ${classes.navLink} ${classes.active}`
                : `${classes.navItem} ${classes.navLink}`
            }
          >
            Photos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
