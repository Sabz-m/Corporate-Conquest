
/*Role: Provides the login interface.
Purpose: A form that allows users to log into the game. This could include form fields for username/email and password, and logic to authenticate the user.
Example: A login form with input fields and a submit button that authenticates the user and sets up their session.*/

import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <p>login here</p>
      <Link to="/sign-up">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

