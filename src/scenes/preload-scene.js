import Phaser from "phaser"
import { SCENE_KEYS } from "./scene-keys"

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.PRELOAD_SCENE,
        })
    }

    preload() {
        // Preload assets like sprites, tilesets

        // Load tilesheets
        this.load.image(
            "tiles-img",
            "src/assets/tiles/Modern_Office_Revamped_v1.2/1_Room_Builder_Office/Room_Builder_Office_48x48.png"
        )
        this.load.image(
            "bathroom-tiles-img",
            "src/assets/tiles/bathroom_cubicles_sinks.png"
        )
        this.load.tilemapTiledJSON(
            "level-1-map",
            "src/assets/tiles/level_1.json"
        )

        // Load officedude
        this.load.atlas(
            "office-dude",
            "src/assets/sprites/office-dude/office_dude_spritesheet.png",
            "src/assets/sprites/office-dude/office_dude_sprite.json"
        )
        // Load enemy bot
        this.load.atlas(
            "basic-enemy-bot",
            "src/assets/sprites/basic-enemy-bot/basic_enemy_bot_spritesheet.png",
            "src/assets/sprites/basic-enemy-bot/basic_enemy_bot_sprite.json"
        )

        // load health bar (might need to be added in react component, not here)
        this.load.atlas("health-bar", "src/assets/health_bar/health_bar_spritesheet.png", "src/assets/health_bar/health_bar.json")
    }

    create() {
        this.scene.start(SCENE_KEYS.GAME_SCENE)
    }
}
