import classes from '../../../../styles/Profile/Header/Image.module.css'
import BlankProfilePicture from '../../../../assets/BlankProfilePicture.png'

interface ImageProps{
    imageSrc: string;
}

const Image:React.FC<ImageProps> = ({imageSrc}) => {
    return <>
        <img src={imageSrc === null ? BlankProfilePicture : imageSrc} className={classes.imageContainer}/>
    </>
}

export default Image;