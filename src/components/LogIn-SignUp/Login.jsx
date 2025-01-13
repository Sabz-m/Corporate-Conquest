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
