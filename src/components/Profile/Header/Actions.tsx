import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import classes from "../../../styles/Profile/Header/Actions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ActionsProps {
  friends: boolean;
  requested: boolean;
}

const Actions: React.FC<ActionsProps> = (props) => {
  return (
    <div className={classes.headerActions}>
      <button className={classes.button}>
        {!props.friends && props.requested && (
          <>
            <FontAwesomeIcon icon={faPaperPlane} size="xl" />
            <p className={classes.p}>Unsend request</p>
          </>
        )}
        {props.friends && (
          <>
            <FontAwesomeIcon icon={faUserXmark} size="xl" />
            <p className={classes.p}>Remove friend</p>
          </>
        )}
        {!props.friends && !props.requested && (
          <>
            <FontAwesomeIcon icon={faUserPlus} size="xl" />
            <p className={classes.p}>Add friend</p>
          </>
        )}
      </button>
    </div>
  );
};

export default Actions;
