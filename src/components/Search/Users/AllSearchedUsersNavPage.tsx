import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import SearchUserResponse from "../../../model/response/SearchFriendsResponse";
import { useParams } from "react-router-dom";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import AllSearchedUsers from "./AllSearchedUsers";
import Spinner from "../../UI/Spinner";
import NoUsers from "./NoUsers";

const AllSearchedUsersNavPage = () => {
  const [filteredFriends, setFilteredFriends] = useState<SearchUserResponse[]>(
    []
  );
  const { isLoading, sendRequest: sendSearchRequest } = useHttp();
  const params = useParams();
  const userInformation = useLoggedUserInformation();

  const applyData = (users: SearchUserResponse[]) => {
    setFilteredFriends(users);
  };

  useEffect(() => {
    sendSearchRequest(
      {
        url:
          "http://localhost:8081/api/v1/user?searchText=" +
          params.searchText +
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
  }, [params.searchText]);

  return (
    <>
      {!isLoading && filteredFriends.length !== 0 && <AllSearchedUsers users={filteredFriends} />}
      {isLoading && <Spinner />}
      {!isLoading && filteredFriends.length === 0 && <NoUsers />}
    </>
  );
};

export default AllSearchedUsersNavPage;
