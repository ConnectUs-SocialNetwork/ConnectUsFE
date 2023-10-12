import classes from '../../styles/UI/Spinner.module.css'

const Spinner = () => {
    return (
        <div className={classes.loadingContainer}>
          <div className={classes.spinner}></div>
        </div>
      );
}

export default Spinner;