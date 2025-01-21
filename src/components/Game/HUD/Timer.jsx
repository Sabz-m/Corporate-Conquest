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

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, isRunning]);

  return (
    <div>
      <h2>Game Time: {time}s</h2>
    </div>
  );
};

export default Timer;
