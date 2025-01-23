import { Link } from "react-router-dom";
import { useState } from "react";
import "./Settings.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeOff,
  faVolumeHigh,
  faHome,
  faRefresh,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { resetGame } from "../../Actions/GameActions";

export default function InGameSettings() {
  const dispatch = useDispatch();
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    setIsSoundOn((prevState) => !prevState);
  };

  const handleRestart = () => {
    dispatch(resetGame()); // Reset game state (timer + score)
  };

  return (
    <section className="settings">
      <div>
        <h2>SETTINGS</h2>
        <button className="button">
          <FontAwesomeIcon
            icon={faPlay}
            style={{ marginRight: "10px", fontSize: "20px" }}
          />
          Resume
        </button>
        <Link to="/start-game" onClick={handleRestart}>
          <button className="button">
            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "10px" }} />
            Restart
          </button>
        </Link>
        <Link to="/">
          <button className="button">
            <FontAwesomeIcon icon={faHome} style={{ marginRight: "10px" }} />
            Main Menu
          </button>
        </Link>
        <button className="button" onClick={toggleSound}>
          <FontAwesomeIcon
            icon={isSoundOn ? faVolumeHigh : faVolumeOff}
            style={{ marginRight: "10px" }}
          />
          {isSoundOn ? "Sound On" : "Sound Off"}
        </button>
      </div>
    </section>
  );
}
