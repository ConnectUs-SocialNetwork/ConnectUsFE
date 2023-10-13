import classes from "../../../styles/Notifications/NoNotifications.module.css"

const NoUsers = () => {
  return (
    <div className={classes.noPages}>
      <h2 className={classes.h2}>No Users Found!</h2>
      <p className={classes.p}>There are currently no users to display.</p>
    </div>
  );
};

export default NoUsers;