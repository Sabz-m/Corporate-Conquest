import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <section className="Main-menu">
      <div>
        <Link to="/start-game">
          <button>Start</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/settings">
          <button>Settings</button>
        </Link>
      </div>
      <div>
        <Link to="/leaderboards">
          <button>Leaderboards</button>
        </Link>
      </div>
    </section>
  );
}
