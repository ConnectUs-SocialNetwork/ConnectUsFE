import classes from "../../styles/SearchUsers/SearchBar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.searchContainer}>
        <input
          type="text"
          className={classes.input}
          placeholder="Search users or pages..."
          value={searchText}
          onChange={(event) => {setSearchText(event.target.value)}}
        />
        <button className={classes.button} onClick={() => {navigate("/searchedUsersAndPages/" + searchText)}}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
