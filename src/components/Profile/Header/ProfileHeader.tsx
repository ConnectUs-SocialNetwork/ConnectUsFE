import Image from "./Image";
import classes from '../../../styles/Profile/Header/ProfileHeader.module.css'
import Credentials from "./Credentials";
import Actions from "./Actions";

interface ProfileHeaderProps{
    imageSrc: string;
    firstaname: string;
    lastname: string;
    numberOfFriends: number;
    numberOfMutualFriends: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
    return <div className={classes.profileHeaderContainer}>
        <Image imageSrc={props.imageSrc}/>
        <Credentials firstname={props.firstaname} lastname={props.lastname} numberOfFriends={props.numberOfFriends} numberOfMutualFriends={props.numberOfMutualFriends} />
        <Actions friends={true} requested={false}/>
    </div>
}

export default ProfileHeader;