import classes from "../../styles/Feed/CreatePost.module.css";
import StyledButton from "../UI/StyledButton";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import PostModal from "./PostModal";
import useHttp from "../../hooks/useHttp";
import Post from "../../model/response/Post";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import PagePost from "../../model/response/PagePostResponse";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";

interface OpenDialogData {
  isOpen: boolean;
  type: string;
}

interface CreatePostProps {
  onCreatePost: (post: Post) => void;
  onCreatePagePost: (pagePost: PagePost) => void;
  type: string;
}

const CreatePost: React.FC<CreatePostProps> = ({
  onCreatePost,
  onCreatePagePost,
  type,
}) => {
  const userInformation = useLoggedUserInformation();
  const [dialogData, setDialogData] = useState<OpenDialogData>({
    isOpen: false,
    type: "",
  });

  const { sendRequest: savePostRequest } = useHttp();

  const handleSavePost = (postData: any) => {
    if (type === "post") {
      savePostRequest(
        {
          url: "http://localhost:8081/api/v1/post/save",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInformation?.tokens.accessToken,
          },
          body: postData,
        },
        applyData
      );

      setDialogData({ isOpen: false, type: "" });
    } else {
      savePostRequest(
        {
          url: "http://localhost:8081/api/v1/page-post",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInformation?.tokens.accessToken,
          },
          body: postData,
        },
        applyData
      );

      setDialogData({ isOpen: false, type: "" });
    }
  };

  const applyData = (postResponse: any) => {
    if (type === "post") {
      onCreatePost(postResponse);
    } else {
      onCreatePagePost(postResponse);
    }
  };

  const handleOnClose = () => {
    setDialogData({ isOpen: false, type: "Post" });
  };

  var imageInBase64;

  if (userInformation?.user.profileImage) {
    imageInBase64 =
      "data:image/jpeg;base64," + userInformation?.user.profileImage;
  } else {
    imageInBase64 = BlankProfilePicture;
  }
  /* */
  return (
    <div className={classes.createPostContainer}>
      {dialogData.isOpen && (
        <PostModal
          onConfirm={handleSavePost}
          type={dialogData.type}
          onClose={handleOnClose}
        />
      )}
      <div className={classes["post-form-container"]}>
        <div className={classes["avatar-container"]}>
          <img
            src={imageInBase64}
            alt="User Avatar"
            className={classes["avatar"]}
          />
        </div>
        <button
          className={classes["open-modal-button"]}
          onClick={() => setDialogData({ isOpen: true, type: "Post" })}
        >
          Create Post
        </button>
      </div>
      <div className={classes["button-container"]}>
        <StyledButton
          text="Media"
          iconType={faImage}
          onClick={() => setDialogData({ isOpen: true, type: "Media" })}
          color="blue"
          textColor="gray"
        />
        <StyledButton
          text="Event"
          iconType={faCalendarDays}
          onClick={() => console.log("dusan govnar")}
          color="green"
          textColor="gray"
        />
      </div>
    </div>
  );
};

export default CreatePost;
