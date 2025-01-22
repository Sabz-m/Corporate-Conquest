export const createLaserProjectileAnims = (scene) => {
    if (!scene.anims.exists("laser-animation")) {
        scene.anims.create({
            key: "laser-animation",
            frames: scene.anims.generateFrameNames("laser-projectile", {
                prefix: "_laser_f",
                start: 1,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        })
    }
}
