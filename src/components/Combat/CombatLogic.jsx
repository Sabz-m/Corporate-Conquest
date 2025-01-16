/*Role: Manages the combat system.
Purpose: Contains the rules and logic for combat interactions, such as attacking, receiving damage, and applying effects to characters or enemies.
Example: This might involve calculating damage based on stats, triggering combat animations, and updating the player's health after a combat action.*/

// CombatManager.js (or similar file)
import { useDispatch, useSelector } from "react-redux";
import {
  HANDLE_PLAYER_DAMAGE,
  APPLY_COMBAT_EFFECT,
} from "../../Actions/CombatActions";
import { useEffect } from "react";

// Combat logic when player takes damage
const CombatManager = () => {
  const dispatch = useDispatch();
  const { health, combatEffects } = useSelector((state) => state.combat); // Get health and effects from Redux store

  const handlePlayerDamage = (damageAmount) => {
    dispatch({
      type: HANDLE_PLAYER_DAMAGE,
      payload: { damage: damageAmount },
    });
  };

  // Example: Applying poison debuff to the player
  const applyPoisonEffect = () => {
    dispatch({
      type: APPLY_COMBAT_EFFECT,
      payload: {
        effect: {
          type: "poison",
          amount: 5, // Damage per tick
          duration: 3, // Duration of the effect
        },
      },
    });
  };

  useEffect(() => {
    if (combatEffects.some((effect) => effect.type === "poison")) {
      const poisonEffect = combatEffects.find(
        (effect) => effect.type === "poison"
      );
      const poisonDamage = poisonEffect.amount;

      handlePlayerDamage(poisonDamage); // Apply poison damage

      // If you need to remove the poison effect after duration ends
      if (poisonEffect.duration <= 0) {
        // Dispatch action to clear the poison effect
      }
    }
  }, [combatEffects, dispatch]);

  return (
    <div>
      <p>Player Health: {health}</p>
      <button onClick={() => handlePlayerDamage(10)}>Take Damage</button>
      <button onClick={applyPoisonEffect}>Apply Poison</button>
    </div>
  );
};

export default CombatManager;
