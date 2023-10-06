import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import classes from "../../../styles/Profile/Header/Actions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Actions = () => {
  return (
    <div className={classes.headerActions}>
      <button className={classes.button}>
        <>
          <FontAwesomeIcon icon={faUserPen} size="xl" />
          <p className={classes.p}>Edit profile</p>
        </>
      </button>
    </div>
  );
};

export default Actions;
