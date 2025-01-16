export const setupPlayer = (scene) => {
  const player = scene.physics.add.sprite(
    scene.scale.width / 2,
    scene.scale.height / 2,
    "office-dude"
  )
  player.body.setSize(39, 15); // Set size for accurate collision
  player.body.setOffset(0, 66); // Offset to feet area
  player.play("down-idle"); // Default animation

  return player;
};
