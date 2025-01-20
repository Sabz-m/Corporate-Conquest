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
    console.log("Dispatch:", dispatch);
  }

  //const { health, score } = useSelector((state) => state.player);

  create() {
    // Set up Phaser game scene, including player, map, etc.

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

    this.physics.add.collider(
      this.officedude,
      this.enemyBots,
      this.handlePlayerCollisionWithEnemy,
      null,
      this
    );
    this.physics.add.collider(this.officedude, horizontalWallsLayer);
    this.physics.add.collider(this.officedude, verticalWallsLayer);
    this.physics.add.collider(this.officedude, collisionLayer);

    // setup cameras
    this.cameras.main.startFollow(this.officedude, true);

    this.grid = generateGrid(map, collisionLayer, this.gridSize);
    console.log(this.grid);
    this.visualizedGrid = visualiseGrid(this, this.grid, this.gridSize);

    this.pathGraphics = this.add.graphics({
      lineStyle: { color: 0x0000ff, width: 2 },
    });

    //Handle player attack input (spacebar)
    this.input.keyboard.on("keydown-SPACE", () => {
      this.isPlayerAttacking = true;
      //this.dispatch(togglePlayerAttack(true)); //update redux state;
    });

    this.input.keyboard.on("keyup-SPACE", () => {
      this.isPlayerAttacking = false;
      //this.dispatch(togglePlayerAttack(false)); //update redux state;
    });

    this.cameras.main.setBounds(0, 0, 1280, 2176); // arbitrary numbers NEEDS CORRECTING
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

    // setting up collisions for the scoring system may be best to have this in our combat logic file.
    // const enemy = this.physics.add.sprite(700, 400, 'enemy-sprite-placeholder')
    // enemy.setTint(0xff000);
    // const collectible = this.physics.add.sprite(500,500, 'collectable-sprite-placeholder')
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
        showPath(this.pathGraphics, pathToSpawn, this.gridSize);
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
        showPath(this.pathGraphics, pathToPlayer, this.gridSize);

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

    // Initialize velocity variables
    let velocityX = 0;
    let velocityY = 0;

    // Get input keys
    const cursors = this.input.keyboard.createCursorKeys();
    const shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    // Adjust velocity based on input keys
    if (cursors.left.isDown) {
      velocityX = shift.isDown ? -350 : -220; // Sprinting is faster
    } else if (cursors.right.isDown) {
      velocityX = shift.isDown ? 350 : 220;
    }

    if (cursors.up.isDown) {
      velocityY = shift.isDown ? -350 : -220;
    } else if (cursors.down.isDown) {
      velocityY = shift.isDown ? 350 : 220;
    }

    // Normalize diagonal speed
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= Math.SQRT1_2; // Reduce diagonal speed
      velocityY *= Math.SQRT1_2;
    }

    // Apply the calculated velocities
    this.officedude.setVelocityX(velocityX);
    this.officedude.setVelocityY(velocityY);

    // Play the correct animation based on movement direction
    if (velocityX > 0 && velocityY < 0) {
      // Moving up-right
      this.officedude.setFlipX(false); // Face right
      this.officedude.anims.play(
        shift.isDown ? "diagonal-up-right" : "diagonal-up-right",
        true
      );
    } else if (velocityX > 0 && velocityY > 0) {
      // Moving down-right
      this.officedude.setFlipX(false); // Face right
      this.officedude.anims.play(
        shift.isDown ? "diagonal-down-right" : "diagonal-down-right",
        true
      );
    } else if (velocityX < 0 && velocityY < 0) {
      // Moving up-left (Northwest)
      this.officedude.setFlipX(true); // Flip to face left
      this.officedude.anims.play(
        shift.isDown ? "diagonal-up-right" : "diagonal-up-right",
        true
      );
    } else if (velocityX < 0 && velocityY > 0) {
      // Moving down-left (Southwest)
      this.officedude.setFlipX(true); // Flip to face left
      this.officedude.anims.play(
        shift.isDown ? "diagonal-down-right" : "diagonal-down-right",
        true
      );
    } else if (velocityX > 0) {
      // Moving right
      this.officedude.setFlipX(true); // Face right
      this.officedude.anims.play(
        shift.isDown ? "left-sprint" : "left-walk",
        true
      );
    } else if (velocityX < 0) {
      // Moving left
      this.officedude.setFlipX(false); // Face left
      this.officedude.anims.play(
        shift.isDown ? "left-sprint" : "left-walk",
        true
      );
    } else if (velocityY > 0) {
      // Moving down
      this.officedude.anims.play(
        shift.isDown ? "down-sprint" : "down-walk",
        true
      );
    } else if (velocityY < 0) {
      // Moving up
      this.officedude.anims.play(shift.isDown ? "up-sprint" : "up-walk", true);
    } else {
      // Idle
      this.officedude.anims.play("down-idle", true);
    }

    if (this.isPlayerAttacking) {
      this.enemyBots.getChildren().forEach((enemy) => {
        handlePlayerAttack(this.officedude, enemy, this.dispatch);
      });
    }
  }

  handlePlayerCollisionWithEnemy(player, enemy) {
    handlePlayerCollisionWithEnemy(
      player,
      enemy,
      this.dispatch,
      this.isPlayerAttacking,
      this.hasCollided
    );
  }
}
