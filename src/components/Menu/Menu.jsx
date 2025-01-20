import { Link } from "react-router-dom";
import "../../styles/App.css";
import "./Menu.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faUser,
  faGear,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";

export default function Menu({ onStart, onLogin, onSettings }) {
  return (
    <section className="menu">
      <h2>CORPORATE-CONQUEST</h2>
      <Link to="/level-selection">
        <button className="button">
          <FontAwesomeIcon
            icon={faCirclePlay}
            style={{ marginRight: "10px" }}
          />
          START
        </button>
      </Link>
      <Link to="/login">
        <button className="button">
          <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
          LOGIN
        </button>
      </Link>
      <Link to="/settings">
        <button className="button">
          <FontAwesomeIcon icon={faGear} style={{ marginRight: "10px" }} />
          SETTINGS
        </button>
      </Link>
      <Link to="/leaderboard">
        <button className="button">
          <FontAwesomeIcon
            icon={faRankingStar}
            style={{ marginRight: "10px" }}
          />
          LEADERBOARD
        </button>
      </Link>
    </section>
  );
}
