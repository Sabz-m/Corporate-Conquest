/*Role: Contains actions related to combat state.
Purpose: Actions for handling combat-related changes, such as dealing damage, starting a fight, or resolving an attack.
Example: Actions like startCombat, endCombat, and applyDamage.*/

// Action Types

// For player damage
export const HANDLE_PLAYER_DAMAGE = "HANDLE_PLAYER_DAMAGE";

// For applying combat effects (buffs, debuffs, status effects)
export const APPLY_COMBAT_EFFECT = "APPLY_COMBAT_EFFECT";

// For clearing all combat effects (e.g., after combat ends)
export const CLEAR_COMBAT_EFFECTS = "CLEAR_COMBAT_EFFECTS";

// Action Creators

/**
 * Action creator to handle player damage
 * @param {number} damage - The amount of damage to be dealt to the player
 * @returns {object} The action object to dispatch
 */
export const handlePlayerDamage = (damage) => {
  return {
    type: HANDLE_PLAYER_DAMAGE,
    payload: { damage },
  };
};

/**
 * Action creator to apply a combat effect (e.g., poison, buff, debuff)
 * @param {object} effect - The combat effect (e.g., poison, shield, etc.)
 * @returns {object} The action object to dispatch
 */
export const applyCombatEffect = (effect) => {
  return {
    type: APPLY_COMBAT_EFFECT,
    payload: { effect },
  };
};

/**
 * Action creator to clear all combat effects (e.g., when combat ends)
 * @returns {object} The action object to dispatch
 */
export const clearCombatEffects = () => {
  return {
    type: CLEAR_COMBAT_EFFECTS,
  };
};
