import Image from "./Image";
import classes from '../../../styles/Profile/Header/ProfileHeader.module.css'
import Credentials from "./Credentials";
import Actions from "./Actions";
import { useEffect, useState } from "react";

interface ProfileHeaderProps{
    id: number;
    imageSrc: string;
    firstaname: string;
    lastname: string;
    numberOfFriends: number;
    numberOfMutualFriends: number;
    friends: boolean;
    iSentFriendRequest: boolean;
    heSentFriendRequest: boolean;
    dateOfBirth: string;
    requestId: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
    const [numberOfFriends, setNumberOfFriends] = useState(props.numberOfFriends === null ?  0 : props.numberOfFriends);

    useEffect(() => {
        setNumberOfFriends(props.numberOfFriends)
    }, [props.numberOfFriends])

    const onAddOrRemoveFriend = (type: string) => {
        if(type==="add"){
            console.log("adding friend")
            setNumberOfFriends((prevState) => prevState + 1)
        }else{
            setNumberOfFriends((prevState) => prevState - 1)
        }
    }
    
    return <div className={classes.profileHeaderContainer}>
        <Image imageSrc={props.imageSrc}/>
        <Credentials dateOfBirth={props.dateOfBirth} firstname={props.firstaname} lastname={props.lastname} numberOfFriends={numberOfFriends} numberOfMutualFriends={props.numberOfMutualFriends} />
        <Actions onAddOrRemoveFriend={onAddOrRemoveFriend} requestId={props.requestId} userId={props.id} friends={props.friends} iSentFriendRequest={props.iSentFriendRequest} heSentFriendRequest={props.heSentFriendRequest}/>
    </div>
}

export default ProfileHeader;