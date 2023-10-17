import React from "react";
import classes from "../../styles/Feed/AvatarAndFullName.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import { calculateTimeAgo1, formatDate } from "../../util/helperFuntions";
import { useState } from "react";
import TimePopup from "../UI/TimePopup";

interface PropsData {
  pageId: number;
  name: string;
  profilePicture: string;
  time: string;
}

const AvatarAndFullName: React.FC<PropsData> = (props) => {
  const [showExactTime, setShowExactTime] = useState(false);

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
      <div>
        <img
          src={
            imageInBase64
          }
          alt="User Avatar"
          className={classes["avatar"]}
        />
      </div>
      <div>
        <p className={classes.nameAndSurname}>{props.name}</p>
        <p
          className={classes.time}
          onMouseEnter={() => setShowExactTime(true)}
          onMouseLeave={() => setShowExactTime(false)}
        >
          {timeAgo}
        </p>
        {showExactTime && <TimePopup exactTime={formattedDate} />}
      </div>
    </div>
  );
};

export default AvatarAndFullName;
