import classes from "../../styles/SearchUsers/SearchBar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/useHttp";
import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import SearchedUserComponent from "./SearchedUsers";

const SearchBar = () => {
  const isFirstRun = useRef(true);
  const [searchText, setSearchText] = useState("");
  const [filteredFriends, setFilteredFriends] = useState<SearchUserResponse[]>(
    []
  );
  const { sendRequest: sendSearchRequest } = useHttp();
  const [showFilteredUsers, setShowFilteredUsers] = useState(false);
  const userInformation = useLoggedUserInformation();

  const applyData = (users: SearchUserResponse[]) => {
    console.clear();
    console.log(users);
    if (searchText.length !== 0) {
      setShowFilteredUsers(true);
      setFilteredFriends(users);
    } else {
      setFilteredFriends([]);
      setShowFilteredUsers(false);
    }
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    
    const t = setTimeout(() => {
      sendSearchRequest(
        {
          url:
            "http://localhost:8081/api/v1/user?searchText=" +
            searchText +
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
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, [searchText]);

  return (
    <div>
      {showFilteredUsers && (
        <SearchedUserComponent
          users={filteredFriends}
          onClose={() => {
            setShowFilteredUsers(!showFilteredUsers);
          }}
        />
      )}
      <div className={classes.searchContainer}>
        <input
          type="text"
          className={classes.input}
          placeholder="Search friends..."
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          onBlur={() => setShowFilteredUsers(false)}
        />
        <button className={classes.button}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
