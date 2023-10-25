import classes from "../../../styles/Recommendation/Friend/NoUsers.module.css"

const NoUsers = () => {
  return (
    <div className={classes.noPages}>
      <h2 className={classes.h2}>No Users Found!</h2>
      <p className={classes.p}>There are currently no users to recommend.</p>
    </div>
  );
};

export default NoUsers;