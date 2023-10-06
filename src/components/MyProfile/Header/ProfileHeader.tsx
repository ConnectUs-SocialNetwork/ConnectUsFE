import Image from "./Image";
import classes from '../../../styles/Profile/Header/ProfileHeader.module.css'
import Credentials from "./Credentials";
import Actions from "./Actions";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import BlankProfilePicture from '../../../assets/BlankProfilePicture.png'

const ProfileHeader = () => {
    const userInforamtion = useLoggedUserInformation();

    return <div className={classes.profileHeaderContainer}>
        <Image imageSrc={userInforamtion?.user.profileImage === null ? BlankProfilePicture : userInforamtion?.user.profileImage!}/>
        <Credentials />
        <Actions />
    </div>
}

export default ProfileHeader;