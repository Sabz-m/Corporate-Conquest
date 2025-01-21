export const setupCursorControls = (scene) => {
    let velocityX = 0;
    let velocityY = 0;

    // Get input keys
    const cursors = scene.cursors;
    const shift = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    // Calculate velocities
    if (cursors.left.isDown) {
        velocityX = shift.isDown ? -350 : -220;
    } else if (cursors.right.isDown) {
        velocityX = shift.isDown ? 350 : 220;
    }

    if (cursors.up.isDown) {
        velocityY = shift.isDown ? -350 : -220;
    } else if (cursors.down.isDown) {
        velocityY = shift.isDown ? 350 : 220;
    }

    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
        velocityX *= Math.SQRT1_2;
        velocityY *= Math.SQRT1_2;
    }

    return {velocityX, velocityY, shift}
}