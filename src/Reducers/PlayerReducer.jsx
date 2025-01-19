/*Role: Handles the player’s state.
Purpose: Manages player-related data, such as position, health, stats, and any other player-specific state.
Example: A reducer that updates the player’s health and position based on dispatched actions.*/

const initialState = {
  health: 100,
  position: { x: 0, y: 0 }, //update this to fit into the game discuss with team.
  score: 0, //score property added to player state
  stats: 0,
};

const PlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PLAYER_SCORE":
      return {
        ...state,
        score: action.payload, //update score with the value passed in the action
      };

    case "UPDATE_PLAYER_HEALTH":
      return {
        ...state,
        health: action.payload,
      };

    default:
      return state;
  }
};

export default PlayerReducer;
