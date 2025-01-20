import React from "react";
import Timer from "./Timer";
import Health from "./Health";
import Score from "./Score";
import InGameSettingsButton from "./InGameSettingsButton";
// import Stats from "./Stats";
// import Inventory from "./Inventory";

const HUD = () => {
  return (
    <div className="hud-overlay">
      <div>
        <div className="timer-score">
          <Timer />
          <Score />
        </div>
        <InGameSettingsButton />
      </div>
      <div className="health">
        <Health />
      </div>
      {/* <Stats /> */}
      {/* <Inventory /> */}
    </div>
  );
};

export default HUD;
