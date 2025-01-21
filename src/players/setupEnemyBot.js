import { createLaserProjectileAnims } from "../animations/laserProjectileAnims"

export const setupEnemyBot = (scene, x, y) => {
    const enemyBot = scene.physics.add.sprite(x, y, "basic-enemy-bot")
    enemyBot.play("enemybot-down-idle")

    enemyBot.laser = scene.physics.add.sprite(
        enemyBot.x,
        enemyBot.y - 30,
        "laser-projectile"
    )
    
    createLaserProjectileAnims(scene)

    enemyBot.setDepth(100)
    
    enemyBot.laser.anims.play("laser-animation", true)

    return enemyBot
}
