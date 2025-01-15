export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const UPDATE_TIME = 'UPDATE_TIME';
export const TOGGLE_PAUSE = 'TOGGLE_PAUSE';

// Action Creator
export const togglePause = () => ({
  type: TOGGLE_PAUSE,
});


export const startTimer = () => ({
  type: START_TIMER,
});

export const stopTimer = () => ({
  type: STOP_TIMER,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});

export const updateTime = () => ({
  type: UPDATE_TIME,
});

/*Role: Contains actions related to the game’s global state.
Purpose: Actions for controlling the game’s timer, paused state, and other global game features.
Example: Actions like startTimer, stopTimer, togglePause, and resetGame.*/

