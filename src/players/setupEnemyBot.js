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
        // Prevent multiple attacks simultaneously
        if (enemyBot.isAttacking) {
            return
        }
        enemyBot.isAttacking = true

        enemyBot.anims.play("enemyattack")
        enemyBot.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            // Return to the idle animation after the attack animation finishes
            if (enemyBot.isAttacking) {
                enemyBot.anims.play("enemybot-down-idle")
            }
        })

        // Wait for the attack animation to finish before releasing the laser
        scene.time.delayedCall(800, () => {
            const laser = enemyBot.laser
            laser.setScale(1.5)

            // Add the laser to the laser group
            scene.laserGroup.add(laser)

            // Position the laser near the enemyBot
            laser.setPosition(enemyBot.x, enemyBot.y - 10)
            laser.setVisible(true)

            // Calculate target direction
            const targetX = playerTile.x * gridSize + gridSize / 2
            const targetY = playerTile.y * gridSize + gridSize / 2

            const directionX = targetX - laser.x
            const directionY = targetY - laser.y

            const angle = Math.atan2(directionY, directionX)

            // Set laser velocity to shoot towards the player
            const speed = 200 // Adjust speed as needed
            laser.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)

            // Play laser animation
            laser.anims.play("laser-animation", true)

            // Hide the laser after 3 seconds
            scene.time.delayedCall(3000, () => {
                laser.setVisible(false)
                laser.setPosition(-1000, -1000)
            })
        })

        // Ensure isAttacking is reset only after the entire attack process is complete
        scene.time.delayedCall(800 + 3000, () => {
            enemyBot.isAttacking = false
        })
    }

    return enemyBot
}
