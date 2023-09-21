import React from "react";
import classes from '../../styles/UI/TimePopup.module.css'

interface TimePopupProps {
  exactTime: string;
}

const TimePopup: React.FC<TimePopupProps> = ({ exactTime }) => {
  return (
    <div className={classes['time-popup']}>
      {exactTime}
    </div>
  );
};

export default TimePopup;
