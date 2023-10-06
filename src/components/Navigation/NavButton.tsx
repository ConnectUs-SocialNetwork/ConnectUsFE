import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import classes from '../../styles/Navigation/NavButton.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavButtonProps{
    onClick: () => void;
    text: string;
    iconType: IconDefinition;
}

const NavButton: React.FC<NavButtonProps> = (props) => {
    return <button onClick={props.onClick} className={classes.button}>
        <FontAwesomeIcon icon={props.iconType} className={classes.icon}/>
    </button>
}

export default NavButton;