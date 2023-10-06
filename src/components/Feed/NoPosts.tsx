import classes from '../../styles/Feed/NoPosts.module.css'

const NoPosts = () => {
    return <div className={classes.noPosts}>
    <h2>No Posts Found</h2>
    <p>There are currently no posts to display.</p>
  </div>
}

export default NoPosts;