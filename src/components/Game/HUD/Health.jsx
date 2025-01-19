import React from "react";
import { useSelector } from "react-redux";

const Health = () => {
  const health = useSelector((state) => state.player.health);

  return (
    <div>
      <p>Health: {health}/100</p>
    </div>
  );
};

export default Health;
