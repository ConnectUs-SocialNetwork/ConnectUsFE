import { useEffect, useState } from "react";
import classes from "../../../../styles/MyProfile/MyFriends.module.css";
import SearchUserResponse from "../../../../model/response/SearchFriendsResponse";
import useHttp from "../../../../hooks/useHttp";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import AllUserFriends from "./AllUserFriends";
import NoUsers from "../../../Page/NoUsers";

const MyFriends = () => {
  const [filteredFriends, setFilteredFriends] = useState<SearchUserResponse[]>(
    []
  );
  const { sendRequest: sendSearchRequest } = useHttp();
  const userInformation = useLoggedUserInformation();

  const applyData = (users: SearchUserResponse[]) => {
    setFilteredFriends(users);
  };

  useEffect(() => {
    sendSearchRequest(
      {
        url:
          "http://localhost:8081/api/v1/user/getUserFriends" +
          "?userId=" +
          userInformation?.user.id +
          "&myId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyData
    );
  }, []);
  return (
    <>
      {filteredFriends.length !== 0 && (
        <div className={classes.friendsContainer}>
          <AllUserFriends users={filteredFriends} />
        </div>
      )}
      {filteredFriends.length === 0 && <NoUsers />}
    </>
  );
};

export default MyFriends;
