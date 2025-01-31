export const setupLevelOneMap = (scene) => {
    const background = scene.add
        .sprite(320, 400, "carpark-background")
        .setDepth(-1000)
        .setScale(1)
        .setScrollFactor(0.8)
    const map = scene.make.tilemap({ key: "level-1-map" })

    const roomBuilderTileset = map.addTilesetImage(
        "48x48_roombuilder_tileset",
        "tiles-img"
    )
    const officeObjectsTileset = map.addTilesetImage(
        "office-objects-tileset",
        "office-objects-img"
    )
    const bathroomTileset = map.addTilesetImage(
        "bathroom_tileset",
        "bathroom-tiles-img"
    )

    const groundLayer = map
        .createLayer("ground", roomBuilderTileset)
        .setDepth(-100)
    const collisionLayer = map.createLayer("collisions", roomBuilderTileset)
    collisionLayer.setAlpha(0)

    const horizontalWallsLayer = map.createLayer(
        "horizontal-walls",
        roomBuilderTileset
    )
    const verticalWallsLayer = map.createLayer(
        "vertical-walls",
        roomBuilderTileset
    )
    const objectsLayerBottom = map.createLayer("objects-bottom", [
        bathroomTileset,
        officeObjectsTileset,
    ])
    const objectsLayerTop = map.createLayer("objects-top", [
        bathroomTileset,
        officeObjectsTileset,
    ])

    horizontalWallsLayer.setCollisionByProperty({ collides: true })
    verticalWallsLayer.setCollisionByProperty({ collides: true })
    collisionLayer.setCollisionByProperty({ collides: true })
    objectsLayerTop.setDepth(200)
    objectsLayerBottom.setDepth(50)

    // Return layers for further use (e.g., collisions)
    return {
        map,
        groundLayer,
        horizontalWallsLayer,
        verticalWallsLayer,
        objectsLayerBottom,
        objectsLayerTop,
        collisionLayer,
    }
}
