import Phaser from "phaser"
import Mrpas from "../utils/mrpas"
import { SCENE_KEYS } from "./scene-keys"

export default class FovScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.FOV_SCENE })
    }

    init(data) {
        // Destructure and store incoming data
        ;({
            map: this.map,
            groundLayer: this.groundLayer,
            horizontalWallsLayer: this.horizontalWallsLayer,
            verticalWallsLayer: this.verticalWallsLayer,
            objectsLayerBottom: this.objectsLayerBottom,
            objectsLayerTop: this.objectsLayerTop,
            player: this.player,
            collisionLayer: this.collisionLayer,
            enemyBots: this.enemyBots,
        } = data)
    }

    create() {
        this.createFov()
        this.setInitialAlpha()
    }

    update() {
        this.setInitialAlpha()
        this.updateFieldOfView()
    }

    /**
     * Initialize Field of View (FoV) with Mrpas
     */
    createFov() {
        this.fov = new Mrpas(this.map.width, this.map.height, (x, y) => {
            const tile = this.groundLayer.getTileAt(x, y)
            return tile && !tile.collides // Transparent if not colliding
        })
    }

    /**
     * Set initial alpha for all tiles and entities
     */
    setInitialAlpha() {
        this.setLayerAlpha(this.groundLayer, 0.05)
        this.setLayerAlpha(this.horizontalWallsLayer, 0.05)
        this.setLayerAlpha(this.verticalWallsLayer, 0.05)
        this.setLayerAlpha(this.objectsLayerBottom, 0.4)
        this.setLayerAlpha(this.objectsLayerTop, 0.4)
        this.setEntitiesAlpha(this.enemyBots, 0.4)
    }

    /**
     * Reset all tiles to their initial alpha (Just using set initial alpha for reset)
     */
    /* resetTileVisibility() {
        this.setLayerAlpha(this.groundLayer, 0.1)
        this.setLayerAlpha(this.horizontalWallsLayer, 0.1)
        this.setLayerAlpha(this.verticalWallsLayer, 0.1)
        this.setLayerAlpha(this.objectsLayerBottom, 0.4)
        this.setLayerAlpha(this.objectsLayerTop, 0.4)
        this.setEntitiesAlpha(this.enemyBots, 0.4)
    } */

    /**
     * Update Field of View (FoV) based on player's position
     */
    updateFieldOfView() {
        const playerTileX = this.groundLayer.worldToTileX(this.player.x)
        const playerTileY = this.groundLayer.worldToTileY(this.player.y)
        const radius = 5

        // Compute FoV
        this.fov.compute(
            playerTileX,
            playerTileY,
            radius,
            (x, y) => this.tileBlocksLight(x, y),
            (x, y) =>
                this.updateTileVisibility(
                    x,
                    y,
                    playerTileX,
                    playerTileY,
                    radius
                )
        )
    }

    /**
     * Determine if a tile blocks light
     */
    tileBlocksLight(x, y) {
        const tile = this.groundLayer.getTileAt(x, y)
        return tile && tile.collides
    }

    /**
     * Update visibility for a specific tile
     */
    updateTileVisibility(x, y, playerTileX, playerTileY, radius) {
        const dx = x - playerTileX
        const dy = y - playerTileY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance <= radius) {
            const alpha = Phaser.Math.Clamp(1 - distance / radius, 0.4, 1)

            // Update ground and object tiles
            this.updateTileAlpha(this.groundLayer, x, y, alpha)
            this.updateTileAlpha(this.objectsLayerBottom, x, y, alpha)
            this.updateTileAlpha(this.objectsLayerTop, x, y, alpha)

            // Update walls
            this.updateWallVisibility(x, y, playerTileY, alpha)
        }

        // Update enemies
        this.updateEnemyVisibility(playerTileX, playerTileY, radius)
    }

    /**
     * Update alpha for walls, including tiles above walls
     */
    updateWallVisibility(x, y, playerTileY, alpha) {
        const wallTile = this.horizontalWallsLayer.getTileAt(x, y)
        const wallTileAbove = this.horizontalWallsLayer.getTileAt(x, y - 1)

        if (wallTile) {
            if (playerTileY > y) {
                wallTile.setAlpha(alpha)
                if (wallTileAbove) wallTileAbove.setAlpha(alpha)
            } else {
                wallTile.setAlpha(0.1)
                if (wallTileAbove) wallTileAbove.setAlpha(0.1)
            }
        }
    }

    /**
     * Update visibility of enemies based on distance from player
     */
    updateEnemyVisibility(playerTileX, playerTileY, radius) {
        this.enemyBots.children.iterate((enemy) => {
            const enemyTileX = this.groundLayer.worldToTileX(enemy.x)
            const enemyTileY = this.groundLayer.worldToTileY(enemy.y)

            const dx = enemyTileX - playerTileX
            const dy = enemyTileY - playerTileY
            const distance = Math.sqrt(dx * dx + dy * dy)

            const alpha =
                distance <= radius
                    ? Phaser.Math.Clamp(1 - distance / radius, 0.3, 1)
                    : 0.4
            enemy.setAlpha(alpha)
        })
    }

    /**
     * Set alpha for all tiles in a layer
     */
    setLayerAlpha(layer, alpha) {
        layer.forEachTile((tile) => tile.setAlpha(alpha))
    }

    /**
     * Set alpha for a specific tile in a layer
     */
    updateTileAlpha(layer, x, y, alpha) {
        const tile = layer.getTileAt(x, y)
        if (tile) tile.setAlpha(alpha)
    }

    /**
     * Set alpha for all entities
     */
    setEntitiesAlpha(entities, alpha) {
        entities.children.iterate((entity) => entity.setAlpha(alpha))
    }
}
