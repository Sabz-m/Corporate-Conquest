import { createLaserProjectileAnims } from "../animations/laserProjectileAnims"

export const setupEnemyBot = (scene, x, y) => {
    const enemyBot = scene.physics.add.sprite(x, y, "basic-enemy-bot")
    enemyBot.play("enemybot-down-idle")
    enemyBot.enemyHealth = 100
    enemyBot.isAttacking = false // Flag to check if the enemy is in the middle of an attack

    enemyBot.laser = scene.physics.add.sprite(-1000, -1000, "laser-projectile")

    enemyBot.laser.setVisible(false)
    createLaserProjectileAnims(scene)

    enemyBot.setDepth(100)

    enemyBot.attack = (playerTile, gridSize) => {
        if (enemyBot.isAttacking) {
            return
        }

        enemyBot.isAttacking = true
        const laser = enemyBot.laser

        scene.laserGroup.add(laser); // Add the laser to the laser group
        
        laser.setPosition(enemyBot.x, enemyBot.y - 30)
        laser.setVisible(true)

        const targetX = playerTile.x * gridSize + gridSize / 2
        const targetY = playerTile.y * gridSize + gridSize / 2

        const directionX = targetX - laser.x
        const directionY = targetY - laser.y

        const angle = Math.atan2(directionY, directionX)

        // Set laser velocity to shoot towards the player
        const speed = 200 // Adjust speed as needed
        laser.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)

        laser.anims.play("laser-animation", true)

        scene.time.delayedCall(3000, () => {
            laser.setVisible(false) 
            laser.setPosition(-1000, -1000) 
            enemyBot.isAttacking = false
        })
    }

    return enemyBot
}
