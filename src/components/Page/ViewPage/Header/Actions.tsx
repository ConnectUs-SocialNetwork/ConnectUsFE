import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import classes from "../../../../styles/Profile/Header/Actions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ActionsProps {
  liked: boolean;
}

const Actions: React.FC<ActionsProps> = (props) => {
  return (
    <div className={classes.headerActions}>
      <button className={classes.button}>
        {!props.liked && (
          <>
            <FontAwesomeIcon icon={faThumbsUp} size="xl" />
            <p className={classes.p}>Like</p>
          </>
        )}
        {props.liked && (
          <>
            <FontAwesomeIcon icon={faThumbsUp} size="xl" />
            <p className={classes.p}>Unlike</p>
          </>
        )}
      </button>
    </div>
  );
};

export default Actions;
