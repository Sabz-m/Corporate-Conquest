/*this component is used to display the player score within the HUD*/

import React from "react";
import { connect } from "react-redux";

const ScoreDisplay = ({score}) => {
    return (
        <div className="score-display">
            <h2>Score: {score}</h2>
        </div>
    );
};

//map the redux state to props for access score in the component

const mapStateToProps = (state) => ({
    score: state.player.score //access score from the player in redux
})

export default connect(mapStateToProps)(ScoreDisplay);