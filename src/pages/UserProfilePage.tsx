import ProfileHeader from "../components/Profile/Header/ProfileHeader";
import BlankProfilePicture from "../assets/BlankProfilePicture.png";
import classes from "../styles/Profile/UserProfilePage.module.css";
import NavBar from "../components/Profile/Navigation/NavBar";
import { Outlet, useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";
import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [userData, setUserData] = useState<UserProfileResponse>()
  const params = useParams()
  const { sendRequest: getUserData } = useHttp();
  const userInformation = useLoggedUserInformation();

  useEffect(() => {

    const applyData = (userDataResponse: UserProfileResponse) => {
      setUserData(userDataResponse);
    }

    getUserData(
      {
        url:
          "http://localhost:8081/api/v1/user/getUserProfile?userId=" + params.userId +
          "&myId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userInformation?.tokens.accessToken,
        },
      },
      applyData
    );

  }, [])

  return (
    <div className={classes.viewUserProfileContainer}>
      <ProfileHeader
        imageSrc={userData?.profilePicture === "" ? BlankProfilePicture : userData?.profilePicture!}
        firstaname={userData?.firstname!}
        lastname={userData?.lastname!}
        numberOfFriends={userData?.numberOfFriends!}
        numberOfMutualFriends={userData?.numberOfMutualFriends!}
        friends={userData?.friends!}
        requested={userData?.requested!}
      />
      <NavBar />
      <div className={classes.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfilePage;
