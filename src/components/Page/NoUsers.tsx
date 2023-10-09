import classes from '../../styles/Feed/NoPosts.module.css'

const NoUsers = () => {
    return <div className={classes.noPosts}>
    <h2>No Users Found</h2>
    <p>There are currently no users to display.</p>
  </div>
}

export default NoUsers;