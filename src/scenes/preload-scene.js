import Phaser from "phaser"
import { SCENE_KEYS } from "./scene-keys"
import { createOfficeDudeAnimations } from "../animations/officeDudeAnims"
import { createEnemyBotAnims } from "../animations/basicEnemyBotAnims"
import { createCubiclesAnims } from "../animations/cubiclesAnims"

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.PRELOAD_SCENE,
        })
    }

    preload() {
        // Preload assets like sprites, tilesets

        // load tilesheet roombuilder: walls, ground, ground shadows, collision tile
        this.load.image(
            "tiles-img",
            "src/assets/tiles/Modern_Office_Revamped_v1.2/1_Room_Builder_Office/Room_Builder_Office_48x48.png"
        )
        // load tilesheet bathroom tiles: cubicle tiles (obsolete), sinks, sink mirrors
        this.load.image(
            "bathroom-tiles-img",
            "src/assets/tiles/bathroom_cubicles_sinks.png"
        )
        // load tilesheet office objects: asset pack of chairs, desks, tables, water coolers, papers, office equipment etc.
        this.load.image(
            "office-objects-img",
            "src/assets/tiles/Modern_Office_Revamped_v1.2/2_Modern_Office_Black_Shadow/Modern_Office_Black_Shadow_48x48.png"
        )
        // load map JSON file
        this.load.tilemapTiledJSON(
            "level-1-map",
            "src/assets/tiles/level_1.json"
        )

        // load 'office dude', player one character with animation frames and JSON
        this.load.atlas(
            "office-dude",
            "src/assets/sprites/office-dude/office_dude_spritesheet.png",
            "src/assets/sprites/office-dude/office_dude_sprite.json"
        )
        // load 'basic enemy bot', player one character with animation frames and JSON
        this.load.atlas(
            "basic-enemy-bot",
            "src/assets/sprites/basic-enemy-bot/basic_enemy_bot_spritesheet.png",
            "src/assets/sprites/basic-enemy-bot/basic_enemy_bot_sprite.json"
        )
        // load cubicles (tiled animation didn't work) with animation frames and JSON
        this.load.atlas(
            "cubicles",
            "src/assets/sprites/cubicles/cubicles.png",
            "src/assets/sprites/cubicles/cubicles.json"
        )
        // load cubicles overlay to allow player go 'inside' cubicle
        this.load.image(
            "cubicles-overlay",
            "src/assets/sprites/cubicles/cubicles_overlay.png"
        )
    }

    create() {
        //setup animations
        createCubiclesAnims(this)
        createOfficeDudeAnimations(this) // create player animations
        createEnemyBotAnims(this) // create enemy-bot animations

        this.scene.start(SCENE_KEYS.OPENING_SCENE)
    }
}
