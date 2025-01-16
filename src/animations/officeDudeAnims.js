export const createOfficeDudeAnimations = (scene) => {
    scene.anims.create({
      key: "down-idle",
      frames: scene.anims.generateFrameNames("office-dude", {
        prefix: "_down_idle_f",
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
  
    scene.anims.create({
      key: "left-walk",
      frames: scene.anims.generateFrameNames("office-dude", {
        prefix: "_side_walk_f",
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
  
    scene.anims.create({
      key: "up-walk",
      frames: scene.anims.generateFrameNames("office-dude", {
        prefix: "_up_walk_f",
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
  
    scene.anims.create({
      key: "down-walk",
      frames: scene.anims.generateFrameNames("office-dude", {
        prefix: "_down_walk_f",
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
  };
  