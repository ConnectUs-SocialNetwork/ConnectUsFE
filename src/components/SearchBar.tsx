import classes from "../styles/SearchBar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => {
  return (
    <div className={classes.searchContainer}>
      <input
        type="text"
        className={classes.input}
        placeholder="Search friends..."
      />
      <button className={classes.button}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBar;
