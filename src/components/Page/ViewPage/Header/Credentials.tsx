import classes from '../../../../styles/Profile/Header/Credentials.module.css'

interface CredentialsProps{
    name: string;
    description: string;
    numberOfLikes: number;
}

const Credentials: React.FC<CredentialsProps> = (props) => {
    return <div className={classes.credentialsContainer}>
        <p className={classes.nameAndSurname}>{props.name}</p>
        <p className={classes.numberOfFriends}>Number of likes: {props.numberOfLikes}</p>
    </div>
}

export default Credentials;