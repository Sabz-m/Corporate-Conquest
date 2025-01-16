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

        // Load spritesheet (name: 'office-dude', png and json loaded together)
        this.load.atlas(
            "office-dude",
            "src/assets/sprites/office-dude/office_dude_spritesheet.png",
            "src/assets/sprites/office-dude/office_dude_sprite.json"
        )
        // Load spritesheet (name: 'basic-enemy-bot', png and json loaded together)
        this.load.atlas(
            "basic-enemy-bot",
            "src/assets/sprites/basic-enemy-bot/basic_enemy_bot_spritesheet.png",
            "src/assets/sprites/basic-enemy-bot/basic_enemy_bot_sprite.json"
        )
    }

    create() {
        this.scene.start(SCENE_KEYS.GAME_SCENE)
    }
}
