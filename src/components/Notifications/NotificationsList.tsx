import React, { useEffect, useState } from "react";
import NotificationResponse from "../../model/response/NotificationResponse";
import Notification from "./Notification";
import NoNotifications from "./NoNotifications";

interface NotificationsProps {
  notifications: NotificationResponse[];
  isUnread: boolean;
}

const NotificationsList: React.FC<NotificationsProps> = (props) => {
  const [notifications, setNotifications] = useState(props.notifications);

  useEffect(() => {
    setNotifications(props.notifications);
  }, [props.notifications]);

  const removeNotification = (notification: NotificationResponse) => {
    const updatedNotifications = notifications.filter(
      (n) => n.id !== notification.id
    );
    setNotifications(updatedNotifications);
  };

  return (
    <>
      {notifications.length !== 0 && (
        <>
          {notifications.map((notification) => (
            <Notification
              notification={notification}
              onRemoveNotification={removeNotification}
              key={notification.id}
              isUnread={props.isUnread}
            />
          ))}
        </>
      )}
      {notifications.length === 0 && <NoNotifications />}
    </>
  );
};

export default NotificationsList;
