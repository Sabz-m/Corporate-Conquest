import React, { useEffect } from "react";
import Phaser from "phaser";
//import Player from "./Player";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayerScore, updatePlayerHealth } from "../../Actions/PlayerActions";
//import Map from "./Map";
//import Pathfinding from "./Pathfinding";
//import FOV from "./FOV";

const PhaserGame = () => {
  //adding player score
  const dispatch = useDispatch(); //hook used to dispatch actions to the redux store so it updates globally.
  const { health, score } = useSelector((state) => state.player); //get health from the redux store

  let officedude;
  let cursors;

  // Preload function
  function preload() {
    // Preload assets like sprites, tilesets

    // Load tilesheets (png name: 'tileset-img', json name: 'office-level-1')
    this.load.image(
      'tiles-img',
      'src/assets/tiles/Modern_Office_Revamped_v1.2/1_Room_Builder_Office/Room_Builder_Office_48x48.png'
    );
    this.load.image('bathroom-tiles-img', 'src/assets/tiles/bathroom_cubicles_sinks.png')
    this.load.tilemapTiledJSON('level-1-map', 'src/assets/tiles/level_1.json');

    // Load spritesheet (name: 'office-dude', png and json loaded together)
    this.load.atlas(
      "office-dude",
      "src/assets/sprites/office_dude_spritesheet.png",
      "src/assets/sprites/office_dude_sprite.json"
    );
  }

  // Create function
  function create() {
    // Set up Phaser game scene, including player, map, etc.

    const map = this.make.tilemap({ key: "level-1-map" });
    const roomBuilderTileset = map.addTilesetImage("48x48_roombuilder_tileset", "tiles-img");
    const bathroomTileset = map.addTilesetImage("bathroom_tileset", "bathroom-tiles-img");


    map.createLayer("ground", roomBuilderTileset);
    const wallsLayer = map.createLayer("walls", roomBuilderTileset);
    map.createLayer("objects", bathroomTileset)

    console.log(map.tilesets[1].tileData)

    // Workaround - Should be able to write: wallsLayer.setCollisionByProperty({collides: true}) 
    // - Can't get Tiled to create necessary JSON structure/data for this so instead having to iterate and manually add collides property to correct tiles
    wallsLayer.setCollisionByProperty({ collides: true });

    // Walls collision Debugging (highlights collision properties with yellow highlight)
    /* const debugGraphics = this.add.graphics().setAlpha(0.7)
    wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40,39,37,255)
    }) */

    cursors = this.input.keyboard.createCursorKeys(); // set up cursor keys

    this.anims.create({
      key: "down-idle",
      frames: this.anims.generateFrameNames("office-dude", {
        prefix: "_down_idle_f",
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "left-walk",
      frames: this.anims.generateFrameNames("office-dude", {
        prefix: "_side_walk_f",
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up-walk",
      frames: this.anims.generateFrameNames("office-dude", {
        prefix: "_up_walk_f",
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down-walk",
      frames: this.anims.generateFrameNames("office-dude", {
        prefix: "_down_walk_f",
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Add player and animations (sprite)
    officedude = this.physics.add.sprite(600, 300, "office-dude");
    officedude.body.setSize(39, 15); // Set size for feet area for accurate collision
    officedude.body.setOffset(0, 66); // Offset to feet area
    officedude.play("down-idle"); // default animation

    // colliders
    this.physics.add.collider(officedude, wallsLayer);

    // cameras
    this.cameras.main.startFollow(officedude, true);

    // setting up collisions for the scoring system may be best to have this in our combat logic file.
    // const enemy = this.physics.add.sprite(700, 400, 'enemy-sprite-placeholder')
    // enemy.setTint(0xff000);
    // const collectible = this.physics.add.sprite(500,500, 'collectable-sprite-placeholder')
  }

  // Update function
  function update() {
    // Update the game loop (movement, AI, etc.)

    if (cursors.left.isDown) {
      officedude.setVelocityX(-160);
      officedude.anims.play("left-walk", true);
      officedude.setFlipX(false);
    } else if (cursors.right.isDown) {
      officedude.setVelocityX(160);
      officedude.anims.play("left-walk", true);
      officedude.setFlipX(true);
    } else if (cursors.up.isDown) {
      officedude.setVelocityY(-160);
      officedude.anims.play("up-walk", true);
    } else if (cursors.down.isDown) {
      officedude.setVelocityY(160);
      officedude.anims.play("down-walk", true);
    } else {
      officedude.setVelocityX(0);
      officedude.setVelocityY(0);
      officedude.anims.play("down-idle", true);
    }
  }

  // useEffect to initialize Phaser game
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1400,
      height: 1200,
      parent: "game-container",
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: true },
      },
      scene: {
        preload,
        create,
        update,
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []); // Empty dependency array to run only once after component mounts

  return <div id="game-container" />;
};

export default PhaserGame;

/*Role: Manages the Phaser game instance.
Purpose: Initialises and runs the Phaser game engine. It configures the game, handles updates, renders the game scene, and connects it with the game loop (via Phaser’s update method).
Example: This file initialises the Phaser game and sets up the main game scene (e.g., loading assets, configuring player controls, handling collisions).*/
