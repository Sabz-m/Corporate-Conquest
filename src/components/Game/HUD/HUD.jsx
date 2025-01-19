import React from "react";
import Timer from "./Timer";
import Health from "./Health";
import Score from "./Score";
import Stats from "./Stats";
import Inventory from "./Inventory";

const HUD = () => {
  return (
    <div className="hud-overlay">
      <Timer />
      <Health />
      <Score />
      <Stats />
      <Inventory />
    </div>
  );
};

export default HUD;
