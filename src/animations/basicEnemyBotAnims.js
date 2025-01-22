export const createEnemyBotAnims = (scene) => {
    //enemy bot animations
    scene.anims.create({
        key: "enemybot-down-idle",
        frames: scene.anims.generateFrameNames("basic-enemy-bot", {
            prefix: "enemybot_down_idle_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })

    scene.anims.create({
        key: "enemybot-left-walk",
        frames: scene.anims.generateFrameNames("basic-enemy-bot", {
            prefix: "enemybot_side_walk_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })

    scene.anims.create({
        key: "enemybot-up-walk",
        frames: scene.anims.generateFrameNames("basic-enemy-bot", {
            prefix: "enemybot_up_walk_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })

    scene.anims.create({
        key: "enemybot-down-walk",
        frames: scene.anims.generateFrameNames("basic-enemy-bot", {
            prefix: "enemybot_down_walk_f",
            start: 1,
            end: 6,
        }),
        frameRate: 10,
        repeat: -1,
    })
    scene.anims.create({
        key: "enemyattack",
        frames: scene.anims.generateFrameNames("enemyattack", {
            prefix: "enemyattack_f",
            start: 1,
            end: 8,
        }),
        frameRate: 10,
    })
    scene.anims.create({
        key: "enemyexplodes",
        frames: scene.anims.generateFrameNames("enemyexplodes", {
            prefix: "enemyexplodes_f",
            start: 1,
            end: 15,
        }),
        frameRate: 3,
    })
}
