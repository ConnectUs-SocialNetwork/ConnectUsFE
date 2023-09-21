import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "../../styles/UI/StyledButton.module.css";

interface StyledButtonProps {
  iconType: IconDefinition;
  text: string;
  color: string;
  textColor: string;
  onClick: (data: any) => void;
}

const StyledButton: React.FC<StyledButtonProps> = (props) => {

  return (
    <>
      <button className={classes.button} onClick={props.onClick}>
        <FontAwesomeIcon icon={props.iconType} size="xl" color={props.color} className={classes.icon}/>
        <p className={classes.p} style={{color: props.textColor}}>{props.text}</p>
      </button>
    </>
  );
};

export default StyledButton;
