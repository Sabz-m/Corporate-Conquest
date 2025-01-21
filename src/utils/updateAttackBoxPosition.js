export const updateAttackBoxPosition = (scene) => {

    switch (scene.officedude.direction) {
        case "up":
            scene.officedude.attackbox.setPosition(
                scene.officedude.x,
                scene.officedude.y - 50
            )
            break
        case "down":
            scene.officedude.attackbox.setPosition(
                scene.officedude.x,
                scene.officedude.y + 60
            )
            break
        case "left":
            scene.officedude.attackbox.setPosition(
                scene.officedude.x - 30,
                scene.officedude.y
            )
            break
        case "right":
            scene.officedude.attackbox.setPosition(
                scene.officedude.x + 30,
                scene.officedude.y
            )
            break
        case "up-left":
            scene.officedude.attackbox.setPosition(
                scene.officedude.x - 30,
                scene.officedude.y - 30
            )
            break
        case "up-right":
            scene.officedude.attackbox.setPosition(
                scene.officedude.x + 30,
                scene.officedude.y - 30
            )
            break
        case "down-left":
            scene.officedude.attackbox.setPosition(
                scene.officedude.x - 30,
                scene.officedude.y + 30
            )
            break
        case "down-right":
            scene.officedude.attackbox.setPosition(
                scene.officedude.x + 30,
                scene.officedude.y + 30
            )
            break
        default:
            scene.officedude.attackbox.setPosition(
                scene.officedude.x,
                scene.officedude.y + 50
            )
    }
}
