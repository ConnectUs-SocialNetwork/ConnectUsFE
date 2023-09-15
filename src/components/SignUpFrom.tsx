import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../styles/SignUpForm.module.css";
import {
  validateEmail,
  validateLastname,
  validateName,
  validatePassword,
} from "../util/validation";
import useHttp from "../hooks/useHttp";
import RegistrationResponse from "../model/response/RegistrationResponse";
import { useNavigate } from "react-router-dom";
import { RegistrationRequest } from "../model/request/RegistrationRequest";

const SignupFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
  const [firstnameError, setFirstNameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [genderError, setGenderError] = useState("");

  const { isLoading, sendRequest: sendRegistrationRequest } = useHttp();
  const navigate = useNavigate();

  const applyResponse = (response: RegistrationResponse) => {
    if (response.message === "Successfully!") {
      localStorage.setItem("loginResponse", JSON.stringify(response));
      navigate("/");
    } else if (response.message === "The entered email is already in use!") {
      setEmailError("The entered email is already in use!");
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let firstNameErrorMessage = validateName(firstname);
    let lastNameErrorMessage = validateLastname(lastname);
    let dobErrorMessage = dateOfBirth === "" ? "Choose date of birth." : "";
    let genderErrorMessage = gender === "" ? "Choose gender" : "";
    let emailErrorMessage = validateEmail(email);
    let passwordErrorMessage = validatePassword(password);
    let repeatedPasswordErrorMessage;
    if (repeatedPassword === "") {
      repeatedPasswordErrorMessage = "Repeated password can not be empty!";
    } else if (repeatedPassword !== password) {
      repeatedPasswordErrorMessage =
        "Password and repeated password don't match";
    } else {
      repeatedPasswordErrorMessage = "";
    }

    if (
      firstNameErrorMessage !== "" ||
      lastNameErrorMessage !== "" ||
      dobErrorMessage !== "" ||
      genderErrorMessage !== "" ||
      emailErrorMessage !== "" ||
      passwordErrorMessage !== "" ||
      repeatedPasswordErrorMessage !== ""
    ) {
      setEmailError(emailErrorMessage);
      setPasswordError(passwordErrorMessage);
      setDateOfBirthError(dobErrorMessage);
      setGenderError(genderErrorMessage);
      setFirstNameError(firstNameErrorMessage);
      setLastnameError(lastNameErrorMessage);
      setRepeatedPasswordError(repeatedPasswordErrorMessage);
      return;
    }

    const registrationData = new RegistrationRequest(
      email,
      password,
      firstname,
      lastname,
      dateOfBirth,
      gender
    );

    sendRegistrationRequest(
      {
        url: "http://localhost:8081/api/v1/auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: registrationData,
      },
      applyResponse
    );

    setEmailError('');
    setPasswordError('');
    setDateOfBirthError('');
    setGenderError('');
    setFirstNameError('');
    setLastnameError('');
    setRepeatedPasswordError('');
  };

  return (
    <>
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <h2>Sign up</h2>
          <div className={classes.inputContainerWrapper}>
            <div className={classes.inputContainer}>
              <label htmlFor="firstname">Firstname</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <p className={classes.error}>{firstnameError}</p>
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="lastname">Lastname</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
              />
              <p className={classes.error}>{lastnameError}</p>
            </div>
          </div>
          <div className={classes.inputContainerWrapper}>
            <div className={classes.inputContainer}>
              <label htmlFor="dof">Date of birth</label>
              <input
                id="dof"
                type="date"
                name="dof"
                onChange={(event) => setDateOfBirth(event.target.value)}
              />
              <p className={classes.error}>{dateOfBirthError}</p>
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="gender">Gender</label>
              <select
                onChange={(event) => setGender(event.target.value)}
                placeholder="Choose your gender..."
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <p className={classes.error}>{genderError}</p>
            </div>
          </div>
          <div className={classes.inputContainerSecond}>
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
          <div className={classes.inputContainerSecond}>
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
          <div className={classes.inputContainerSecond}>
            <label htmlFor="image">Repeat password</label>
            <input
              id="repeated-password"
              type="password"
              name="repeated-password"
              onChange={(event) => {
                setRepeatedPassword(event.target.value);
              }}
            />
            <p className={classes.error}>{repeatedPasswordError}</p>
          </div>
          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>
          <div>
            <p className={classes.signup}>
              Already have an account?{" "}
              <Link to="/auth?mode=login">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupFrom;
