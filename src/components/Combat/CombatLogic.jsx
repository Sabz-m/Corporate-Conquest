/*Role: Manages the combat system.
Purpose: Contains the rules and logic for combat interactions, such as attacking, receiving damage, and applying effects to characters or enemies.
Example: This might involve calculating damage based on stats, triggering combat animations, and updating the player's health after a combat action.*/

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayerHealth } from '../../Actions/PlayerActions';

const CombatManager = () => {
    const dispatch = useDispatch();
    const currentHealth = useSelector((state) => state.player.health);

    const handlePlayerDamage = (damageAmount) => {
        const newHealth = Math.max(currentHealth - damageAmount, 0);
        dispatch(updatePlayerHealth(newHealth));
    };

    return (
        <button onClick={() => handlePlayerDamage(10)}>Take Damage</button>
    );
};

export default CombatManager;
