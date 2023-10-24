import { useEffect, useState } from "react";
import RecommendedUserResponse from "../../../model/response/RecommendedUserResponse";
import useHttp from "../../../hooks/useHttp";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import classes from "../../../styles/Recommendation/Friend/RecommendedFriendList.module.css";
import RecommendedFriend from "./RecommendedFriend";

const RecommendedFriendList = () => {
  const [users, setUsers] = useState<RecommendedUserResponse[]>([]);
  const userInformation = useLoggedUserInformation();
  const { isLoading, sendRequest } = useHttp();

  useEffect(() => {
    getRecommendedUsers();
  }, []);

  const applyData = (users: RecommendedUserResponse[]) => {
    setUsers(users);
  };

  const getRecommendedUsers = () => {
    sendRequest(
      {
        url:
          "http://localhost:8081/api/v1/user/getRecommendedUsers?userId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyData
    );
  };

  const removeUser = (user: RecommendedUserResponse) => {
    setUsers(users.filter(currentUser => currentUser.id !== user.id))
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.h2}>You may know...</h2>
      {users.map((user) => (
        <RecommendedFriend user={user} key={user.id} onRemove={removeUser} />
      ))}
    </div>
  );
};

export default RecommendedFriendList;
