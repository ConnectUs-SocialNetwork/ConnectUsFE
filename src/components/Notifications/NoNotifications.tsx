import classes from "../../styles/Notifications/NoNotifications.module.css"

const NoNotifications = () => {
  return (
    <div className={classes.noPosts}>
      <h2 className={classes.h2}>No Notifications Found!</h2>
      <p className={classes.p}>There are currently no notifications to display.</p>
    </div>
  );
};

export default NoNotifications;
