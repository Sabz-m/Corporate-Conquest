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
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [dispatch, isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div>
      <h2>Game Time: {formatTime(time)}</h2>
    </div>
  );
};

export default Timer;
