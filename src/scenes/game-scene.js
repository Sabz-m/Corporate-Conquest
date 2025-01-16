import Phaser from "phaser"
import { useDispatch, useSelector } from "react-redux"
import { updatePlayerScore, updatePlayerHealth } from "../Actions/PlayerActions"
import { SCENE_KEYS } from "./scene-keys"
import { createOfficeDudeAnimations } from "../animations/officeDudeAnims"
import { createEnemyBotAnims } from "../animations/basicEnemyBotAnims"
import { setupLevelOneMap } from "../maps/level-1-Map"
import { setupPlayer } from "../players/setupPlayerOfficeDude"
import { setupEnemyBot } from "../players/setupEnemyBot"

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.GAME_SCENE,
        })
    }

    /* //adding player score
      const dispatch = useDispatch(); //hook used to dispatch actions to the redux store so it updates globally.
      const { health, score } = useSelector((state) => state.player); //get health from the redux store */

    create() {
        // Set up Phaser game scene, including player, map, etc.

        const { wallsLayer } = setupLevelOneMap(this) // setup map (can bring in other layers if needed)

        this.cursors = this.input.keyboard.createCursorKeys() // set up cursor keys

        createOfficeDudeAnimations(this) // create player animations
        createEnemyBotAnims(this) // create enemy-bot animations

        this.enemyBots = this.physics.add.group() // create enemy-bot group
        const enemyTest = setupEnemyBot(
            this,
            this.scale.width / 1.5, 
            this.scale.height / 1.5 // arbitrary numbers to keep it close to player
        )
        this.enemyBots.add(enemyTest)

        this.officedude = setupPlayer(this) // setup player NOTE: has to follow after animations are created

        // colliders
        this.physics.add.collider(this.officedude, wallsLayer)

        // cameras
        this.cameras.main.startFollow(this.officedude, true)

        // setting up collisions for the scoring system may be best to have this in our combat logic file.
        // const enemy = this.physics.add.sprite(700, 400, 'enemy-sprite-placeholder')
        // enemy.setTint(0xff000);
        // const collectible = this.physics.add.sprite(500,500, 'collectable-sprite-placeholder')
    }

    // Update function
    update() {
        // Update the game loop (movement, AI, etc.)

        const { cursors, officedude } = this

        if (cursors.left.isDown) {
            officedude.setVelocityX(-160)
            officedude.anims.play("left-walk", true)
            officedude.setFlipX(false)
        } else if (cursors.right.isDown) {
            officedude.setVelocityX(160)
            officedude.anims.play("left-walk", true)
            officedude.setFlipX(true)
        } else if (cursors.up.isDown) {
            officedude.setVelocityY(-160)
            officedude.anims.play("up-walk", true)
        } else if (cursors.down.isDown) {
            officedude.setVelocityY(160)
            officedude.anims.play("down-walk", true)
        } else {
            officedude.setVelocityX(0)
            officedude.setVelocityY(0)
            officedude.anims.play("down-idle", true)
        }
    }
}
