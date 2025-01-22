import Phaser from "phaser"
import { SCENE_KEYS } from "./scene-keys"
import { setupLevelOneMap } from "../maps/level-1-Map"
import { setupPlayer } from "../players/setupPlayerOfficeDude"
import { setupEnemyBot } from "../players/setupEnemyBot"

export default class OpeningScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.OPENING_SCENE })
    }

    create() {
        const background = this.add
            .sprite(320, 400, "carpark-background")
            .setDepth(-1000)
            .setScale(1)
        //setup map
        const {
            map,
            horizontalWallsLayer,
            verticalWallsLayer,
            groundLayer,
            objectsLayerBottom,
            objectsLayerTop,
            collisionLayer,
        } = setupLevelOneMap(this) // setup map (can bring in other layers if needed)

        this.topBar = this.add
            .rectangle(0, 0, this.scale.width, 100, 0x000000)
            .setOrigin(0)
            .setVisible(true)
            .setDepth(500)
            .setScrollFactor(0)
        this.bottomBar = this.add
            .rectangle(
                0,
                this.scale.height - 100,
                this.scale.width,
                100,
                0x000000
            )
            .setOrigin(0)
            .setVisible(true)
            .setDepth(500)
            .setScrollFactor(0)

        // set up cubicles with animation
        const cubicles = this.add.sprite(960, 432, "cubicles").setOrigin(1, 1)
        this.time.delayedCall(1000, () => {
            cubicles.anims.play("cubicles-door")
        })
        this.time.delayedCall(500, () => {
            this.scene.start(SCENE_KEYS.GAME_SCENE)
        })

        // set up player
        this.officedude = setupPlayer(this)
        this.officedude.play("left-walk")

        // set up cubicles overlay(to overlay player)
        this.add
            .sprite(960, 432, "cubicles-overlay")
            .setOrigin(1, 1)
            .setDepth(300)

        // setup enemyBots group and add test
        this.enemyBots = this.physics.add.group() // create enemy-bot group
        const enemyTest = setupEnemyBot(
            this,
            this.scale.width / 1.5,
            this.scale.height / 1.5 // arbitrary numbers to keep it close to player
        )
        this.enemyBots.add(enemyTest)

        // colliders
        this.physics.add.collider(this.officedude, collisionLayer)

        // Setup cameras
        this.cameras.main
            .setScroll(
                this.officedude.x - this.scale.width / 2 - 200,
                this.officedude.y - this.scale.height / 2 + 500
            ) // Center camera on the player
            .fadeIn(1000, 0, 0, 0) // Fade in over 1 second
        this.cameras.main.pan(this.officedude.x - 200, this.officedude.y, 4000)

        this.time.delayedCall(5000, () => {
            this.tweens.add({
                targets: this.topBar, // The target of the tween
                y: -200, // Move the bar out of the screen (adjust as needed)
                duration: 5000, // Tween duration in milliseconds
                ease: "Sine.easeInOut", // Smooth easing function
                onComplete: () => {
                    this.topBar.setVisible(false) // Optional: Hide it after animation
                },
            })
            this.tweens.add({
                targets: this.bottomBar, // The target of the tween
                y:  700, // Move the bar out of the screen (adjust as needed)
                duration: 5000, // Tween duration in milliseconds
                ease: "Sine.easeInOut", // Smooth easing function
                onComplete: () => {
                    this.topBar.setVisible(false) // Optional: Hide it after animation
                },
            })
        })
    }

    update() {}
}
