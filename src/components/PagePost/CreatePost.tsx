import classes from "../../styles/Feed/CreatePost.module.css";
import ProfileImg from "../../assets/BlankProfilePicture.png";
import StyledButton from "../UI/StyledButton";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import PostModal from "./PostModal";
import useHttp from "../../hooks/useHttp";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import PagePostRequest from "../../model/request/PagePostRequest";
import PagePost from "../../model/response/PagePostResponse";
import { useParams } from "react-router-dom";

interface OpenDialogData {
  isOpen: boolean;
  type: string;
}

interface CreatePostProps {
  onCreatePost: (post: PagePost) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onCreatePost }) => {
  const userInformation = useLoggedUserInformation();
  const [dialogData, setDialogData] = useState<OpenDialogData>({
    isOpen: false,
    type: "",
  });

  const { sendRequest: savePostRequest } = useHttp();
  const params = useParams();
  console.log("Ovo je pageId: " + params.pageId)

  const handleSavePost = (postData: PagePostRequest) => {
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
  };

  const applyData = (postResponse: PagePost) => {
    onCreatePost(postResponse);
  };

  const handleOnClose = () => {
    setDialogData({ isOpen: false, type: "Post" });
  };

  return (
    <div className={classes.createPostContainer}>
      {dialogData.isOpen && (
        <PostModal
          onSavePost={handleSavePost}
          pageId={params.pageId!}
          type={dialogData.type}
          onClose={handleOnClose}
        />
      )}
      <div className={classes["post-form-container"]}>
        <div className={classes["avatar-container"]}>
          <img
            src={
              userInformation?.user.profileImage === null
                ? ProfileImg
                : userInformation?.user.profileImage
            }
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
