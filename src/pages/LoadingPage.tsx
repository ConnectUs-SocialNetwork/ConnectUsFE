import classes from '../styles/UI/LoadingPage.module.css'

const LoadingPage = () => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loadingText}>ConnectUs</div>
      <div className={classes.spinner}></div>
    </div>
  );
}

export default LoadingPage;
