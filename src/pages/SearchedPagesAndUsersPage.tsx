import { Outlet } from "react-router-dom";
import SearchNavBar from "../components/Search/Navigation/SearchNavBar";
import classes from '../styles/Pages/SearchedPagesAndUsers.module.css'

const SearchedPagesAndUsersPage = () => {
    return <div className={classes.container}>
        <h2 className={classes.h2}>Search results</h2>
        <SearchNavBar />
        <Outlet />
    </div>
}

export default SearchedPagesAndUsersPage;