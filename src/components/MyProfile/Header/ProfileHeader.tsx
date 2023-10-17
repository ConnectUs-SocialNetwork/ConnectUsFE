import Image from "./Image";
import classes from '../../../styles/Profile/Header/ProfileHeader.module.css'
import Credentials from "./Credentials";
import Actions from "./Actions";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import { useState } from "react";

const ProfileHeader = () => {
    const [stateChanged, setStateChanged] = useState(0)
    const userInforamtion = useLoggedUserInformation();

    const changeState = () => {
        setStateChanged((prevState) => prevState + 1)
    }

    return <div className={classes.profileHeaderContainer}>
        <Image imageSrc={userInforamtion?.user.profileImage}/>
        <Credentials />
        <Actions onChangeUser={changeState} />
    </div>
}

export default ProfileHeader;