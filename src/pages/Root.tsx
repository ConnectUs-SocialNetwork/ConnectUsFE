import { Outlet } from "react-router-dom";
import NavBar from "../components/NavigationBar";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Root;
