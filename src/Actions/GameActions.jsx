export const START_TIMER = "START_TIMER";
export const STOP_TIMER = "STOP_TIMER";
export const RESET_TIMER = "RESET_TIMER";
export const UPDATE_TIME = "UPDATE_TIME";
export const TOGGLE_PAUSE = "TOGGLE_PAUSE";
export const RESET_GAME = "RESET_GAME";

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

export const resetGame = () => ({
  type: RESET_GAME,
});
