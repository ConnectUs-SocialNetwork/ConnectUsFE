import classes from '../../../styles/Profile/Header/Image.module.css'

interface ImageProps{
    imageSrc: string;
}

const Image:React.FC<ImageProps> = ({imageSrc}) => {
    return <>
        <img src={imageSrc} className={classes.imageContainer}/>
    </>
}

export default Image;