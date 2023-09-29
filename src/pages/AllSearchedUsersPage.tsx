import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import SearchUserResponse from "../model/response/SearchFriendsResponse";
import { useParams } from "react-router-dom";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";
import AllSearchedUsers from "../components/SearchUsers/AllSearchedUsers";

const AllSearchedUsersPage = () => {
  const [filteredFriends, setFilteredFriends] = useState<SearchUserResponse[]>(
    []
  );
  const { sendRequest: sendSearchRequest } = useHttp();
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
  }, []);

  return (
    <>
      <AllSearchedUsers users={filteredFriends} />
    </>
  );
};

export default AllSearchedUsersPage;
