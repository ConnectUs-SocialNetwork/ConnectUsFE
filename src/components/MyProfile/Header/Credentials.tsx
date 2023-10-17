import { useLoggedUserInformation } from '../../../hooks/useLoggedUserInformation';
import classes from '../../../styles/Profile/Header/Credentials.module.css'

const Credentials = () => {
    const userInformation = useLoggedUserInformation();

    return <div className={classes.credentialsContainer}>
        <p className={classes.nameAndSurname}>{userInformation?.user.firstname} {userInformation?.user.lastname}</p></div>
}

export default Credentials;