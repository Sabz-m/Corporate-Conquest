


import React, { useEffect } from 'react';
import PhaserGame from './PhaserGame';
import HUD from './HUD/HUD';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, stopTimer, togglePause } from "../../Actions/GameActions";


const GameLoop = () => {
  const dispatch = useDispatch();
  const { gamePaused, timer } = useSelector((state) => state.game);
  const {health, score} = useSelector((state) => state.player) //access score from redux
  

  useEffect(() => {
    if (!gamePaused) {
      dispatch(startTimer()); // Start the timer when game is unpaused
    } else {
      dispatch(stopTimer()); // Stop the timer when game is paused
    }

    return () => {
      if (!gamePaused) {
        dispatch(stopTimer()); // Clean up by stopping the timer when the component unmounts
      }
    };
  }, [dispatch, gamePaused]);

  const handlePauseToggle = () => {
    dispatch(togglePause()); // Toggle the game pause state
  };

 

  return (
    <div>
      <HUD />
      <PhaserGame dispatch={dispatch}/>
    </div>
  );
};

export default GameLoop;

