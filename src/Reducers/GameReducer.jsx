import { START_TIMER, STOP_TIMER, RESET_TIMER, UPDATE_TIME, TOGGLE_PAUSE } from '../Actions/GameActions';

const initialState = {
  timer: {
    time: 0,
    isRunning: false,
  },
  gamePaused: false, // New state to track if the game is paused
};

const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: true,
        },
      };
    case STOP_TIMER:
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
        },
      };
    case RESET_TIMER:
      return {
        ...state,
        timer: {
          time: 0,
          isRunning: false,
        },
      };
    case UPDATE_TIME:
      return {
        ...state,
        timer: {
          ...state.timer,
          time: state.timer.time + 1,
        },
      };
    case TOGGLE_PAUSE:
      return {
        ...state,
        gamePaused: !state.gamePaused, // Toggle the paused state
      };
    default:
      return state;
  }
};

export default GameReducer;

/*Role: Handles game-related state.
Purpose: Manages the global game state, including the timer, pause state, and any other global settings like level progression or game over conditions.
Example: A reducer that handles the START_TIMER, STOP_TIMER, and TOGGLE_PAUSE actions.*/