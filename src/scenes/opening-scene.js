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

        //setup cursors
        this.cursors = this.input.keyboard.createCursorKeys() // set up cursor keys

        // set up cubicles with animation
        const cubicles = this.add.sprite(960, 432, "cubicles").setOrigin(1, 1)
        this.time.delayedCall(1000, () => {
            cubicles.anims.play("cubicles-door")
        })
        this.time.delayedCall(1000, () => {
            this.scene.start(SCENE_KEYS.GAME_SCENE)
        })

        // set up player
        this.officedude = setupPlayer(this)
        this.officedude.play("left-walk")

        // set up cubicles overlay(to overlay player)
        this.add.sprite(960, 432, "cubicles-overlay").setOrigin(1, 1).setDepth(300)

        // setup enemyBots group and add test
        this.enemyBots = this.physics.add.group() // create enemy-bot group
        const enemyTest = setupEnemyBot(
            this,
            this.scale.width / 1.5,
            this.scale.height / 1.5 // arbitrary numbers to keep it close to player
        )
        this.enemyBots.add(enemyTest)

        // colliders
        this.physics.add.collider(this.officedude, horizontalWallsLayer)
        this.physics.add.collider(this.officedude, verticalWallsLayer)
        this.physics.add.collider(this.officedude, collisionLayer)

        // setup cameras
        this.cameras.main.startFollow(this.officedude, true)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels) // arbitrary numbers NEEDS CORRECTING
        this.cameras.main.fadeIn(1000, 0, 0, 0)
    }

    update() {}
}
