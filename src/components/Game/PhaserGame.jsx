import React, { useEffect } from "react";
import Phaser, { Scene } from "phaser";
import PreloadScene from "../../scenes/preload-scene";
import OpeningScene from "../../scenes/opening-scene";
import GameScene from "../../scenes/game-scene";
import FovScene from "../../scenes/fov-scene";
import { SCENE_KEYS } from "../../scenes/scene-keys";

//import Player from "./Player";
//import Map from "./Map";
//import Pathfinding from "./Pathfinding";
//import FOV from "./FOV";

const PhaserGame = ({ dispatch }) => {
  // useEffect to initialize Phaser game
  useEffect(() => {
    class GameSceneWithDispatch extends GameScene {
      init() {
        super.init({ dispatch });
      }
    }
    const config = {
      type: Phaser.CANVAS,
      pixelArt: false,
      backgroundColor: "#000000",
      scale: {
        width: 1024,
        height: 576,
        parent: "game-container",
        mode: Phaser.Scale.NONE, // Prevent Phaser from messing with the layout
        autoCenter: Phaser.Scale.CENTER_BOTH, // Ensure centered game
      },
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: true },
      },

      scene: [
        PreloadScene, OpeningScene, GameSceneWithDispatch, FovScene
      ],

    };

    const game = new Phaser.Game(config);

    /*  game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene)
    game.scene.add(SCENE_KEYS.GAME_SCENE, GameScene)
    game.scene.start(SCENE_KEYS.PRELOAD_SCENE) */

    return () => {
      game.destroy(true);
    };
  }, [dispatch]); // Empty dependency array to run only once after component mounts

  return <div id="game-container" style={{ width: "100%", height: "100%" }} />;
};

export default PhaserGame;

/*Role: Manages the Phaser game instance.
Purpose: Initialises and runs the Phaser game engine. It configures the game, handles updates, renders the game scene, and connects it with the game loop (via Phaser’s update method).
Example: This file initialises the Phaser game and sets up the main game scene (e.g., loading assets, configuring player controls, handling collisions).*/
