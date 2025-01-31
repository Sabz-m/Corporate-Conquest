import Phaser from "phaser";
import { SCENE_KEYS } from "./scene-keys";
import { setupLevelOneMap } from "../maps/level-1-Map";
import { setupPlayer } from "../players/setupPlayerOfficeDude";
import { setupEnemyBot } from "../players/setupEnemyBot";

export default class OpeningScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.OPENING_SCENE });
  }

  create() {
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

    this.topBar = this.add
      .rectangle(0, 0, this.scale.width, 100, 0x000000)
      .setOrigin(0)
      .setVisible(true)
      .setDepth(500)
      .setScrollFactor(0);
    this.bottomBar = this.add
      .rectangle(0, this.scale.height - 100, this.scale.width, 100, 0x000000)
      .setOrigin(0)
      .setVisible(true)
      .setDepth(500)
      .setScrollFactor(0);

    // set up cubicles with animation
    const cubicles = this.add.sprite(960, 432, "cubicles").setOrigin(1, 1);
    this.time.delayedCall(3000, () => {
      cubicles.anims.play("cubicles-door");
    });

    // set up player
    this.officedude = setupPlayer(this);
    this.officedude.play("left-walk");

    // set up cubicles overlay(to overlay player)
    this.add.sprite(960, 432, "cubicles-overlay").setOrigin(1, 1).setDepth(200);

    // setup enemyBots group and add test
    this.enemyBots = this.physics.add.group(); // create enemy-bot group
    const enemyTest = setupEnemyBot(
      this,
      this.scale.width / 1.5,
      this.scale.height / 1.5 // arbitrary numbers to keep it close to player
    );
    this.enemyBots.add(enemyTest);

    // colliders
    this.physics.add.collider(this.officedude, collisionLayer);

    // Setup cameras
    this.cameras.main
      .setScroll(
        this.officedude.x - this.scale.width / 2 - 200,
        this.officedude.y - this.scale.height / 2 + 600
      ) // Center camera on the player
      .fadeIn(1000, 0, 0, 0); // Fade in over 1 second
    this.cameras.main.pan(
      this.officedude.x - 200,
      this.officedude.y + 100,
      4000
    );

    // Add the text object
    const textBoxBackground = this.add
      .image(50, this.scale.height - 200, "textbox-background")
      .setScrollFactor(0)
      .setDepth(500)
      .setOrigin(0)
      .setAlpha(0.8);
    this.textBoxText = this.add
      .text(90, this.scale.height - 170, "", {
        font: "40px Monogram",
        color: "#ffffff",
        wordWrap: { width: 850 }, // Wrap the text inside the box
      })
      .setScrollFactor(0)
      .setDepth(501);

    console.log(this.scale.width - 100);

    // Text to display
    this.text =
      "Welcome to the office dungeon! Prepare yourself for adventure...";

    animateAspectRatioBars(this);

    //Start the typewriter effect
    typeText(this);

    this.time.delayedCall(1000, () => {
      
      console.log('Transitioning to game-scene...');

    // Make sure we're stopping the opening scene first
    this.scene.stop(SCENE_KEYS.OPENING_SCENE); 

    // Start the game-scene
    this.scene.start(SCENE_KEYS.GAME_SCENE);  

    // Optional: Remove opening scene if not needed anymore
    this.scene.remove(SCENE_KEYS.OPENING_SCENE); 

    console.log('Game scene started');
      
    });
  }

  update() {}
}

const typeText = (scene) => {
  const textArray = scene.text.split("");
  let index = 0;

  // Timer to add characters one by one
  scene.time.addEvent({
    delay: 50, // Delay between each character (in ms)
    callback: () => {
      scene.textBoxText.text += textArray[index];
      index++;

      // Stop the timer once all characters are displayed
      if (index === textArray.length) {
        scene.time.removeAllEvents();
      }
    },
    callbackScope: this,
    loop: true,
  });
};

const animateAspectRatioBars = (scene) => {
  scene.time.delayedCall(10000, () => {
    scene.tweens.add({
      targets: scene.topBar,
      y: {
        from: 0,
        start: 0,
        to: -100,
      },
      duration: 3000,
      ease: "Sine.easeInOut",
      onComplete: () => {
        scene.topBar.setVisible(false);
      },
    });
    scene.tweens.add({
      targets: scene.bottomBar,
      y: {
        from: scene.scale.height - 100,
        start: scene.scale.height - 100,
        to: scene.scale.height,
      },
      duration: 3000,
      ease: "Sine.easeInOut",
      onComplete: () => {
        scene.topBar.setVisible(false);
      },
    });
  });
};
