import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import classes from "../../../styles/Profile/Header/Actions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import * as base64 from "base64-js";
import TokensResponse from "../../../model/response/TokensResponse";
import UserResponse from "../../../model/response/UserResponse";
import LoginResponse from "../../../model/response/LoginResponse";
import useHttp from "../../../hooks/useHttp";
import UpdateUserRequest from "../../../model/request/UpdateUserRequest";

interface ActionsProps{
  onChangeUser: () => void
}

const Actions: React.FC<ActionsProps> = ({onChangeUser}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const userInformations = useLoggedUserInformation();
  const { isLoading, sendRequest } = useHttp();

  const applyData = (userResponse: UserResponse) => {
    const tokensResponse = new TokensResponse(
      userInformations?.tokens.accessToken!,
      userInformations?.tokens.refreshToken!
    );

    const message = userInformations?.message!;

    const loginResponse = new LoginResponse(
      tokensResponse,
      userResponse,
      message
    );
    localStorage.setItem("loginResponse", JSON.stringify(loginResponse));
    window.location.reload();

  };

  const sendUpdateUserRequest = (requestData: UpdateUserRequest) => {
    sendRequest(
      {
        url: "http://localhost:8081/api/v1/user/updateUser",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformations?.tokens.accessToken,
        },
        body: requestData,
      },
      applyData
    );
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result && typeof result === "object") {
          // Konvertujemo rezultat u Uint8Array
          const buffer = new Uint8Array(result);
          // Enkodiranje slike u base64
          const encodedImage = base64.fromByteArray(buffer);

          const requestData = new UpdateUserRequest(
            userInformations?.user.id!,
            userInformations?.user.firstname!,
            userInformations?.user.lastname!,
            userInformations?.user.email!,
            userInformations?.user.gender!,
            userInformations?.user.dateOfBirth!,
            encodedImage
          );

          console.log(requestData)
          sendUpdateUserRequest(requestData);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={classes.headerActions}>
      <button className={classes.button}>
        <>
          <FontAwesomeIcon icon={faUserPen} size="xl" />
          <p className={classes.p}>Edit profile</p>
        </>
      </button>
      <button className={classes.button} onClick={handleButtonClick}>
        <>
          <FontAwesomeIcon icon={faUserPen} size="xl" />
          <p className={classes.p}>Change picture</p>
        </>
      </button>
      <input
        type="file"
        accept="image/jpeg"
        id="imageInput"
        ref={fileInputRef}
        className={classes.fileInput}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Actions;
