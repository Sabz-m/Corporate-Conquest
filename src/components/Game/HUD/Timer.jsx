import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  updateTime,
} from "../../../Actions/GameActions";

const Timer = () => {
  const dispatch = useDispatch();
  const { time, isRunning } = useSelector((state) => state.game.timer);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        dispatch(updateTime());
      }, 1000); // Update every second
    }

    // Cleanup on unmount or when the timer is stopped
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, isRunning]);

  const handleStart = () => {
    dispatch(startTimer());
  };

  const handleStop = () => {
    dispatch(stopTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  return (
    <div>
      <h3>Timer: {time}s</h3>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
