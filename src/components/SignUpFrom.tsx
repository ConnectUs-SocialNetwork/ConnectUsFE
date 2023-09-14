import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from "../styles/SignUpForm.module.css";

const SignupFrom = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstnameError, setFirstNameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {};

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
          <button type="submit">
            Sign up
          </button>
        </div>
        <div>
          <p className={classes.signup}>
            New to ConnectUs? <Link to="/auth?mode=signup">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupFrom;
