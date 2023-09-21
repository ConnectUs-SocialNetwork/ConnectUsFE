import classes from "../../styles/Feed/CreatePost.module.css";
import Logo from "../../assets/Logo.png";
import StyledButton from "../UI/StyledButton";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PostModal from "./PostModal";
import useHttp from "../../hooks/useHttp";
import PostRequest from "../../model/request/PostRequest";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import { imageToBase64 } from "../../util/helperFuntions";

interface OpenDialogData {
  isOpen: boolean;
  type: string;
}

const CreatePost = () => {
  const [dialogData, setDialogData] = useState<OpenDialogData>({
    isOpen: false,
    type: '',
  });

  const { isLoading, sendRequest: savePostRequest } = useHttp(); 
  const loggedUserInformation = useLoggedUserInformation();

  const handleSavePost = (postData: PostRequest) => {

    savePostRequest({
      url: "http://localhost:8081/api/v1/post/save",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: postData
    },
    () => {})

    setDialogData({isOpen: false, type: ''})
  }

  const handleOnClose = () => {
    setDialogData({isOpen: false, type: 'Post'});
  }

  return (
    <div className={classes.createPostContainer}>
      {dialogData.isOpen && (
        <PostModal
          onConfirm={handleSavePost}
          title="Title"
          message="Message"
          type={dialogData.type}
          onClose={handleOnClose}
        />
      )}
      <div className={classes["post-form-container"]}>
        <div className={classes["avatar-container"]}>
          <img src={Logo} alt="User Avatar" className={classes["avatar"]} />
        </div>
        <button
          className={classes["open-modal-button"]}
          onClick={() => setDialogData({isOpen: true, type: 'Post'})}
        >
          Create Post
        </button>
      </div>
      <div className={classes["button-container"]}>
        <StyledButton
          text="Media"
          iconType={faImage}
          onClick={() => setDialogData({isOpen: true, type: 'Media'})}
          color="blue"
        />
        <StyledButton
          text="Event"
          iconType={faCalendarDays}
          onClick={() => console.log("dusan govnar")}
          color="green"
        />
      </div>
    </div>
  );
};

export default CreatePost;
