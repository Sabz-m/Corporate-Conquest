import Phaser from "phaser";
import Mrpas from "../utils/mrpas";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayerScore,updatePlayerHealth,} from "../Actions/PlayerActions";
import { SCENE_KEYS } from "./scene-keys";
import { setupLevelOneMap } from "../maps/level-1-Map";
import { setupPlayer } from "../players/setupPlayerOfficeDude";
import { setupEnemyBot } from "../players/setupEnemyBot";

import {handleSuccessfulPlayerAttack, handleEnemyAttack, checkForGameOver, showGameOver} from "../components/Combat/handleCombat";
import {worldToTile,findPath,generateGrid,showPath,moveEnemy,visualiseGrid,} from "../components/Game/Pathfinding";
import { handleMovementAnimations } from "../animations/handleMovementAnims";
import { setupCursorControls } from "../utils/controls";
import { updateAttackBoxPosition } from "../utils/updateAttackBoxPosition";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });

    this.dispatch = null;
    this.isPlayerAttacking = false;
    this.hasCollided = false;
    this.gridSize = 48;
    this.grid = [];
    this.pathGraphics = null;
    this.enemySpawnTile = null;
    this.isTrackingPlayer = false;
    this.detectionRange = 5;
    this.maxChaseRange = 8;
  }

  init({ dispatch, playerHealth, enemyHealth }) {
    this.dispatch = dispatch;
    this.playerHealth = playerHealth;
    this.enemyHealth = enemyHealth;
    // console.log("Dispatch:", dispatch);
  }

  create() {
    // Set up Phaser game scene, including player, map, etc.
    console.log("Player Health:", this.playerHealth);
    console.log("Enemy Health:", this.enemyHealth);
    //setup map
    const {
      map,
      horizontalWallsLayer,
      verticalWallsLayer,
      groundLayer,
      objectsLayerBottom,
      objectsLayerTop,
      collisionLayer,
    } = setupLevelOneMap(this); // setup map (can bring in other layers if needed)

    //setup cursors
    this.cursors = this.input.keyboard.createCursorKeys(); // set up cursor keys
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.SPACE);

    // setup cubicles with door open (background)
    this.add.sprite(960, 432, "cubicles", "cubicles_f6").setOrigin(1, 1);

    // set up player
    this.officedude = setupPlayer(this); // setup player NOTE: has to follow after animations are created
    
    // setup cubicles overlay after player (foreground)
    this.add.sprite(960, 432, "cubicles-overlay").setOrigin(1, 1);

    // setup enemyBots group and add test
    this.enemyBots = this.physics.add.group(); // create enemy-bot group
    this.enemyTest = setupEnemyBot(
      this,
      this.scale.width / 1.5,
      this.scale.height / 1.5 // arbitrary numbers to keep it close to player
    );
    this.enemyBots.add(this.enemyTest);

    
    
    // colliders

    this.physics.add.overlap(
      this.officedude.attackbox,
      this.enemyBots,
      this.handleAttackCollision,
      null,
      this
    );

    // colliders
    this.physics.add.collider(this.officedude.feetbox, collisionLayer);

    // setup grid for pathfinding
    this.grid = generateGrid(map, collisionLayer, this.gridSize);

    // this.visualizedGrid = visualiseGrid(this, this.grid, this.gridSize);

    this.pathGraphics = this.add.graphics({
      lineStyle: { color: 0x0000ff, width: 2 },
    });

    //Handle player attack input (spacebar)
    this.input.keyboard.on("keydown-SPACE", () => {
      if (!this.isPlayerAttacking) {
        // Prevent attack spam
        this.isPlayerAttacking = true;
        this.triggerAttack();
      }
    });
    
    /* this.tweens.add({
        targets: this.enemyTest,
        tint: {from: 0xececec, to: 0x00ff00},
        duration: 5000,
        yoyo: true,
        repeat: -1
    }) */

    // setup cameras
    this.cameras.main.startFollow(this.officedude, true);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // arbitrary numbers NEEDS CORRECTING
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.enemySpawnTile = worldToTile(
      this.enemyTest.x,
      this.enemyTest.y,
      this.gridSize
    );

    // Launch the FoV scene and pass necessary data (from map and characters)
    /*    this.scene.launch(SCENE_KEYS.FOV_SCENE, {

            player: this.officedude,
            enemyBots: this.enemyBots,
            map,
            groundLayer,
            horizontalWallsLayer,
            verticalWallsLayer,
            objectsLayerBottom,
            objectsLayerTop,
            collisionLayer,
        }) */
  }

  update() {
    const playerTile = worldToTile(
      this.officedude.x,
      this.officedude.y,
      this.gridSize
    );

    const enemyTile = worldToTile(
      this.enemyTest.x,
      this.enemyTest.y,
      this.gridSize
    );

    const distanceToPlayer = Phaser.Math.Distance.Between(
      playerTile.x,
      playerTile.y,
      enemyTile.x,
      enemyTile.y
    );

    const distanceToSpawn = Phaser.Math.Distance.Between(
      enemyTile.x,
      enemyTile.y,
      this.enemySpawnTile.x,
      this.enemySpawnTile.y
    );
    
   
    
    
    if (!this.isTrackingPlayer) {
      if (distanceToPlayer <= this.detectionRange) {
        this.isTrackingPlayer = true;
      }
    } else {
        if (distanceToPlayer > this.maxChaseRange) {
            const pathToSpawn = findPath(enemyTile, this.enemySpawnTile, this.grid);
        // showPath(this.pathGraphics, pathToSpawn, this.gridSize);

        if (pathToSpawn && pathToSpawn.length > 2) {
          const nextStep = pathToSpawn[1];
          moveEnemy(this.enemyTest, nextStep, this.gridSize);
        } else {
          this.enemyTest.setVelocity(0, 0);
          this.enemyTest.anims.play("enemybot-down-idle", true);
        }

        if (distanceToSpawn <= 1) {
          // Stop tracking once back at spawn
          this.isTrackingPlayer = false;
        }
      } else {
        const pathToPlayer = findPath(enemyTile, playerTile, this.grid);
        // showPath(this.pathGraphics, pathToPlayer, this.gridSize);

        if (pathToPlayer && pathToPlayer.length > 2) {
          // Move to a tile next to the player
          const nextStep = pathToPlayer[1]; // Second-to-last tile
          moveEnemy(this.enemyTest, nextStep, this.gridSize);
        } else {
          // Stop if no valid path is found
              this.enemyTest.setVelocity(0, 0);
              this.enemyTest.anims.play("enemybot-down-idle", true);

        }
      }
    }

    // Initialize velocity variables and set up Cursors/Keys/Controls
    let { velocityX, velocityY, shift } = setupCursorControls(this);

    // feet area set to match velocity values that are controlled by cursors
    this.officedude.moveWithVelocity(velocityX, velocityY);

    // Display animation corresponding to velocity (direction), only when not attacking to allow attack animation
    if (!this.isPlayerAttacking) {
      handleMovementAnimations(this, velocityX, velocityY, shift);
    }

    // Update attack box position based on player's direction
    updateAttackBoxPosition(this);
    
    //check if enemy is close enough to player to attack
    const distanceToEnemy = Phaser.Math.Distance.Between(
      this.officedude.x,
      this.officedude.y,
      this.enemyTest.x,
      this.enemyTest.y
    );

    if (distanceToEnemy < this.enemyTest.attackRange) {
        handleEnemyAttack(this.officedude, this.enemyTest, this.dispatch); // New enemy attack logic
      }

      if(this.enemyHealth <= 0) {
        //this.physics.world.remove(this.enemyTest);
        if (this.enemyTest) {
            console.log(this.enemyHealth, 'in update')
            this.physics.world.remove(this.enemyTest);
            this.enemyTest.body.enable = false;
            this.enemyTest.setVisible(false);
            this.enemyTest.destroy();
            this.enemyTest = null
            console.log('Enemy sprite destroyed');
          }
      }

   
    
  }

  // Add the handler function
  handleAttackCollision(attackbox, enemy) {
    // Ensure the attack only registers once per animation
  if (this.isPlayerAttacking && !enemy.hasBeenHit) {
    // Mark the enemy as hit for this attack
    enemy.hasBeenHit = true;

    // Handle the attack logic
    handleSuccessfulPlayerAttack(this.officedude, enemy, this.dispatch);

    this.enemyHealth -=20;

    console.log(this.enemyHealth, 'in handlePlayerAttack')
    if (this.enemyHealth <= 0) {
        console.log('Enemy defeated');
        this.enemyTest.destroy();
         // Optionally nullify reference to avoid accidental access later
      }
    // Reset the flag after the attack animation ends
    this.time.delayedCall(450, () => {
      enemy.hasBeenHit = false;
    });
  }
  }

  triggerAttack() {
    // Enable attack hitbox
    this.officedude.attackbox.body.enable = true;

    // Play attack animation
    switch (this.officedude.direction) {
        case "up":
            this.officedude.anims.play("punch-up", true);
            break
        case "left":
            this.officedude.anims.play("punch-left", true);
            break
        case "right":
            this.officedude.anims.play("punch-left", true);
            this.officedude.setFlipX(true) // Face right
            break
        default:
            this.officedude.anims.play("punch-down", true); 
    }
            
    

    // Set attack box position based on player's direction
    updateAttackBoxPosition(this);

    // After animation completes (adjust timing to match your animation duration)
    this.time.delayedCall(450, () => {
      this.isPlayerAttacking = false;
      this.officedude.attackbox.body.enable = false;
    });
  }

  
}
