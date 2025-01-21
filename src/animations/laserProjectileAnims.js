export const createLaserProjectileAnims = (scene) => {
    scene.anims.create({
        key: "laser-projectile",
        frames: scene.anims.generateFrameNames("laser-projectile", {
            prefix: "_laser_f",
            start: 1,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1,
    })
}