import React, { useEffect } from "react";
import Phaser from "phaser";
// import Player from "./Player";
// import Map from "./Map";
// import Pathfinding from "./Pathfinding";
// import FOV from './FOV';

const PhaserGame = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1400,
      height: 1200,
      parent: "game-container",
      scene: {
        preload,
        create,
        update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      // Preload assets like sprites, tilesets
      
      // Load tilesheets (png name: 'tileset-img', json name: 'office-level-1')
        this.load.image('tiles-img', 'assets/tiles/Modern_Office_Revamped_v1.2/1_Room_Builder_Office/Room_Builder_Office_32x32.png');
        this.load.tilemapTiledJSON('office-level-1', 'assets/tiles/corporate-conquest.json')
    
      // Load spritesheet (name: 'office-dude', png and json loaded together)
      this.load.atlas(
        "office-dude",
        "../../assets/office_dude_spritesheet.png",
        "../../assets/office_dude_sprite.json"
      );
    }

    var officedude;

    function create() {
      // Set up Phaser game scene, including player, map, etc.

     
      const map = this.make.tilemap({key: 'office-level-1'})
      const tileset = map.addTilesetImage('tileset', 'tiles-img')

      map.createStaticLayer('ground', tileset)
      const wallsLayer = map.createStaticLayer('walls', tileset)


      // Workaround - Should be able to write: wallsLayer.setCollisionByProperty({collides: true}) - Can't get Tiled to create neccesary JSON structure/data for this so instead having to iterate and manually add collides property to correct tiles
      wallsLayer.layer.data.map((x) => {
        x.map((y)=>{
            y.index > 1 ? // On this layer, different wall tiles have indexes above 1, empty tiles have an index of 0
            y.properties = {collides: true}
            : y.properties = {collides: false}
        })
      })

      // Walls collision Debugging (highlights collision properties with yellow highlight)
      const debugGraphics = this.add.graphics().setAlpha(0.7)
      wallsLayer.renderDebug(debugGraphics, {
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
                faceColor: new Phaser.Display.Color(40,39,37,255)
              })
              
              
      // Add player and animations (sprite)        
      officedude = this.physics.add.sprite(600, 300, 'office-dude');
      officedude.body.setSize(39, 15); // Set size for feet area for accurate collision
      officedude.body.setOffset(0, 66); // Offset to feet area
      officedude.play('down-idle') // default animation



      cursors = this.input.keyboard.createCursorKeys(); // set up cursor keys

        this.anims.create({
            key: 'down-idle',
            frames: this.anims.generateFrameNames('office-dude', { prefix: '_down_idle_f', start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left-walk',
            frames: this.anims.generateFrameNames('office-dude', {prefix: '_side_walk_f', start: 1, end: 6}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'up-walk',
            frames: this.anims.generateFrameNames('office-dude', {prefix: '_up_walk_f', start: 1, end: 6}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'down-walk',
            frames: this.anims.generateFrameNames('office-dude', {prefix: '_down_walk_f', start: 1, end: 6}),
            frameRate: 10,
            repeat: -1
        })
    }

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

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
};

export default PhaserGame;


/*Role: Manages the Phaser game instance.
Purpose: Initialises and runs the Phaser game engine. It configures the game, handles updates, renders the game scene, and connects it with the game loop (via Phaser’s update method).
Example: This file initialises the Phaser game and sets up the main game scene (e.g., loading assets, configuring player controls, handling collisions).*/

