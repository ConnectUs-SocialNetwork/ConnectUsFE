import { Outlet } from "react-router-dom";
import PhotosNavBar from "./PhotosNavBar";
import classes from '../../../../styles/MyProfile/Photos.module.css'

const Photos = () => {
    return <div className={classes.container}>
        <h2 className={classes.h2}>Photos</h2>
        <PhotosNavBar />
        <Outlet />
    </div>
}

export default Photos;