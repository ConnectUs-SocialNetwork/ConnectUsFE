import SearchPageResponse from "../../../model/response/SearchPageResponse";
import classes from "../../../styles/SearchUsers/AllSearchedUsers.module.css";
import NoPages from "./NoPages";
import SearchedPage from "./SearchedPage";

interface SearchedPagesListProps {
  pages: SearchPageResponse[];
}

const SearchedPagesList: React.FC<SearchedPagesListProps> = ({ pages }) => {
  return (
    <div className={classes.allSearchedUsersContainier}>
      {pages.length !== 0 && (
        <>
          {pages.map((page) => (
            <div key={page.id} className={classes.oneSearchedFriendContainer}>
              <SearchedPage page={page} />
            </div>
          ))}
        </>
      )}
      {pages.length === 0 && <NoPages />}
    </div>
  );
};

export default SearchedPagesList;
