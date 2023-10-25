import React from "react";
import classes from "../../styles/Feed/AvatarAndFullName.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import { calculateTimeAgo1, formatDate } from "../../util/helperFuntions";
import { useState } from "react";
import TimePopup from "../UI/TimePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import SearchUserResponse from "../../model/response/SearchFriendsResponse";
import LikesModal from "./UsersModal";
import UsersModal from "./UsersModal";

interface PropsData {
  userId: number;
  firstname: string;
  lastname: string;
  profilePicture: string;
  time: string;
  taggedUsers: SearchUserResponse[];
}

const AvatarAndFullName: React.FC<PropsData> = (props) => {
  const [showExactTime, setShowExactTime] = useState(false);
  const [usersModalOpen, setUsersModalOpen] = useState(false);

  const formattedDateTimeFromServer = props.time;
  const parsedDateTime = new Date(formattedDateTimeFromServer);

  let timeAgo = calculateTimeAgo1(parsedDateTime);
  const formattedDate = formatDate(props.time);

  var imageInBase64;

  if (props.profilePicture) {
    imageInBase64 = "data:image/jpeg;base64," + props.profilePicture;
  } else {
    imageInBase64 = BlankProfilePicture;
  }

  return (
    <div className={classes["avatar-container"]}>
      {usersModalOpen && (
        <UsersModal
          users={props.taggedUsers}
          onClose={() => {
            setUsersModalOpen(false);
          }}
          title="Tagged users"
        />
      )}
      <div>
        <img
          src={imageInBase64}
          alt="User Avatar"
          className={classes["avatar"]}
        />
      </div>
      <div>
        <p className={classes.nameAndSurname}>
          {props.firstname} {props.lastname}
        </p>
        <p
          className={classes.time}
          onMouseEnter={() => setShowExactTime(true)}
          onMouseLeave={() => setShowExactTime(false)}
        >
          {timeAgo}
        </p>
        {showExactTime && <TimePopup exactTime={formattedDate} />}
      </div>
      {props.taggedUsers.length !== 0 && (
        <button className={classes.tag} onClick={() => setUsersModalOpen(true)}>
          <FontAwesomeIcon icon={faTag} />
        </button>
      )}
    </div>
  );
};

export default AvatarAndFullName;
