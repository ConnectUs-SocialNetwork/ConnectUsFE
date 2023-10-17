import { useEffect, useState } from 'react';
import classes from '../../../styles/Profile/Header/Credentials.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

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
        <p className={classes.numberOfFriends}><FontAwesomeIcon icon={faUsers} /> Number of friends: {numberOfFriends}</p>
        <p className={classes.numberOfMutualFriends}><FontAwesomeIcon icon={faUserGroup} /> Number of mutual friends: {props.numberOfMutualFriends}</p>
        <p className={classes.dateOfBirth}><FontAwesomeIcon icon={faCalendarDays} />&nbsp;&nbsp;Date of birth: {props.dateOfBirth}</p>
    </div>
}

export default Credentials;