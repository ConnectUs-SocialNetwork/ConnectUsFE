import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../../styles/Authentication/SignUpForm.module.css";
import {
  validateEmail,
  validateEmptyString,
  validateLastname,
  validateName,
  validatePassword,
} from "../../util/validation";
import useHttp from "../../hooks/useHttp";
import RegistrationResponse from "../../model/response/RegistrationResponse";
import { useNavigate } from "react-router-dom";
import { RegistrationRequest } from "../../model/request/RegistrationRequest";

const SignupFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
  const [firstnameError, setFirstNameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [countryError, setCountryError] = useState("")
  const [cityError, setCityError] = useState("")
  const [streetError, setStreetError] = useState("")
  const [numberError, setNUmberError] = useState("")

  const { isLoading, sendRequest: sendRegistrationRequest } = useHttp();
  const navigate = useNavigate();

  const applyResponse = (response: RegistrationResponse) => {
    if (response.message === "Successfully!") {
      localStorage.setItem("loginResponse", JSON.stringify(response));
      navigate("/");
    } else if (response.message === "The entered email is already in use!") {
      setEmailError("The entered email is already in use!");
    } else if(response.message === "Location information are not correct!"){
      setCountryError("Location information are not correct!")
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
    let countryErrorMessage = validateEmptyString(country);
    let cityErrorMessage = validateEmptyString(city);
    let streetErrorMessage = validateEmptyString(street);
    let numberErrorMessage = validateEmptyString(number)
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
      repeatedPasswordErrorMessage !== "" ||
      countryErrorMessage !== "" ||
      cityErrorMessage !== "" ||
      streetErrorMessage !== "" ||
      numberErrorMessage
    ) {
      setEmailError(emailErrorMessage);
      setPasswordError(passwordErrorMessage);
      setDateOfBirthError(dobErrorMessage);
      setGenderError(genderErrorMessage);
      setFirstNameError(firstNameErrorMessage);
      setLastnameError(lastNameErrorMessage);
      setRepeatedPasswordError(repeatedPasswordErrorMessage);
      setCountryError(cityErrorMessage)
      setCityError(cityErrorMessage)
      setStreetError(streetErrorMessage)
      setNUmberError(numberErrorMessage)
      return;
    }

    const registrationData = new RegistrationRequest(
      email,
      password,
      firstname,
      lastname,
      dateOfBirth,
      gender,
      country,
      city,
      street, 
      number
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
    setCountry('');
    setCityError('');
    setCityError('');
    setNUmberError('');
  };

  return (
    <>
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <h2>Sign up</h2>
          <div className={classes.inputContainerWrapper}>
            <div className={classes.inputContainer}>
              <label htmlFor="firstname">Firstname*</label>
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
              <label htmlFor="lastname">Lastname*</label>
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
              <label htmlFor="dof">Date of birth*</label>
              <input
                id="dof"
                type="date"
                name="dof"
                onChange={(event) => setDateOfBirth(event.target.value)}
              />
              <p className={classes.error}>{dateOfBirthError}</p>
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="gender">Gender*</label>
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
            <label htmlFor="email">Email*</label>
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
            <label htmlFor="image">Password*</label>
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
            <label htmlFor="image">Repeat password*</label>
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
          <div className={classes.inputContainerWrapper}>
            <div className={classes.inputContainer}>
              <label htmlFor="dof">Country*</label>
              <input
                id="country"
                type="text"
                name="country"
                onChange={(event) => setCountry(event.target.value)}
              />
              <p className={classes.error}>{countryError}</p>
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="gender">City*</label>
              <input
                id="city"
                type="text"
                name="city"
                onChange={(event) => setCity(event.target.value)}
              />
              <p className={classes.error}>{cityError}</p>
            </div>
          </div>
          <div className={classes.inputContainerWrapper}>
            <div className={classes.inputContainer}>
              <label htmlFor="dof">Street*</label>
              <input
                id="street"
                type="text"
                name="street"
                onChange={(event) => setStreet(event.target.value)}
              />
              <p className={classes.error}>{streetError}</p>
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="gender">Number*</label>
              <input
                id="number"
                type="text"
                name="number"
                onChange={(event) => setNumber(event.target.value)}
              />
              <p className={classes.error}>{numberError}</p>
            </div>
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
