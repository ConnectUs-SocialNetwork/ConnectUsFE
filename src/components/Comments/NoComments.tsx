import classes from "../../styles/Comments/NoComments.module.css"

const NoComment = () => {
  return (
    <div className={classes.noPages}>
      <h2 className={classes.h2}>No Comment Found!</h2>
      <p className={classes.p}>There are currently no comments.</p>
    </div>
  );
};

export default NoComment;