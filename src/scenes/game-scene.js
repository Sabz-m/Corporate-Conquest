import Phaser from "phaser"
import { SCENE_KEYS } from "./scene-keys"
import { setupLevelOneMap } from "../maps/level-1-Map"
import { setupPlayer } from "../players/setupPlayerOfficeDude"
import { setupEnemyBot } from "../players/setupEnemyBot"
import { handlePlayerAttack, handlePlayerCollisionWithEnemy } from "../components/Combat/handleCombat"



export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.GAME_SCENE,
        })

        this.dispatch = null;
        this.isPlayerAttacking = false;
        this.hasCollided = false;
        
    }

    init({dispatch}) {
        this.dispatch = dispatch;
        console.log('Dispatch:', dispatch);
        
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
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.SPACE);

        // setup cubicles with door open (background)
        this.add.sprite(960, 432, "cubicles", "cubicles_f6").setOrigin(1, 1)

        // set up player
        this.officedude = setupPlayer(this) // setup player NOTE: has to follow after animations are created

        // setup cubicles overlay after player (foreground)
        this.add.sprite(960, 432, "cubicles-overlay").setOrigin(1, 1)

        // setup enemyBots group and add test
        this.enemyBots = this.physics.add.group() // create enemy-bot group
        const enemyTest = setupEnemyBot(
            this,
            this.scale.width / 1.5,
            this.scale.height / 1.5 // arbitrary numbers to keep it close to player
        )
        this.enemyBots.add(enemyTest)

        // colliders

        this.physics.add.collider(this.officedude, this.enemyBots, this.handlePlayerCollisionWithEnemy, null, this)
        this.physics.add.collider(this.officedude, horizontalWallsLayer)
        this.physics.add.collider(this.officedude, verticalWallsLayer)
        this.physics.add.collider(this.officedude, collisionLayer)


        // setup cameras
        this.cameras.main.startFollow(this.officedude, true)
        
        //Handle player attack input (spacebar)
        this.input.keyboard.on('keydown-SPACE', () => {
            this.isPlayerAttacking = true;
            //this.dispatch(togglePlayerAttack(true)); //update redux state;
        });
        
        this.input.keyboard.on('keyup-SPACE', () => {
            this.isPlayerAttacking = false;
            //this.dispatch(togglePlayerAttack(false)); //update redux state;
        });
        
       

        this.cameras.main.setBounds(0, 0, 1280, 2176) // arbitrary numbers NEEDS CORRECTING
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
        // Update the game loop (movement, AI, etc.)

        const { cursors, officedude, spacebar } = this

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

        if (this.isPlayerAttacking) {
            this.enemyBots.getChildren().forEach((enemy) => {
                handlePlayerAttack(officedude, enemy, this.dispatch);
            });
        }
    };



    handlePlayerCollisionWithEnemy(player, enemy) {

       
       handlePlayerCollisionWithEnemy(player, enemy, this.dispatch, this.isPlayerAttacking, this.hasCollided) 
        
       
    }
}
