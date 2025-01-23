import React from "react";
import { useSelector } from "react-redux";

const Health = () => {
  const health = useSelector((state) => state.player.health);

  return (
    
      <p>Health: {health}/100</p>
  
  );
};

export default Health;
