import classes from "../styles/Notifications/NotificationsList.module.css";
import NotificationsNavBar from "../components/Notifications/NotificationNavBar";
import { Outlet } from "react-router-dom";

const NotificationsPage = () => {
  return (
    <>
        <div className={classes.listContainer}>
          <h2 className={classes.header}>Notifications</h2>
          <NotificationsNavBar />
          <Outlet />
        </div>
    </>
  );
};

export default NotificationsPage;
