
/*Role: Contains actions related to combat state.
Purpose: Actions for handling combat-related changes, such as dealing damage, starting a fight, or resolving an attack.
Example: Actions like startCombat, endCombat, and applyDamage.*/

export const playerTakesDamage = (damage) => {
  return {
    type: 'PLAYER_TAKES_DAMAGE',
    payload: damage,
  }
};

export const enemyTakesDamage = (damage) => {
    return {
        type: 'ENEMY_TAKES_DAMAGE',
        payload: damage
    }
}

export const togglePlayerAttack = (isAttacking) => {
    return {
        type: 'TOGGLE_PLAYER_ATTACK',
        payload: isAttacking
    }
}


