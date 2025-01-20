/*Role: Manages the combat system.
Purpose: Contains the rules and logic for combat interactions, such as attacking, receiving damage, and applying effects to characters or enemies.
Example: This might involve calculating damage based on stats, triggering combat animations, and updating the player's health after a combat action.*/


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlayerAttack } from '../../Actions/CombatActions';
//import { updatePlayerHealth } from '../../Actions/PlayerActions';

const Combat = () => {
    const dispatch = useDispatch();
    const playerHealth = useSelector(state => state.player.health);
    const enemyHealth = useSelector(state => state.combat.enemyHealth);
    const playerIsAttacking = useSelector(state => state.combat.playerIsAttacking);

    const handleKeyPress = (e) => {
        if (e.code === 'Space') {
            dispatch(togglePlayerAttack(true));
        }
    };

    const handleKeyUp = (e) => {
        if (e.code === 'Space') {
            dispatch(togglePlayerAttack(false))
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', handleKeyUp);

        }
    }, [])

    return (
        <div>
            <div>
                <h2>Player Health: {playerHealth}</h2>
                <h2>Enemy Health: {enemyHealth}</h2>
            </div>
            {playerIsAttacking && <div>Player is attacking!</div>}
        </div>
    );
};



export default Combat

