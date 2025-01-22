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
        this.time.delayedCall(3000, () => {
            cubicles.anims.play("cubicles-door")
        })
        
        // set up player
        this.officedude = setupPlayer(this)
        this.officedude.play("left-walk")
        
        // set up cubicles overlay(to overlay player)
        this.add
        .sprite(960, 432, "cubicles-overlay")
        .setOrigin(1, 1)
        .setDepth(200)
        
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
            this.officedude.y - this.scale.height / 2 + 600
            ) // Center camera on the player
            .fadeIn(1000, 0, 0, 0) // Fade in over 1 second
        this.cameras.main.pan(this.officedude.x - 200, this.officedude.y +100, 4000)
        
        animateAspectRatioBars(this)

        this.time.delayedCall(500, () => {
            this.scene.start(SCENE_KEYS.GAME_SCENE)
        })
    }
    
    update() {}
}


const animateAspectRatioBars = (scene) => {
    scene.time.delayedCall(5000, () => {
        scene.tweens.add({
            targets: scene.topBar,
            y:  {
                from: 0,
                start: 0,
                to: -100
            },
            duration: 3000, 
            ease: "Sine.easeInOut", 
            onComplete: () => {
                scene.topBar.setVisible(false) 
            },
        })
        scene.tweens.add({
            targets: scene.bottomBar,
            y:  {
                from: scene.scale.height - 100,
                start: scene.scale.height - 100,
                to: scene.scale.height
            },
            duration: 3000, 
            ease: "Sine.easeInOut", 
            onComplete: () => {
                scene.topBar.setVisible(false)
            },
        })
    })
}