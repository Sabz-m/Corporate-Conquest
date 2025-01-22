import { useSelector } from "react-redux";
import { enemyTakesDamage, playerTakesDamage } from "../../Actions/CombatActions";
import { updatePlayerScore } from "../../Actions/PlayerActions";

export const handleSuccessfulEnemyAttack = (dispatch) => {
  dispatch(playerTakesDamage(5)); 

  // Prevent the player from taking damage multiple times in quick succession
  
}




export const handleSuccessfulPlayerAttack = (player, enemy, dispatch) => {


        const currentScore = isNaN(player.score) ? 0 : player.score;
        // Apply damage to the enemy
         // Enemy takes 20 damage
         
        // Increase player score for a successful attack
        const newScore = currentScore + 10
        dispatch(updatePlayerScore(newScore)); 
          
        

    
};


/* export const handleEnemyAttack = (player, enemy, dispatch) => {
    // Check if enemy is in range of the player to attack
    const distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
    if (distance < enemy.attackRange && !player.isInjured) {
      // Apply damage to the player and update the player health
      // 500ms cooldown between consecutive attacks
    }
  }; */




export const checkForGameOver = (playerHealth, enemyHealth, scene) => {
    // Check if the player is dead
    if (playerHealth <= 0) {
      scene.showGameOver("Player");
    }
    
    // Check if the enemy is dead
    if (enemyHealth <= 0) {
      scene.enemyTest.destroy(); // Destroy enemy bot from the scene when health reaches 0
      console.log("Enemy defeated");
    }
  };
  
  export const showGameOver = () => {
    // Display Game Over message or UI
    const gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `Game Over`, {
      fontSize: '32px',
      color: '#ff0000',
    }).setOrigin(0.5);
  
    // Wait a few seconds before restarting the game
    this.time.delayedCall(2000, () => {
      this.scene.restart(); // Restart the scene after a short delay
    });
  };