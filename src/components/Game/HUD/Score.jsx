/*this component is used to display the player score within the HUD*/

import React from "react";
import { useSelector } from "react-redux";

const ScoreDisplay = () => {
    const score = useSelector((state) => state.player.score); // Access score from redux store
    console.log(score, '<---in score.jsx')

    return (
        <div className="score-display">
            <h2>Score: {score}</h2> {/* Display the score in HUD */}
        </div>
    );
};

export default ScoreDisplay;