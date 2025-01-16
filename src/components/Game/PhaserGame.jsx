import React, { useEffect } from "react";
import Phaser from "phaser";
import PreloadScene from "../../scenes/preload-scene";
import GameScene from "../../scenes/game-scene";
import { SCENE_KEYS } from "../../scenes/scene-keys";
//import Player from "./Player";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayerScore, updatePlayerHealth } from "../../Actions/PlayerActions";
//import Map from "./Map";
//import Pathfinding from "./Pathfinding";
//import FOV from "./FOV";

const PhaserGame = () => {

  // useEffect to initialize Phaser game
  useEffect(() => {
    const config = {
      type: Phaser.CANVAS,
      pixelArt: false,
      backgroundColor: '#000000',
      scale: {
        width: 1024,
        height: 576,
        parent: "game-container",
        mode: Phaser.Scale.FIT,
      },
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: true },
      },
    };

    const game = new Phaser.Game(config);

    game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene)
    game.scene.add(SCENE_KEYS.GAME_SCENE, GameScene)
    game.scene.start(SCENE_KEYS.PRELOAD_SCENE)

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
