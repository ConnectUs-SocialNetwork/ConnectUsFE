import { useEffect, useState } from "react";
import RecommendedPageResponse from "../../../model/response/RecommendedPageResponse";
import useHttp from "../../../hooks/useHttp";
import { useLoggedUserInformation } from "../../../hooks/useLoggedUserInformation";
import classes from "../../../styles/Recommendation/Friend/RecommendedFriendList.module.css";
import RecommendedPage from "./RecommendedPage";
import Spinner from "../../UI/Spinner";
import NoPages from "./NoPages";

const RecommendedPageList = () => {
  const [pages, setPages] = useState<RecommendedPageResponse[]>([]);
  const { isLoading, sendRequest } = useHttp();
  const userInformation = useLoggedUserInformation();

  useEffect(() => {
    getRecommendedPages();
  }, []);

  const applyData = (data: RecommendedPageResponse[]) => {
    setPages(data);
  };

  const getRecommendedPages = () => {
    sendRequest(
      {
        url:
          "http://localhost:8081/api/v1/page/getRecommendedPages?userId=" +
          userInformation?.user.id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
      },
      applyData
    );
  };

  const removePage = (page: RecommendedPageResponse) => {
    setPages(pages.filter((currentPage) => currentPage.id !== page.id));
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.h2}>You may like...</h2>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {pages.map((page) => (
            <RecommendedPage page={page} key={page.id} onRemove={removePage} />
          ))}
        </>
      )}
      {pages && pages.length === 0 && (
        <>
          <NoPages />
        </>
      )}
    </div>
  );
};

export default RecommendedPageList;
