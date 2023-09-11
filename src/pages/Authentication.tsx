import { useSearchParams } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupFrom from "../components/SignUpFrom";

const AuthenticationPage = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return <>
    {isLogin ? <LoginForm /> : <SignupFrom />}
  </>;
};

export default AuthenticationPage;
