import Phaser from "phaser"

import Mrpas from "../utils/mrpas"
import { useDispatch, useSelector } from "react-redux"
import { updatePlayerScore, updatePlayerHealth } from "../Actions/PlayerActions"
import { SCENE_KEYS } from "./scene-keys"
import { setupLevelOneMap } from "../maps/level-1-Map"
import { setupPlayer } from "../players/setupPlayerOfficeDude"
import { setupEnemyBot } from "../players/setupEnemyBot"
import {
    handlePlayerAttack,
    handlePlayerCollisionWithEnemy,
} from "../components/Combat/handleCombat"
import {
    worldToTile,
    findPath,
    generateGrid,
    showPath,
    moveEnemy,
    visualiseGrid,
} from "../components/Game/Pathfinding"
import { handleMovementAnimations } from "../animations/handleMovementAnims"
import { setupCursorControls } from "../utils/controls"
import { updateAttackBoxPosition } from "../utils/updateAttackBoxPosition"

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.GAME_SCENE,
        })

        this.dispatch = null
        this.isPlayerAttacking = false
        this.hasCollided = false
        this.gridSize = 48
        this.grid = []
        this.pathGraphics = null
    }

    init({ dispatch }) {
        this.dispatch = dispatch
        // console.log("Dispatch:", dispatch);
    }

    //const { health, score } = useSelector((state) => state.player);

    create() {
        // Set up Phaser game scene, including player, map, etc.

        // Set up Phaser game scene, including player, map, etc.

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
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.SPACE)

        // setup cubicles with door open (background)
        this.add.sprite(960, 432, "cubicles", "cubicles_f6").setOrigin(1, 1)

        // set up player
        this.officedude = setupPlayer(this) // setup player NOTE: has to follow after animations are created

        // setup cubicles overlay after player (foreground)
        this.add.sprite(960, 432, "cubicles-overlay").setOrigin(1, 1)

        // setup enemyBots group and add test
        this.enemyBots = this.physics.add.group() // create enemy-bot group
        this.enemyTest = setupEnemyBot(
            this,
            this.scale.width / 1.5,
            this.scale.height / 1.5 // arbitrary numbers to keep it close to player
        )
        this.enemyBots.add(this.enemyTest)

        // colliders

        this.physics.add.overlap(
            this.officedude.attackbox,
            this.enemyBots,
            this.handleAttackCollision,
            null,
            this
        )

        this.physics.add.collider(this.officedude.feetbox, collisionLayer)

        // setup cameras
        this.cameras.main.startFollow(this.officedude, true)

        this.grid = generateGrid(map, collisionLayer, this.gridSize)
        // this.visualizedGrid = visualiseGrid(this, this.grid, this.gridSize);

        this.pathGraphics = this.add.graphics({
            lineStyle: { color: 0x0000ff, width: 2 },
        })

        //Handle player attack input (spacebar)
        this.input.keyboard.on("keydown-SPACE", () => {
            if (!this.isPlayerAttacking) {
                // Prevent attack spam
                this.isPlayerAttacking = true
                this.triggerAttack()
            }
        })

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels) // arbitrary numbers NEEDS CORRECTING
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        // Launch the FoV scene and pass necessary data (from map and characters)
        /* this.scene.launch(SCENE_KEYS.FOV_SCENE, {
            player: this.officedude,
            enemyBots: this.enemyBots,
            map,
            groundLayer,
            horizontalWallsLayer,
            verticalWallsLayer,
            objectsLayerBottom,
            objectsLayerTop,
            collisionLayer,
        }) */

        // setting up collisions for the scoring system may be best to have this in our combat logic file.
        // const enemy = this.physics.add.sprite(700, 400, 'enemy-sprite-placeholder')
        // enemy.setTint(0xff000);
        // const collectible = this.physics.add.sprite(500,500, 'collectable-sprite-placeholder')
    }

    update() {
        const playerTile = worldToTile(
            this.officedude.x,
            this.officedude.y,
            this.gridSize
        )

        const enemyTile = worldToTile(
            this.enemyTest.x,
            this.enemyTest.y,
            this.gridSize
        )

        const path = findPath(enemyTile, playerTile, this.grid)

        if (path && path.length > 0) {
            //   showPath(this.pathGraphics, path, this.gridSize);
            const nextStep = path[1]
            if (nextStep) {
                moveEnemy(this.enemyTest, nextStep, this.gridSize)
            }
        } else {
            // Stop the enemy if no valid path is found
            this.enemyTest.setVelocity(0, 0)
            this.enemyTest.anims.play("enemybot-down-idle", true) // Default idle animation
        }

        // Initialize velocity variables and set up Cursors/Keys/Controls
        let { velocityX, velocityY, shift } = setupCursorControls(this)

        // feet area set to match velocity values that are controlled by cursors
        this.officedude.moveWithVelocity(velocityX, velocityY)

        // Display animation corresponding to velocity (direction), only when not attacking to allow attack animation
        if (!this.isPlayerAttacking) {
            handleMovementAnimations(this, velocityX, velocityY, shift)
        }

        // Update attack box position based on player's direction
        updateAttackBoxPosition(this)
    }

    // Add the handler function
    handleAttackCollision(attackbox, enemy) {
        if (this.isPlayerAttacking) {
            console.log("is attacking")
            handlePlayerAttack(this.officedude, enemy, this.dispatch)
        }
    }

    triggerAttack() {
        // Enable attack hitbox
        this.officedude.attackbox.body.enable = true

        // Play attack animation
        this.officedude.anims.play("punch-down", true)

        // Set attack box position based on player's direction
        updateAttackBoxPosition(this)

        // After animation completes (adjust timing to match your animation duration)
        this.time.delayedCall(450, () => {
            this.isPlayerAttacking = false
            this.officedude.attackbox.body.enable = false
        })
    }

    /* handlePlayerCollisionWithEnemy(player, enemy) {
    handlePlayerCollisionWithEnemy(
      player,
      enemy,
      this.dispatch,
      this.isPlayerAttacking,
      this.hasCollided
    );
  } */
}
