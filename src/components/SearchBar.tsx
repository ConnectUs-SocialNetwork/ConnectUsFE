import classes from "../styles/SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={classes.searchContainer}>
      <input type="text" className={classes.input} placeholder="Search friends..." />
    </div>
  );
};

export default SearchBar;
