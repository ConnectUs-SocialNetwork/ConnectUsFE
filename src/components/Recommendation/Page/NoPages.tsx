import classes from "../../../styles/Recommendation/Page/NoPages.module.css"

const NoPages = () => {
  return (
    <div className={classes.noPages}>
      <h2 className={classes.h2}>No Pages Found!</h2>
      <p className={classes.p}>There are currently no pages to recommend.</p>
    </div>
  );
};

export default NoPages;