import { useSearchParams } from "react-router-dom";
import LoginForm from "../components/Authentication/LoginForm";
import SignupFrom from "../components/Authentication/SignUpFrom";

const AuthenticationPage = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return <>
    {isLogin ? <LoginForm /> : <SignupFrom />}
  </>;
};

export default AuthenticationPage;
