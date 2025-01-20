import React from "react";
import { useSelector } from "react-redux";

const Health = () => {
  const health = useSelector((state) => state.player.health);

  return (
    <div>
      <h2>Health: {health}/100</h2>
    </div>
  );
};

export default Health;
