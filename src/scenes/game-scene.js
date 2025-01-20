import Phaser from "phaser";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePlayerScore,
  updatePlayerHealth,
} from "../Actions/PlayerActions";
import { SCENE_KEYS } from "./scene-keys";
import { createOfficeDudeAnimations } from "../animations/officeDudeAnims";
import { createEnemyBotAnims } from "../animations/basicEnemyBotAnims";
import { setupLevelOneMap } from "../maps/level-1-Map";
import { setupPlayer } from "../players/setupPlayerOfficeDude";
import { setupEnemyBot } from "../players/setupEnemyBot";
import {
  worldToTile,
  findPath,
  generateGrid,
  showPath,
  moveEnemy,
} from "../components/Game/Pathfinding";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
    this.gridSize = 40;
    this.grid = [];
    this.pathGraphics = null;
  }

  /* //adding player score
      const dispatch = useDispatch(); //hook used to dispatch actions to the redux store so it updates globally.
      const { health, score } = useSelector((state) => state.player); //get health from the redux store */

  create() {
    // Set up Phaser game scene, including player, map, etc.

    const { wallsLayer, map } = setupLevelOneMap(this); // setup map (can bring in other layers if needed)

    this.cursors = this.input.keyboard.createCursorKeys(); // set up cursor keys

    createOfficeDudeAnimations(this); // create player animations
    createEnemyBotAnims(this); // create enemy-bot animations

    this.enemyBots = this.physics.add.group(); // create enemy-bot group
    this.enemyTest = setupEnemyBot(
      this,
      this.scale.width / 1.5,
      this.scale.height / 1.5 // arbitrary numbers to keep it close to player
    );
    this.enemyBots.add(this.enemyTest);

    this.officedude = setupPlayer(this); // setup player NOTE: has to follow after animations are created

    this.add.image(180, 20, "health-bar"); // temporary placement but should probably be in react component

    // colliders
    this.physics.add.collider(this.officedude, wallsLayer);

    // cameras
    this.cameras.main.startFollow(this.officedude, true);
    this.pathGraphics = this.add.graphics({
      lineStyle: { color: 0x0000ff, width: 2 },
    });

    this.grid = generateGrid(map, wallsLayer, this.gridSize);

    this.pathGraphics = this.add.graphics({
      lineStyle: { color: 0x0000ff, width: 2 },
    });

    // setting up collisions for the scoring system may be best to have this in our combat logic file.
    // const enemy = this.physics.add.sprite(700, 400, 'enemy-sprite-placeholder')
    // enemy.setTint(0xff000);
    // const collectible = this.physics.add.sprite(500,500, 'collectable-sprite-placeholder')
  }

  // Update function
  update() {
    // Update the game loop (movement, AI, etc.)

    const { cursors, officedude } = this;

    // if (cursors.left.isDown) {
    //   officedude.setVelocityX(-160);
    //   officedude.anims.play("left-walk", true);
    //   officedude.setFlipX(false);
    // } else if (cursors.right.isDown) {
    //   officedude.setVelocityX(160);
    //   officedude.anims.play("left-walk", true);
    //   officedude.setFlipX(true);
    // } else if (cursors.up.isDown) {
    //   officedude.setVelocityY(-160);
    //   officedude.anims.play("up-walk", true);
    // } else if (cursors.down.isDown) {
    //   officedude.setVelocityY(160);
    //   officedude.anims.play("down-walk", true);
    // } else {
    //   officedude.setVelocityX(0);
    //   officedude.setVelocityY(0);
    //   officedude.anims.play("down-idle", true);
    // }
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
    console.log(playerTile, enemyTile);

    const path = findPath(enemyTile, playerTile, this.grid);

    if (path.length > 0) {
      showPath(this.pathGraphics, path, this.gridSize);
      const nextStep = path[1];
      if (nextStep) {
        moveEnemy(this.enemyTest, nextStep, this.gridSize);
      }
    }

    if (cursors.left.isDown && cursors.up.isDown) {
      officedude.setVelocityX(-115);
      officedude.setVelocityY(-115);
      officedude.anims.play("left-walk", true);
      officedude.setFlipX(false);
    } else if (cursors.right.isDown && cursors.up.isDown) {
      officedude.setVelocityX(115);
      officedude.setVelocityY(-115);
      officedude.anims.play("left-walk", true);
      officedude.setFlipX(true);
    } else if (cursors.left.isDown && cursors.down.isDown) {
      officedude.setVelocityX(-115);
      officedude.setVelocityY(115);
      officedude.anims.play("left-walk", true);
      officedude.setFlipX(false);
    } else if (cursors.right.isDown && cursors.down.isDown) {
      officedude.setVelocityX(115);
      officedude.setVelocityY(115);
      officedude.anims.play("left-walk", true);
      officedude.setFlipX(true);
    } else if (cursors.up.isDown) {
      officedude.setVelocityX(0);
      officedude.setVelocityY(-160);
      officedude.anims.play("up-walk", true);
    } else if (cursors.down.isDown) {
      officedude.setVelocityY(160);
      officedude.setVelocityX(0);
      officedude.anims.play("down-walk", true);
    } else if (cursors.left.isDown) {
      officedude.setVelocityY(0);
      officedude.setVelocityX(-160);
      officedude.anims.play("left-walk", true);
      officedude.setFlipX(false);
    } else if (cursors.right.isDown) {
      officedude.setVelocityY(0);
      officedude.setVelocityX(160);
      officedude.anims.play("left-walk", true);
      officedude.setFlipX(true);
    } else {
      officedude.setVelocityX(0);
      officedude.setVelocityY(0);
      officedude.anims.play("down-idle", true);
    }
  }
}
