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
    })

    scene.anims.create({
        key: "left-walk",
        frames: scene.anims.generateFrameNames("office-dude", {
            prefix: "_side_walk_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })

    scene.anims.create({
        key: "up-walk",
        frames: scene.anims.generateFrameNames("office-dude", {
            prefix: "_up_walk_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })

    scene.anims.create({
        key: "down-walk",
        frames: scene.anims.generateFrameNames("office-dude", {
            prefix: "_down_walk_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })
    scene.anims.create({
        key: "down-sprint",
        frames: scene.anims.generateFrameNames("office-dude", {
            prefix: "_down_sprint_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })
    scene.anims.create({
        key: "up-sprint",
        frames: scene.anims.generateFrameNames("office-dude", {
            prefix: "_up_sprint_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })
    scene.anims.create({
        key: "left-sprint",
        frames: scene.anims.generateFrameNames("office-dude", {
            prefix: "_side_sprint_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })
    scene.anims.create({
        key: "diagonal-up-right-sprint",
        frames: scene.anims.generateFrameNames("office-dude", {
            prefix: "_diagonal_up_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })
    scene.anims.create({
        key: "diagonal-up-right-walk",
        frames: scene.anims.generateFrameNames("office-dude", {
            prefix: "_diagonal_up_f",
            start: 1,
            end: 6,
        }),
        frameRate: 7,
        repeat: -1,
    })
    scene.anims.create({
        key: "diagonal-down-right-sprint",
        frames: scene.anims.generateFrameNames("office-dude", {
            prefix: "_diagonal_down_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })
    scene.anims.create({
      key: "diagonal-down-right-walk",
      frames: scene.anims.generateFrameNames("office-dude", {
          prefix: "_diagonal_down_f",
          start: 1,
          end: 6,
      }),
      frameRate: 7,
      repeat: -1,
  })
    scene.anims.create({
        key: "punch-down",
        frames: scene.anims.generateFrameNames("punch-down", {
            prefix: "_punch_down_f",
            start: 1,
            end: 3,
        }),
        frameRate: 15,
        repeat: -1,
    })
}
