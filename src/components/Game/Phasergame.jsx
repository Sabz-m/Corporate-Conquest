import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Player from './Player';
import Map from './Map';
import Pathfinding from './Pathfinding';
import FOV from './FOV';

const PhaserGame = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      scene: {
        preload,
        create,
        update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      // Preload assets like sprites, tilesets

      // Load tilesheets (png name: 'tileset-png', json name: 'office-level-1')
        this.load.image('tileset-png', 'assets/tiles/Modern_Office_Revamped_v1.2/1_Room_Builder_Office/Room_Builder_Office_32x32.png');
        this.load.tilemapTiledJSON('office-level-1', 'assets/tiles/corporate-conquest.json')
    
      // Load spritesheet (name: 'office-dude', png and json loaded together)
        this.load.atlas('office-dude', 'assets/office_dude_spritesheet.png', 'assets/office_dude_sprite.json')
    }

    function create() {
      // Set up Phaser game scene, including player, map, etc.
     
      const map = this.make.tilemap({key: 'office-level-1'})
      const tileset = map.addTilesetImage('office-asset-pack-tileset', 'tileset-png')

      const groundLayer = map.createStaticLayer('Ground', tileset)
      const wallsLayer = map.createStaticLayer('Walls', tileset)

      wallsLayer.setCollisionByProperty({collides: true})

          // Walls collision Debugging
          const debugGraphics = this.add.graphics().setAlpha(0.7)
            wallsLayer.renderDebug(debugGraphics, {
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
                faceColor: new Phaser.Display.Color(40,39,37,255)
            })
            
            console.log(wallsLayer.layer.data[10][5].properties);

          /*  wallsLayer.layer.data.map((x) => {
                x.map((y)=>{
                    console.log(y.collides)
                })
            }) */

      // Add player and animations (sprite)

      cursors = this.input.keyboard.createCursorKeys();

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

        officedude = this.physics.add.sprite(100, 450, 'office-dude');
        officedude.play('down-idle')
    }

    function update() {
      // Update the game loop (movement, AI, etc.)

      if (cursors.left.isDown)
        {
            officedude.setVelocityX(-160);

            officedude.anims.play('left-walk', true);

            officedude.setFlipX(false)
        }
        else if (cursors.right.isDown)
        {
            officedude.setVelocityX(160);

            officedude.anims.play('left-walk', true);

            officedude.setFlipX(true)
        }
        else if (cursors.up.isDown)
        {
            officedude.setVelocityY(-160);

            officedude.anims.play('up-walk', true);
        }
        else if (cursors.down.isDown)
        {
            officedude.setVelocityY(160);

            officedude.anims.play('down-walk', true);
        }
        else
        {
            officedude.setVelocityX(0);
            officedude.setVelocityY(0);

            officedude.anims.play('down-idle', true);
        }
      
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
};

export default PhaserGame;