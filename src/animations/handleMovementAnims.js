export const handleMovementAnimations = (scene, velocityX, velocityY, shift) => {

    if (velocityX > 0 && velocityY < 0) {
        scene.officedude.direction = "up-right";
    } else if (velocityX > 0 && velocityY > 0) {
        scene.officedude.direction = "down-right";
    } else if (velocityX < 0 && velocityY < 0) {
        scene.officedude.direction = "up-left";
    } else if (velocityX < 0 && velocityY > 0) {
        scene.officedude.direction = "down-left";
    } else if (velocityX > 0) {
        scene.officedude.direction = "right";
    } else if (velocityX < 0) {
        scene.officedude.direction = "left";
    } else if (velocityY > 0) {
        scene.officedude.direction = "down";
    } else if (velocityY < 0) {
        scene.officedude.direction = "up";
    }

    // Play the correct animation based on movement direction
    if (velocityX > 0 && velocityY < 0) {
        // Moving up-right
        scene.officedude.setFlipX(false) // Face right
        scene.officedude.anims.play(
            shift.isDown
                ? "diagonal-up-right-sprint"
                : "diagonal-up-right-walk",
            true
        )
    } else if (velocityX > 0 && velocityY > 0) {
        // Moving down-right
        scene.officedude.setFlipX(false) // Face right
        scene.officedude.anims.play(
            shift.isDown
                ? "diagonal-down-right-sprint"
                : "diagonal-down-right-walk",
            true
        )
    } else if (velocityX < 0 && velocityY < 0) {
        // Moving up-left (Northwest)
        scene.officedude.setFlipX(true) // Flip to face left
        scene.officedude.anims.play(
            shift.isDown
                ? "diagonal-up-right-sprint"
                : "diagonal-up-right-walk",
            true
        )
    } else if (velocityX < 0 && velocityY > 0) {
        // Moving down-left (Southwest)
        scene.officedude.setFlipX(true) // Flip to face left
        scene.officedude.anims.play(
            shift.isDown
                ? "diagonal-down-right-sprint"
                : "diagonal-down-right-walk",
            true
        )
    } else if (velocityX > 0) {
        // Moving right
        scene.officedude.setFlipX(true) // Face right
        scene.officedude.anims.play(
            shift.isDown ? "left-sprint" : "left-walk",
            true
        )
    } else if (velocityX < 0) {
        // Moving left
        scene.officedude.setFlipX(false) // Face left
        scene.officedude.anims.play(
            shift.isDown ? "left-sprint" : "left-walk",
            true
        )
    } else if (velocityY > 0) {
        // Moving down
        scene.officedude.anims.play(
            shift.isDown ? "down-sprint" : "down-walk",
            true
        )
    } else if (velocityY < 0) {
        // Moving up
        scene.officedude.anims.play(
            shift.isDown ? "up-sprint" : "up-walk",
            true
        )
    } else {
        // Idle
        scene.officedude.anims.play("down-idle", true)
    }
}