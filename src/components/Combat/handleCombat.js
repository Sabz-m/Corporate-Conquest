import { useSelector } from "react-redux";
import { enemyTakesDamage, playerTakesDamage } from "../../Actions/CombatActions";
import { updatePlayerScore } from "../../Actions/PlayerActions";
import { setHasCollided } from "../../Actions/PlayerActions";

export const handlePlayerCollisionWithEnemy = (player, enemy, dispatch, isPlayerAttacking, hasCollided) => {

    if (player && enemy) {

        if(hasCollided) return;

        // Check if health is greater than 0 to avoid going below 0
        const currentHealth = player.health;
        
        if (currentHealth <= 0 || hasCollided) return; // Exit if player is already "dead"

        // Only apply damage once per collision (use hasCollided flag)
        if (!hasCollided) {
            const currentScore =  player.score;

            if (isPlayerAttacking) {
                 handlePlayerAttack();
            } else {
                dispatch(playerTakesDamage(10));
                dispatch(updatePlayerScore(-5)); // Update player score
            }

            dispatch(setHasCollided(true));
        }

        
        if (isPlayerAttacking) {
            enemy.setVelocityX(100);
            enemy.setVelocityY(-50);  
        } else {
            player.setVelocityX(-100); 
            player.setVelocityY(-50);  
        }

        
        if (enemy.health <= 0) {
            enemy.destroy();
        }

        enemy.setVelocityX(0);
        enemy.setVelocityY(0);

    }
};


export const handlePlayerAttack = (player, enemy, dispatch) => {
    if (player && enemy && player.isAttacking) {

        dispatch(enemyTakesDamage(10));  
        dispatch(updatePlayerScore(10));
    }
};