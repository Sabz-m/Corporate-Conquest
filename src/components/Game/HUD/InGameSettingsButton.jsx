import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function InGameSettingsButton() {
  return (
    <Link to="/inGameSettings" className="settings-button">
      <FontAwesomeIcon
        icon={faBars}
        style={{ marginRight: "10px", fontSize: "20px" }}
      />
    </Link>
  );
}
