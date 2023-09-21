import React from "react";
import classes from "../../styles/Feed/AvatarAndFullName.module.css";
import PAV_0001 from "../../assets/PAV_0001.png";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import { calculateTimeAgo1, formatDate } from "../../util/helperFuntions";
import { useState } from "react";
import TimePopup from "../UI/TimePopup";

interface PropsData{
  time: string;
}

const AvatarAndFullName:React.FC<PropsData> = ({time}) => {
  const [showExactTime, setShowExactTime] = useState(false);
  const userInformation = useLoggedUserInformation()!;

  const formattedDateTimeFromServer = time;
  const parsedDateTime = new Date(formattedDateTimeFromServer);

  let timeAgo = calculateTimeAgo1(parsedDateTime);
  const formattedDate = formatDate("2023-09-19T12:30:00");

  return (
    <div className={classes["avatar-container"]}>
      <div>
        <img src={PAV_0001} alt="User Avatar" className={classes["avatar"]} />
      </div>
      <div>
        <p className={classes.nameAndSurname}>
          {userInformation.user.firstname} {userInformation.user.lastname}
        </p>
        <p
          className={classes.time}
          onMouseEnter={() => setShowExactTime(true)}
          onMouseLeave={() => setShowExactTime(false)}
        >
          {timeAgo}
        </p>
        {showExactTime && (
          <TimePopup exactTime={formattedDate} />
        )}
      </div>
    </div>
  );
};

export default AvatarAndFullName;
