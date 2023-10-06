import { useEffect, useState } from "react";
import SearchUserResponse from "../../../../model/response/SearchFriendsResponse";
import useHttp from "../../../../hooks/useHttp";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import AllUserFriends from "./AllUserFriends";
import classes from "../../../../styles/Profile/NavPages/Friends/Friends.module.css";
import { useParams } from "react-router-dom";

const MutualFriends = () => {
  const params = useParams();
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
              "http://localhost:8081/api/v1/user/getUserMutualFriends" +
              "?userId=" + params.userId +
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
        <div className={classes.friendsContainer}>
          <AllUserFriends users={filteredFriends} />
        </div>
      );
}

export default MutualFriends;