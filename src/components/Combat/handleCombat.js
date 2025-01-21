import { useSelector } from "react-redux";
import { enemyTakesDamage, playerTakesDamage } from "../../Actions/CombatActions";
import { updatePlayerScore } from "../../Actions/PlayerActions";
import { setHasCollided } from "../../Actions/PlayerActions";

export const handlePlayerCollisionWithEnemy = (player, enemy, dispatch, isPlayerAttacking, hasCollided, scene) => {
     console.log( '<--collision triggered')
    if (player && enemy) {

        if(hasCollided) return;

        // Check if health is greater than 0 to avoid going below 0
        const currentHealth = player.health;
        
        if (currentHealth <= 0 || hasCollided) return; // Exit if player is already "dead"

        // Only apply damage once per collision (use hasCollided flag)
        if (!hasCollided) {
            const currentScore =  player.score;

            if (isPlayerAttacking) {
                // Player is attacking - apply damage to enemy and increase player score
                dispatch(enemyTakesDamage(10)); // Example damage to the enemy
                // Add points for defeating enemy (you can modify the score increment)
                
                dispatch(updatePlayerScore(10)); // Update player score
            } else {
                // Player is not attacking - apply damage to player
                dispatch(playerTakesDamage(5));
                 // Prevent health from going below 0
                ; // Apply health damage
                // Decrease score for being hit (you can modify this behavior)
                
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

        scene.enemy.setVelocityX(0);
        enemy.setVelocityY(0);

    }
};

export const handleSuccessfulEnemyAttack = () => {
    console.log('youve been hit!')
}


export const handleSuccessfulPlayerAttack = (player, enemy, dispatch) => {


        const currentScore = isNaN(player.score) ? 0 : player.score;
        // Apply damage to the enemy
        dispatch(enemyTakesDamage(20));  // Enemy takes 20 damage
        
        // Increase player score for a successful attack
        const newScore = currentScore + 10
        dispatch(updatePlayerScore(newScore)); 

    
};