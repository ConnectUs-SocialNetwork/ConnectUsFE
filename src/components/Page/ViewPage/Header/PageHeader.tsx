import Image from "./Image";
import classes from '../../../../styles/Profile/Header/ProfileHeader.module.css'
import Credentials from "./Credentials";
import Actions from "./Actions";

interface PageHeaderProps{
    name: string;
    description: string;
    numberOfLikes: number;
    imageSrc: string;
    liked: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return <div className={classes.profileHeaderContainer}>
        <Image imageSrc={props.imageSrc}/>
        <Credentials name={props.name} numberOfLikes={props.numberOfLikes} description={props.description}/>
        <Actions liked={props.liked}/>
    </div>
}

export default PageHeader;