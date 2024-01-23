import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "../styles/Pages/EditProfilePage.module.css";
import {
  validateEmail,
  validateLastname,
  validateName
} from "../util/validation";
import useHttp from "../hooks/useHttp";
import RegistrationResponse from "../model/response/RegistrationResponse";
import { useNavigate } from "react-router-dom";
import UpdateUserRequest from "../model/request/UpdateUserRequest";
import { useLoggedUserInformation } from "../hooks/useLoggedUserInformation";
import UserResponse from "../model/response/UserResponse";
import UpdateUserResponse from "../model/response/UpdateUserResponse";
import LoginResponse from "../model/response/LoginResponse";

const EditProfilePage = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");

  const [emailError, setEmailError] = useState("");
  const [firstnameError, setFirstNameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [genderError, setGenderError] = useState("");

  const { isLoading, sendRequest } = useHttp();
  const navigate = useNavigate();
  const params = useParams()
  const userInformation = useLoggedUserInformation()

  const applyUserResponse = (userData: UserResponse) => {
    console.log(userData)
    setEmail(userData.email)
    setFirstName(userData.firstname)
    setLastname(userData.lastname)
    setGender(userData.gender)
    setDateOfBirth(userData.dateOfBirth)
  }

  useEffect(() => {
    sendRequest({
        url: "http://localhost:8081/api/v1/user/getUser?userId=" + params.userId,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        }
      },
      applyUserResponse)
  }, [])

  const applyResponse = (response: UpdateUserResponse) => {
    if (response.message === "Successfully!") {
        console.log(response)
      const loginResponse = new LoginResponse(userInformation?.tokens!, response.userResponse, userInformation?.message!)
      localStorage.setItem("loginResponse", JSON.stringify(loginResponse));
      navigate("/viewMyProfile");
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

    if (
      firstNameErrorMessage !== "" ||
      lastNameErrorMessage !== "" ||
      dobErrorMessage !== "" ||
      genderErrorMessage !== "" ||
      emailErrorMessage !== ""
    ) {
      setEmailError(emailErrorMessage);
      setDateOfBirthError(dobErrorMessage);
      setGenderError(genderErrorMessage);
      setFirstNameError(firstNameErrorMessage);
      setLastnameError(lastNameErrorMessage);
      return;
    }

    const userData = new UpdateUserRequest(parseInt(params.userId!), firstname, lastname, email, gender, dateOfBirth, null);

    sendRequest(
      {
        url: "http://localhost:8081/api/v1/user/updateUser",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
        body: userData,
      },
      applyResponse
    );

    setEmailError('');
    setDateOfBirthError('');
    setGenderError('');
    setFirstNameError('');
    setLastnameError('');
  };

  return (
    <>
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <h2>Edit profile</h2>
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
                value={firstname}
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
                value={lastname}
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
                value={dateOfBirth}
              />
              <p className={classes.error}>{dateOfBirthError}</p>
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="gender">Gender</label>
              <select
                onChange={(event) => setGender(event.target.value)}
                placeholder="Choose your gender..."
                value={gender}
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
              value={email}
            />
            <p className={classes.error}>{emailError}</p>
          </div>
          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Editing..." : "Edit"}
            </button>
          </div>
          <div>
            <p className={classes.signup}>
              Want to change password?{" "}
              <Link to="/auth?mode=login">Change password</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfilePage;
