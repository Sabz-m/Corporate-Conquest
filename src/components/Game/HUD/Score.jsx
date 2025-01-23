import React from "react";
import { useSelector } from "react-redux";

const ScoreDisplay = () => {
    const score = useSelector((state) => state.player.score); // Access score from redux store
    // console.log(score, '<---in score.jsx')

    return (
      
            <p>Score: {score}</p> 
        
    );
};

export default ScoreDisplay;

