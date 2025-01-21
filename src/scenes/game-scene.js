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
  handlePlayerAttack,
  handlePlayerCollisionWithEnemy,
} from "../components/Combat/handleCombat";
import {
  worldToTile,
  findPath,
  generateGrid,
  showPath,
  moveEnemy,
  visualiseGrid,
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

  init({ dispatch }) {
    this.dispatch = dispatch;
    // console.log("Dispatch:", dispatch);
  }

  create() {
    // Set up Phaser game scene, including player, map, etc.

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
  }

  // Add the handler function
  handleAttackCollision(attackbox, enemy) {
    if (this.isPlayerAttacking) {
      console.log("is attacking");
      handlePlayerAttack(this.officedude, enemy, this.dispatch);
    }
  }

  triggerAttack() {
    // Enable attack hitbox
    this.officedude.attackbox.body.enable = true;

    // Play attack animation
    this.officedude.anims.play("punch-down", true);

    // Set attack box position based on player's direction
    updateAttackBoxPosition(this);

    // After animation completes (adjust timing to match your animation duration)
    this.time.delayedCall(450, () => {
      this.isPlayerAttacking = false;
      this.officedude.attackbox.body.enable = false;
    });

    if (this.isPlayerAttacking) {
      this.enemyBots.getChildren().forEach((enemy) => {
        handlePlayerAttack(this.officedude, enemy, this.dispatch);
      });
    }
  }

  /* handlePlayerCollisionWithEnemy(player, enemy) {
    handlePlayerCollisionWithEnemy(
      player,
      enemy,
      this.dispatch,
      this.isPlayerAttacking,
      this.hasCollided
    );
  } */
}
