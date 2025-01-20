import { enemyTakesDamage, playerTakesDamage } from "../../Actions/CombatActions";
import { updatePlayerScore, updatePlayerHealth } from "../../Actions/PlayerActions";
import { setHasCollided } from "../../Actions/PlayerActions";

export const handlePlayerCollisionWithEnemy = (player, enemy, dispatch, isPlayerAttacking, hasCollided) => {

    if (player && enemy) {

        if(hasCollided) return;
        // Check if health is greater than 0 to avoid going below 0
        const currentHealth = player.health;
        if (currentHealth <= 0 || hasCollided) return; // Exit if player is already "dead"

        // Only apply damage once per collision (use hasCollided flag)
        if (!hasCollided) {
            const currentScore = isNaN(player.score) ? 0 : player.score;

            if (isPlayerAttacking) {
                // Player is attacking - apply damage to enemy and increase player score
                dispatch(enemyTakesDamage(10)); // Example damage to the enemy

                // Add points for defeating enemy (you can modify the score increment)
                const newScore = currentScore + 10;
                dispatch(updatePlayerScore(newScore)); // Update player score
            } else {
                // Player is not attacking - apply damage to player
                dispatch(playerTakesDamage(10));
                const newHealth = Math.max(currentHealth - 10, 0); // Prevent health from going below 0
                dispatch(updatePlayerHealth(newHealth)); // Apply health damage

                // Decrease score for being hit (you can modify this behavior)
                const newScore = currentScore - 5;
                dispatch(updatePlayerScore(newScore)); // Update player score
            }

            // Set the flag to true to prevent further collision handling
            dispatch(setHasCollided(true));
        }

        // Knockback: Move the enemy a little bit back
        if (isPlayerAttacking) {
            // Knockback: Move the enemy away from the player
            enemy.setVelocityX(100);  // Apply knockback to enemy on X-axis (away from player)
            enemy.setVelocityY(-50);  // Apply slight knockback on Y-axis (upwards)
        } else {
            // Player is not attacking - knockback the player
            player.setVelocityX(-100); // Apply knockback to player on X-axis (away from enemy)
            player.setVelocityY(-50);  // Apply slight knockback on Y-axis (upwards)
        }

        // **Check if enemy health reaches 0, then remove the enemy**
        if (enemy.health <= 0) {
            enemy.destroy(); // Remove enemy from the scene when health reaches 0
        }

        enemy.setVelocityX(0);
        enemy.setVelocityY(0);

        setTimeout(() => {
            dispatch(setHasCollided(false));
        }, 500)
    }
};

// Handle attack logic when the player is actively attacking
export const handlePlayerAttack = (player, enemy, dispatch) => {
    if (player && enemy && player.isAttacking) {

        const currentScore = isNaN(player.score) ? 0 : player.score;
        // Apply damage to the enemy
        dispatch(enemyTakesDamage(20));  // Enemy takes 20 damage
        
        // Increase player score for a successful attack
        const newScore = currentScore + 10
        dispatch(updatePlayerScore(newScore)); 
    }
};