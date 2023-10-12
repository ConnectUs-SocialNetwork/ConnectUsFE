import { useEffect, useState } from "react";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import useHttp from "../../hooks/useHttp";
import NotificationsList from "./NotificationsList";
import NotificationResponse from '../../model/response/NotificationResponse'
import LoadingPage from "../../pages/LoadingPage";
import Spinner from "../UI/Spinner";

const AllNotificationNavPage = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>();
  const { isLoading, sendRequest } = useHttp();
  const userInformation = useLoggedUserInformation();

  const applyData = (data: NotificationResponse[]) => {
    setNotifications(data);
  };

  useEffect(() => {
    sendRequest(
      {
        url:
          "http://localhost:8081/api/v1/notification" +
          "?userId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyData
    );
  }, []);

  return <>
    {!isLoading && notifications && <NotificationsList notifications={notifications} isUnread={false}/>}
    {(isLoading || !notifications) && <Spinner />}
  </>;
};

export default AllNotificationNavPage;
