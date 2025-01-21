import React from "react";
import Timer from "./Timer";
import Health from "./Health";
import Score from "./Score";
import Stats from "./Stats";
import InGameSettingsButton from "./InGameSettingsButton";


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
