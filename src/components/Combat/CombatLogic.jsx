/*Role: Manages the combat system.
Purpose: Contains the rules and logic for combat interactions, such as attacking, receiving damage, and applying effects to characters or enemies.
Example: This might involve calculating damage based on stats, triggering combat animations, and updating the player's health after a combat action.*/

import {useDispatch, useSelector }  from 'react-redux';
import { updatePlayerHealth } from '../../Actions/PlayerActions'; //action to update health

const handlePlayerDamage = (damageAmount) => {
    const dispatch = useDispatch();
    const currentHealth = useSelector(state => state.player.health) // get current health from the redux store

    const newHealth = Math.max(currentHealth - damageAmount, 0) // reduce health but not below 0

    dispatch(updatePlayerHealth(newHealth)); //dispatch action to update health
}

export default handlePlayerDamage