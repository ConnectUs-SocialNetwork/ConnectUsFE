import { useMutation } from '@tanstack/react-query';
import classes from '../styles/LoginForm.module.css'

const LoginForm = () => {

  return (
    <div className={classes.container}>
      <form>
        <h2>Sign in</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>
        <div>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
