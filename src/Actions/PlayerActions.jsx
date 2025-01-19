export const UPDATE_PLAYER_SCORE = "UPDATE_PLAYER_SCORE";
export const UPDATE_PLAYER_HEALTH = "UPDATE_PLAYER_HEALTH";

export const updatePlayerScore = (score) => {
  return {
    type: UPDATE_PLAYER_SCORE, //needs to match action type in the reducer
    payload: score, //new score value to update
  };
};

export const updatePlayerHealth = (health) => {
  return {
    type: UPDATE_PLAYER_HEALTH,
    payload: health,
  };
};
