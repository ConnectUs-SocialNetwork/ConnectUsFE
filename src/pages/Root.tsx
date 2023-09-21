import { Outlet } from "react-router-dom";
import NavBar from "../components/Navigation/NavigationBar";
import classes from "../styles/Root.module.css";

const Root = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className={classes.main}>
        <div className={classes.mainContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
