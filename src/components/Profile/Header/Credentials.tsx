import classes from '../../../styles/Profile/Header/Credentials.module.css'

interface CredentialsProps{
    firstname: string;
    lastname: string;
    numberOfFriends: number;
    numberOfMutualFriends: number;
}

const Credentials: React.FC<CredentialsProps> = (props) => {
    return <div className={classes.credentialsContainer}>
        <p className={classes.nameAndSurname}>{props.firstname} {props.lastname}</p>
        <p className={classes.numberOfFriends}>Number of riends: {props.numberOfFriends}</p>
        <p className={classes.numberOfMutualFriends}>Number of mutual friends: {props.numberOfMutualFriends}</p>
    </div>
}

export default Credentials;