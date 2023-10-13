import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../../hooks/useHttp";
import SearchUserResponse from "../../../../model/response/SearchFriendsResponse";
import { useLoggedUserInformation } from "../../../../hooks/useLoggedUserInformation";
import classes from "../../../../styles/Profile/NavPages/Friends/AllUserFriends.module.css";
import OneSearchedUser from "../../../Search/Users/SearchedUser";
import NoLikers from "../../NoUsers";
import LoadingPage from "../../../../pages/LoadingPage";

const Likers = () => {
  const [likers, setLikers] = useState<SearchUserResponse[]>([]);
  const userInformation = useLoggedUserInformation();
  const params = useParams();
  const { isLoading, sendRequest: getLikers } = useHttp();

  const applyData = (data: SearchUserResponse[]) => {
    setLikers(data);
  };

  useEffect(() => {
    getLikers(
      {
        url:
          "http://localhost:8081/api/v1/page/getLikers?pageId=" +
          params.pageId +
          "&userId=" +
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
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <div className={classes.allSearchedUsersContainier}>
          {likers.length !== 0 && (
            <ul className={classes.ul}>
              {likers.map((user) => (
                <li key={user.id} className={classes.li}>
                  <OneSearchedUser user={user} />
                </li>
              ))}
            </ul>
          )}
          {likers.length === 0 && <NoLikers />}
        </div>
      )}
    </>
  );
};

export default Likers;
