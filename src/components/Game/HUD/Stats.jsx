import React from "react";
import { useSelector } from "react-redux";

const Stats = () => {
  const stats = useSelector((state) => state.player.stats);
  return (
    <div className="stats-display">
      <h2>Stats: {stats}</h2>
    </div>
  );
};

export default Stats;
