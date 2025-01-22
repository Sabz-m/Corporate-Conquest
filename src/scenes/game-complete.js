import phaser from "phaser";
import { SCENE_KEYS } from "./scene-keys";

export default class GameCompleteScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.GAME_COMPLETE_SCENE,
    });
  }

  create() {
    this.add
      .text(400, 300, "You Win!", {
        fontSize: "48px",
        color: "#fff",
      })
      .setOrigin(0.5);

    this.add
      .text(400, 400, "Press SPACE to Restart", {
        fontSize: "24px",
        color: "#fff",
      })
      .setOrigin(0.5);
    this.input.keyboard.resetKeys();

    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.SPACE);
    this.spaceKey.on("up", () => {
      this.scene.start("GameScene"); // Replace with your game scene key
    });
  }
}
