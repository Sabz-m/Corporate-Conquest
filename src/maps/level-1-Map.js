export const setupLevelOneMap = (scene) => {
    const map = scene.make.tilemap({ key: "level-1-map" });
  
    const roomBuilderTileset = map.addTilesetImage(
      "48x48_roombuilder_tileset",
      "tiles-img"
    );
    const bathroomTileset = map.addTilesetImage("bathroom_tileset", "bathroom-tiles-img");
  
    const groundLayer = map.createLayer("ground", roomBuilderTileset);
    const wallsLayer = map.createLayer("walls", roomBuilderTileset);
    const objectsLayer = map.createLayer("objects", bathroomTileset);
  
    wallsLayer.setCollisionByProperty({ collides: true });

    // Walls collision Debugging (highlights collision properties with yellow highlight)
            const debugGraphics = scene.add.graphics().setAlpha(0.7)
            wallsLayer.renderDebug(debugGraphics, {
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
                faceColor: new Phaser.Display.Color(40, 39, 37, 255),
            })
  
    // Return layers for further use (e.g., collisions)
    return { map, groundLayer, wallsLayer, objectsLayer };
  };