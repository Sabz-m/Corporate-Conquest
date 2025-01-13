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
    }

    function create() {
      // Set up Phaser game scene, including player, map, etc.
     
    }

    function update() {
      // Update the game loop (movement, AI, etc.)
      
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
};

export default PhaserGame;