export const setupPlayer = (scene) => {
  const player = scene.physics.add.sprite(920, 130, "office-dude")
  player.play("down-idle")
  player.body.setSize(30, 60)

  // Create attack box
  player.attackbox = scene.add.rectangle(player.x + 30, player.y, 20, 20)
  scene.physics.add.existing(player.attackbox)
  player.attackbox.body.setImmovable(true)

  // Create feet collision box
  player.feetbox = scene.add.rectangle(player.x, player.y + 33, 38, 15)
  scene.physics.add.existing(player.feetbox)
  
/*   // Setup physics properties
  player.feetbox.body.setBounce(0)
  player.feetbox.body.setFriction(1)
  
  // Make main player body a sensor (no physics collisions)
  player.setPushable(false) */

  // setup default direction for player
  player.direction = "down"; // Default direction
  
  player.moveWithVelocity = function (velocityX, velocityY) {
    this.feetbox.body.setVelocity(velocityX, velocityY);
    this.setPosition(this.feetbox.x, this.feetbox.y - 33);
  
    // Track the player's direction
    if (velocityX > 0 && velocityY < 0) {
      this.direction = "up-right";
    } else if (velocityX > 0 && velocityY > 0) {
      this.direction = "down-right";
    } else if (velocityX < 0 && velocityY < 0) {
      this.direction = "up-left";
    } else if (velocityX < 0 && velocityY > 0) {
      this.direction = "down-left";
    } else if (velocityX > 0) {
      this.direction = "right";
    } else if (velocityX < 0) {
      this.direction = "left";
    } else if (velocityY > 0) {
      this.direction = "down";
    } else if (velocityY < 0) {
      this.direction = "up";
    }
  };

  player.setDepth(100)
  

  return player
}