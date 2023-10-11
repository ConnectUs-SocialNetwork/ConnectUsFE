import { useEffect, useState } from 'react';
import classes from '../../../styles/Profile/Header/Credentials.module.css'

interface CredentialsProps{
    firstname: string;
    lastname: string;
    numberOfFriends: number;
    numberOfMutualFriends: number;
    dateOfBirth: string;
}

const Credentials: React.FC<CredentialsProps> = (props) => {
    const [numberOfFriends, setNumberOfFriends] = useState(props.numberOfFriends)

    useEffect(() => {
        setNumberOfFriends(props.numberOfFriends)
    }, [props.numberOfFriends])

    return <div className={classes.credentialsContainer}>
        <p className={classes.nameAndSurname}>{props.firstname} {props.lastname}</p>
        <p className={classes.numberOfFriends}>Number of friends: {numberOfFriends}</p>
        <p className={classes.numberOfMutualFriends}>Number of mutual friends: {props.numberOfMutualFriends}</p>
        <p className={classes.numberOfMutualFriends}>Date of birth: {props.dateOfBirth}</p>
    </div>
}

export default Credentials;