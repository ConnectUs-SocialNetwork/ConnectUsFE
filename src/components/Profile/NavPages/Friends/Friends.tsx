import { useEffect, useState } from "react";
import classes from "../../../../styles/Profile/NavPages/Friends/AllUserFriends.module.css";
import SearchUserResponse from "../../../../model/response/SearchFriendsResponse";
import useHttp from "../../../../hooks/useHttp";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import { useParams } from "react-router-dom";
import UserCart from "../../../Search/Users/UserCart";

const Friends = () => {
  const [filteredFriends, setFilteredFriends] = useState<SearchUserResponse[]>(
    []
  );
  const { sendRequest: sendSearchRequest } = useHttp();
  const userInformation = useLoggedUserInformation();
  const params = useParams();

  const applyData = (users: SearchUserResponse[]) => {
    setFilteredFriends(users);
  };

  useEffect(() => {
    sendSearchRequest(
      {
        url:
          "http://localhost:8081/api/v1/user/getUserFriends" +
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
    <div className={classes.allSearchedUsersContainier}>
      {filteredFriends.map((user) => (
        <UserCart user={user} key={user.id} />
      ))}
    </div>
  );
};

export default Friends;
