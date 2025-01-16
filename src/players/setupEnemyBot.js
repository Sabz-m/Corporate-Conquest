// enemyBotSetup.js
export const setupEnemyBot = (scene, x, y) => {
    // Create a single enemy bot at the specified location
    const enemyBot = scene.physics.add.sprite(x, y, "basic-enemy-bot");
  
    // Play default animation
    enemyBot.play("enemybot-down-idle");
  
    return enemyBot;
  };