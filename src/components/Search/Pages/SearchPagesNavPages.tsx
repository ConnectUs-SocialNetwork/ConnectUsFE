import { useEffect, useState } from "react";
import SearchPageResponse from "../../../model/response/SearchPageResponse";
import useHttp from "../../../hooks/useHttp";
import { useParams } from "react-router-dom";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import SearchedPagesList from "./SearchedPagesList";
import Spinner from "../../UI/Spinner";

const SearchPagesNavPage = () => {
  const [filteredPages, setFilteredPages] = useState<SearchPageResponse[]>();
  const { sendRequest: sendSearchRequest } = useHttp();
  const params = useParams();
  const userInformation = useLoggedUserInformation();

  const applyData = (users: SearchPageResponse[]) => {
    setFilteredPages(users);
  };

  useEffect(() => {
    sendSearchRequest(
      {
        url:
          "http://localhost:8081/api/v1/page/search?searchText=" +
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

  return <>
    {filteredPages && <SearchedPagesList pages={filteredPages!} />}
    {!filteredPages && <Spinner />}
  </>
};

export default SearchPagesNavPage;
