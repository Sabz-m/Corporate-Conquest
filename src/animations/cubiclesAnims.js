export const createCubiclesAnims = (scene) => {
    scene.anims.create({
        key: "cubicles-door",
        frames: scene.anims.generateFrameNames("cubicles", {
            prefix: "cubicles_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: 0,
    })
}
