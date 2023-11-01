import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPager } from "@fortawesome/free-solid-svg-icons";
import classes from "../../styles/Navigation/NavigationBar.module.css";
import NavItem from "./NavItem";
import SearchBar from "../Search/SearchBar";
import Logo from "../../assets/Logo.png";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import NavButton from "./NavButton";
import useHttp from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { sendRequest: savePostRequest } = useHttp(); 
  const userInformation = useLoggedUserInformation();

  var imageInBase64;

  if (userInformation?.user.profileImage) {
    imageInBase64 = "data:image/jpeg;base64," + userInformation?.user.profileImage;
  } else {
    imageInBase64 = BlankProfilePicture;
  }

  const handleLogout = () => {

    savePostRequest({
      url: "http://localhost:8081/api/v1/logout",
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + userInformation?.tokens.accessToken
      }
    },
    applyData)
  }

  const applyData = (data: any) => {
    console.log(data)
    navigate('/auth?mode=login')
  }
  //<NavItem iconType={faUserGroup} text="Network" to="/my-network" />
  return (
    <div className={classes.navContainer}>
      <div className={classes.searchContainer}>
        <img src={Logo} className={classes.img} />
        <SearchBar />
      </div>
      <div className={classes.navItemsContainer}>
        <NavItem iconType={faPager} text="Pages" to="/pages" />
        <NavItem iconType={faHome} text="Home" to="/" />
        <NavItem iconType={faBell} text="Notifications" to="/notifications" />
      </div>
      <div className={classes.rightContainer} >
        <img
          className={classes.profilePicture}
          src={
            imageInBase64
          }
          onClick={() => {navigate('/viewMyProfile')}}

          alt="profile picture"
        />
        <NavButton
          iconType={faFileCirclePlus}
          text="Logout"
          onClick={() => {navigate('/createPage')}}
        />
        <NavButton
          iconType={faRightFromBracket}
          text="Logout"
          onClick={() => {
            localStorage.setItem('loginResponse', '')
            navigate('/auth?mode=login')
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
