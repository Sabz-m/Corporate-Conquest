import React from "react";
import PhaserGame from "./PhaserGame";
import HUD from "./HUD/HUD";

const GameLoop = () => {
  return (
    <div className="game-container">
      <HUD />
      <PhaserGame />
    </div>
  );
};

export default GameLoop;
