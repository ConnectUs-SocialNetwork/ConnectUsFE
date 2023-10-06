import { useEffect, useState } from "react";
import PageHeader from "../components/Page/ViewPage/Header/PageHeader";
import classes from "../styles/Pages/ViewPage.module.css";
import BlankProfilePicture from "../assets/BlankProfilePicture.png";
import NavBar from "../components/Page/ViewPage/Navigation/NavBar";
import { Outlet, useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";

const ViewPage = () => {
  const [pageInformation, setPageInformation] = useState<ViewPageResponse>();
  const { sendRequest: sendViewPageRequest } = useHttp();
  const userInformation = useLoggedUserInformation();
  const params = useParams()

   const applyData = (data: ViewPageResponse) => {
    setPageInformation(data);
   }

  useEffect(() => {
    sendViewPageRequest(
      {
        url: "http://localhost:8081/api/v1/page/getViewPageResponse" + "?pageId=" + params.pageId + "&userId=" + userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyData
    );
  }, []);

  return (
    <div className={classes.viewUserProfileContainer}>
      <PageHeader
        imageSrc={
          pageInformation?.avatar === ""
            ? BlankProfilePicture
            : pageInformation?.avatar!
        }
        name={pageInformation?.name!}
        numberOfLikes={pageInformation?.numberOfLikes!}
        description={pageInformation?.description!}
        liked={pageInformation?.liked!}
      />
      <NavBar />
      <div className={classes.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default ViewPage;
