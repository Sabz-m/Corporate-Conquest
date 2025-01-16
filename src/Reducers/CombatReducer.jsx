/*Role: Handles the combat state.
Purpose: Manages the combat-related data, including health, damage taken, and combat status.
Example: A reducer that tracks whether the player is currently in combat and applies any combat actions like dealing damage.*/

// Action Types
import {
  UPDATE_PLAYER_HEALTH,
  UPDATE_PLAYER_SCORE,
} from "../Actions/PlayerActions";
import {
  HANDLE_PLAYER_DAMAGE,
  APPLY_COMBAT_EFFECT,
} from "../Actions/CombatActions";

// Initial state for combat (Player's health and other related stats)
const initialState = {
  health: 100, // Player's health starts at 100
  score: 0, // Player's score
  combatEffects: [], // Store combat-related effects, e.g., buffs, debuffs
};

// Combat Reducer function
const CombatReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_PLAYER_DAMAGE:
      // Reduce player health based on damage received
      return {
        ...state,
        health: Math.max(state.health - action.payload.damage, 0), // Health cannot go below 0
      };

    case APPLY_COMBAT_EFFECT:
      // Apply combat effects (e.g., buffs, debuffs, status effects)
      return {
        ...state,
        combatEffects: [...state.combatEffects, action.payload.effect],
      };

    case UPDATE_PLAYER_HEALTH:
      // This action would be dispatched when player health is manually updated
      return {
        ...state,
        health: action.payload.health,
      };

    case UPDATE_PLAYER_SCORE:
      // Update player score based on certain game logic
      return {
        ...state,
        score: action.payload.score,
      };

    default:
      return state;
  }
};

export default CombatReducer;
