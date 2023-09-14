import classes from "../styles/LoginForm.module.css";
import { useState } from "react";
import LoginRequest from "../model/request/LoginRequest";
import useHttp from "../hooks/useHttp";
import LoginResponse from "../model/response/LoginResponse";
import { validateEmail, validatePassword } from "../util/validation";
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { isLoading, sendRequest: sendLoginRequest } = useHttp();

  const applyData = (loginResponse: LoginResponse) => {
    if(loginResponse.message === "Email or password are not correct!"){
      setPasswordError("Email or password are not correct!")
    }

    if(loginResponse.message === "Successfully!"){
      localStorage.setItem('loginResponse', JSON.stringify(loginResponse))
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let emailErrorMessage = validateEmail(email)
    let passwordErrorMessage = validatePassword(password)

    if(emailErrorMessage !== "" || passwordErrorMessage !== ""){
      setEmailError(emailErrorMessage);
      setPasswordError(passwordErrorMessage);
      return;
    }

    setEmailError("");
    setPasswordError("");

    var loginData = new LoginRequest(email, password);
    sendLoginRequest(
      {
        url: "http://localhost:8081/api/v1/auth/authenticate",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: loginData
      },
      applyData
    );


  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <h2>Sign in</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <p className={classes.error}>{emailError}</p>
        </div>
        <div>
          <label htmlFor="image">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <p className={classes.error}>{passwordError}</p>
        </div>
        <div>
          <button type="submit" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign in'}</button>
        </div>
        <div>
          <p className={classes.signup}>New to ConnectUs? <Link to="/auth?mode=signup">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
