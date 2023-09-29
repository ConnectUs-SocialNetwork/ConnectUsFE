import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "../../styles/Feed/FriendCard.module.css";
import BlankProfilePicture from "../../assets/BlankProfilePicture.png";
import StyledButton from "../UI/StyledButton";

interface FriendCardProps {
  avatar: string;
}

const FriendCard: React.FC<FriendCardProps> = ({ avatar }) => {
  return (
    <div className={classes.friendCardContainer}>
      <div className={classes.avatarAndName}>
        <img
          src={avatar !== "" ? avatar : BlankProfilePicture}
          alt="User Avatar"
          className={classes["avatar"]}
        />
        <p className={classes.nameAndSurname}>Dejan Gloginjic</p>
      </div>
      <StyledButton
        color="black"
        iconType={faPlus}
        onClick={() => {}}
        text="Add friend"
        textColor="black"
      />
    </div>
  );
};

export default FriendCard;
