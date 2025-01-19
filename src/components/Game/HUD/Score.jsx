import React from "react";
import { useSelector } from "react-redux";

const Score = () => {
  const score = useSelector((state) => state.player.score);
  return (
    <div className="score-display">
      <h2>Score: {score}</h2>
    </div>
  );
};

export default Score;
