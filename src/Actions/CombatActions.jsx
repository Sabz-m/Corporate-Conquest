export const HANDLE_PLAYER_DAMAGE = "HANDLE_PLAYER_DAMAGE";
export const APPLY_COMBAT_EFFECT = "APPLY_COMBAT_EFFECT";
export const CLEAR_COMBAT_EFFECTS = "CLEAR_COMBAT_EFFECTS";

export const handlePlayerDamage = (damage) => {
  return {
    type: HANDLE_PLAYER_DAMAGE,
    payload: { damage },
  };
};

export const applyCombatEffect = (effect) => {
  return {
    type: APPLY_COMBAT_EFFECT,
    payload: { effect },
  };
};

export const clearCombatEffects = () => {
  return {
    type: CLEAR_COMBAT_EFFECTS,
  };
};
