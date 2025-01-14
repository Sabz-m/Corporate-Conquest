
import React, { useEffect } from 'react';
import PhaserGame from './PhaserGame';
import HUD from './HUD/HUD';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, stopTimer, togglePause } from '../../actions/gameActions';

const GameLoop = () => {
  const dispatch = useDispatch();
  const { gamePaused, timer } = useSelector((state) => state.game);
  const {score} = useSelector((state) => state.player) //access score from redux

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

  const increaseScore = () => {
    const newScore = score + 100; //this will need to be tied to game logic not yet defined.
    dispatch(updatePlayerScore(newScore));
  }

  return (
    <div>
      <PhaserGame />
      <HUD />
      <button onClick={handlePauseToggle}>
        {gamePaused ? 'Resume Game' : 'Pause Game'}
      </button>
      {/* Show the timer status */}
      <p>Game is {gamePaused ? 'Paused' : 'Running'}</p>
      <p>Time: {timer.time}s</p>
      <p>Score: {score}</p> {/*display score */}
    </div>
  );
};

export default GameLoop;


/*Role: The main container for the game loop.
Purpose: This is the component where the overall game logic is managed. It might start and stop the game, manage the game’s state, and render other components like the HUD or the Phaser game itself.
Example: It could render the Phaser game, handle game pause/resume, and monitor the game state.
Note: GameLoop.js is responsible for rendering the game itself, but it might delegate specific tasks to other components (e.g., PhaserGame.js for initializing the Phaser game). */

import PhaserGame from "./Phasergame";

export function StartGame() {
  return (
    <section>
      <PhaserGame />
    </section>
  );
}

