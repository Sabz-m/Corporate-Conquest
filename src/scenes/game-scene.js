import Phaser from "phaser";

import Mrpas from "../utils/mrpas";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePlayerScore,
  updatePlayerHealth,
} from "../Actions/PlayerActions";
import { SCENE_KEYS } from "./scene-keys";
import { setupLevelOneMap } from "../maps/level-1-Map";
import { setupPlayer } from "../players/setupPlayerOfficeDude";
import { setupEnemyBot } from "../players/setupEnemyBot";

import {
  handleSuccessfulPlayerAttack,
  handleSuccessfulEnemyAttack,
} from "../components/Combat/handleCombat";
import {
  worldToTile,
  findPath,
  generateGrid,
  showPath,
  moveEnemy,
  visualiseGrid,
  handleEnemyMovement,
  separateEnemies,
} from "../components/Game/Pathfinding";
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
    this.add.sprite(960, 432, "cubicles-overlay").setOrigin(1, 1).setDepth(200)

    this.enemyBots = this.physics.add.group();

    // setup group for active lasers (for collisons)
    this.laserGroup = this.physics.add.group();

    const enemySpawnPoints = [
      { x: 680, y: 400 },
      { x: 960, y: 750 },
      { x: 400, y: 850 },
    ];

    enemySpawnPoints.forEach((spawnPoint) => {
      const enemy = setupEnemyBot(this, spawnPoint.x, spawnPoint.y);
      enemy.spawnTile = worldToTile(spawnPoint.x, spawnPoint.y, this.gridSize);
      enemy.isTrackingPlayer = false;
      this.enemyBots.add(enemy);
    });

    // colliders and overlaps
    this.physics.add.collider(this.officedude.feetbox, collisionLayer);
    this.physics.add.overlap(
      this.officedude.attackbox,
      this.enemyBots,
      this.handleAttackCollision,
      null,
      this
    );
    this.physics.add.overlap(
      this.officedude,
      this.laserGroup,
      this.handleEnemyAttack,
      null,
      this
    );
    this.physics.add.collider(this.laserGroup, collisionLayer, (laser) => {
      laser.setVisible(false);
      laser.setPosition(-1000, -1000);
    });

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

    // setup cameras
    this.cameras.main.startFollow(this.officedude, true);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // arbitrary numbers NEEDS CORRECTING
    this.cameras.main.fadeIn(1000, 0, 0, 0);

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

    this.enemyBots.getChildren().forEach((enemy) => {
      enemy.isTrackingPlayer = handleEnemyMovement({
        enemy,
        playerTile,
        spawnTile: enemy.spawnTile, // Use the enemy's individual spawn tile
        grid: this.grid,
        detectionRange: this.detectionRange,
        maxChaseRange: this.maxChaseRange,
        isTrackingPlayer: enemy.isTrackingPlayer, // Use the enemy's individual tracking state
        moveEnemy,
        gridSize: this.gridSize,
      });
      if (this.officedude.y > enemy.y) {
        this.officedude.setDepth(101);
      } else {
        this.officedude.setDepth(99);
      }
    });

    separateEnemies(this.enemyBots, 48);

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

    if (this.enemyHealth <= 0) {
      //this.physics.world.remove(this.enemyTest);
      if (this.enemyTest) {
        console.log(this.enemyHealth, "in update");
        this.physics.world.remove(this.enemyTest);
        this.enemyTest.body.enable = false;
        this.enemyTest.setVisible(false);
        this.enemyTest.destroy();
        this.enemyTest = null;
        console.log("Enemy sprite destroyed");
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

      this.enemyHealth -= 20;

      console.log(this.enemyHealth, "in handlePlayerAttack");
      if (this.enemyHealth <= 0) {
        console.log("Enemy defeated");
        this.enemyTest.destroy();
        // Optionally nullify reference to avoid accidental access later
      }
      // Reset the flag after the attack animation ends
      this.time.delayedCall(450, () => {
        enemy.hasBeenHit = false;
      });
    }
  }

  handleEnemyAttack(player, laser) {
    if (!this.officedude.hasBeenHit) {
      this.officedude.hasBeenHit = true;
      handleSuccessfulEnemyAttack();
      laser.setVisible(false);
      laser.setPosition(-1000, -1000); // Move laser off-screen
      laser.setVelocity(0, 0);
      this.time.delayedCall(1000, () => {
        this.officedude.hasBeenHit = false;
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
        break;
      case "left":
        this.officedude.anims.play("punch-left", true);
        break;
      case "right":
        this.officedude.anims.play("punch-left", true);
        this.officedude.setFlipX(true);
        break;
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
