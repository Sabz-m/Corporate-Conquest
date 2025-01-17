import { Link } from "react-router-dom";
import { useState } from "react";
import "./Settings.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeOff,
  faLanguage,
  faPalette,
  faHeadset,
  faVolumeHigh,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    setIsSoundOn((prevState) => !prevState);
  };

  return (
    <section className="settings">
      <div>
        <Link to="/" className="back-button">
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ marginRight: "10px", fontSize: "20px" }}
          />
          Back
        </Link>
        <h2>SETTINGS</h2>
        <button className="button" onClick={toggleSound}>
          <FontAwesomeIcon
            icon={isSoundOn ? faVolumeHigh : faVolumeOff}
            style={{ marginRight: "10px" }}
          />
          {isSoundOn ? "Sound On" : "Sound Off"}
        </button>
        <Link to="/coming-soon">
          <button className="button">
            <FontAwesomeIcon
              icon={faLanguage}
              style={{ marginRight: "10px" }}
            />
            LANGUAGE
          </button>
        </Link>
        <Link to="/coming-soon">
          <button className="button">
            <FontAwesomeIcon icon={faPalette} style={{ marginRight: "10px" }} />
            COLOURBLIND MODE
          </button>
        </Link>
        <Link to="/coming-soon">
          <button className="button">
            <FontAwesomeIcon icon={faHeadset} style={{ marginRight: "10px" }} />
            SUPPORT
          </button>
        </Link>
      </div>
    </section>
  );
}
