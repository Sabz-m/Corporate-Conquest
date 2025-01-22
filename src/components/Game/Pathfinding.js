/*Role: Responsible for calculating paths for entities.
Purpose: Implements an A* algorithm or other pathfinding logic to find a route between two points, such as the player’s current location and a target destination. It may update the player’s position or AI-controlled enemies.
Example: This file could be used to calculate and update movement paths for the player or NPCs in the game.*/

export const generateGrid = (map, collisionLayer, gridSize) => {
  const { width, height } = map;
  const grid = [];
  for (let x = 0; x < width; x++) {
    grid[x] = [];
    for (let y = 0; y < height; y++) {
      const tile = collisionLayer.getTileAt(x, y);
      grid[x][y] = !tile;
    }
  }

  return grid;
};

export const worldToTile = (x, y, gridSize) => {
  return {
    x: Math.floor(x / gridSize),
    y: Math.floor(y / gridSize),
  };
};

export const findPath = (start, end, grid) => {
  const openSet = [];
  const closedSet = [];
  function Node(x, y, g, h, parent = null) {
    return {
      x,
      y,
      g,
      h,
      f: g + h,
      parent,
    };
  }

  function euclideanDistance(node, goal) {
    const dx = node.x - goal.x;
    const dy = node.y - goal.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function nodeInSet(set, node) {
    return set.some((setNode) => setNode.x === node.x && setNode.y === node.y);
  }

  function getNeighbours(node, grid) {
    const neighbours = [];
    const { x, y } = node;

    const adjacentMoves = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
    ];

    for (let move of adjacentMoves) {
      const newX = node.x + move.x;
      const newY = node.y + move.y;
      if (
        newX >= 0 &&
        newX < grid.length && // Check if newX is within the grid bounds
        newY >= 0 &&
        newY < grid[newX].length && // Check if newY is within the grid bounds
        grid[newX][newY] // Check if the tile is walkable
      ) {
        neighbours.push({ x: newX, y: newY });
      }
    }
    return neighbours;
  }

  const startNode = Node(start.x, start.y, 0, euclideanDistance(start, end));

  openSet.push(startNode);
  while (openSet.length > 0) {
    let currentNode = openSet.reduce((prev, curr) => {
      return prev.f < curr.f ? prev : curr;
    });

    if (currentNode.x === end.x && currentNode.y === end.y) {
      const path = [];
      let temp = currentNode;
      while (temp) {
        path.push({ x: temp.x, y: temp.y });
        temp = temp.parent;
      }
      return path.reverse();
    }

    openSet.splice(openSet.indexOf(currentNode), 1);
    closedSet.push(currentNode);

    const neighbours = getNeighbours(currentNode, grid);

    for (const neighbour of neighbours) {
      if (nodeInSet(closedSet, neighbour)) {
        continue;
      }

      const newGCost =
        currentNode.g + euclideanDistance(currentNode, neighbour);

      if (!nodeInSet(openSet, neighbour)) {
        openSet.push(
          Node(
            neighbour.x,
            neighbour.y,
            newGCost,
            euclideanDistance(neighbour, end),
            currentNode
          )
        );
      } else if (newGCost < neighbour.g) {
        const openNeighbour = openSet.find((n) => {
          return n.x === neighbour.x && n.y === neighbour.y;
        });
        openNeighbour.g = newGCost;
        openNeighbour.f = newGCost + heuristic(neighbour, end);
      }
    }
  }
  return [];
};

export const showPath = (graphics, path, gridSize) => {
  graphics.clear();
  graphics.lineStyle(2, 0x0000ff, 0.8);

  for (let i = 0; i < path.length - 1; i++) {
    const current = path[i];
    const next = path[i + 1];

    const startX = current.x * gridSize + gridSize / 2;
    const startY = current.y * gridSize + gridSize / 2;
    const endX = next.x * gridSize + gridSize / 2;
    const endY = next.y * gridSize + gridSize / 2;

    graphics.moveTo(startX, startY);
    graphics.lineTo(endX, endY);
  }
  graphics.strokePath();
};

export const moveEnemy = (enemy, tile, gridSize) => {
  if (!tile) {
    enemy.setVelocity(0, 0);
    if(!enemy.isAttacking){
    enemy.anims.play("enemybot-down-idle", true);
    }
    return;
  }
  const targetX = tile.x * gridSize + gridSize / 2;
  const targetY = tile.y * gridSize + gridSize / 2;

  const deltaX = targetX - enemy.x;
  const deltaY = targetY - enemy.y;
  const tolerance = 2.5;

  if (Math.abs(deltaX) <= tolerance && Math.abs(deltaY) <= tolerance) {
    enemy.setVelocity(0, 0);
    enemy.setPosition(targetX, targetY);
    if(!enemy.isAttacking){
      enemy.anims.play("enemybot-down-idle", true);
      }
  } else if (Math.abs(deltaX) <= tolerance) {
    enemy.setVelocity(0, deltaY > 0 ? 120 : -120);
    if (deltaY > 0) {
      enemy.anims.play("enemybot-down-walk", true); // Moving down
    } else {
      enemy.anims.play("enemybot-up-walk", true); // Moving up
    }
  } else if (Math.abs(deltaY) <= tolerance) {
    enemy.setVelocity(deltaX > 0 ? 120 : -120, 0);
    if (deltaX > 0) {
      enemy.setFlipX(true); // Face right
      enemy.anims.play("enemybot-left-walk", true); // Moving right
    } else {
      enemy.setFlipX(false); // Face left
      enemy.anims.play("enemybot-left-walk", true); // Moving left
    }
  } else {
    enemy.setVelocity(deltaX > 0 ? 100 : -100, deltaY > 0 ? 100 : -100);
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal is dominant
      if (deltaX > 0) {
        enemy.setFlipX(true); // Face right
        enemy.anims.play("enemybot-left-walk", true); // Moving right
      } else {
        enemy.setFlipX(false); // Face left
        enemy.anims.play("enemybot-left-walk", true); // Moving left
      }
    } else {
      // Vertical is dominant
      if (deltaY > 0) {
        enemy.anims.play("enemybot-down-walk", true); // Moving down
      } else {
        enemy.anims.play("enemybot-up-walk", true); // Moving up
      }
    }
  }
};

export const visualiseGrid = (scene, grid, gridSize) => {
  const graphics = scene.add.graphics();
  graphics.clear();

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const color = grid[x][y] ? 0x00ff00 : 0xff0000;
      const alpha = 0.5;
      const rectX = x * gridSize;
      const rectY = y * gridSize;

      graphics.fillStyle(color, alpha);
      graphics.fillRect(rectX, rectY, gridSize, gridSize);
    }
  }

  return graphics;
};

export function handleEnemyMovement({
  enemy,
  playerTile,
  spawnTile,
  grid,
  detectionRange,
  maxChaseRange,
  isTrackingPlayer,
  moveEnemy,
  gridSize,
}) {
  const enemyTile = worldToTile(enemy.x, enemy.y, gridSize);

  const distanceToPlayer = Phaser.Math.Distance.Between(
    playerTile.x,
    playerTile.y,
    enemyTile.x,
    enemyTile.y
  );

  const distanceToSpawn = Phaser.Math.Distance.Between(
    enemyTile.x,
    enemyTile.y,
    spawnTile.x,
    spawnTile.y
  );

  if (!isTrackingPlayer) {
    if (distanceToPlayer <= detectionRange) {
      isTrackingPlayer = true;
    }
  } else {
    if (distanceToPlayer > maxChaseRange) {
      const pathToSpawn = findPath(enemyTile, spawnTile, grid);

      if (pathToSpawn && pathToSpawn.length > 2) {
        const nextStep = pathToSpawn[1];
        moveEnemy(enemy, nextStep, gridSize);
      } else {
        enemy.setVelocity(0, 0);
        if(!enemy.isAttacking){
          enemy.anims.play("enemybot-down-idle", true);
        }
      }

      if (distanceToSpawn <= 1) {
        isTrackingPlayer = false;
      }
    } else {
      const pathToPlayer = findPath(enemyTile, playerTile, grid);

      if (pathToPlayer && pathToPlayer.length > 3) {
        const nextStep = pathToPlayer[1];
        moveEnemy(enemy, nextStep, gridSize);
      } else {
        enemy.setVelocity(0, 0);
        if(!enemy.isAttacking){
        enemy.anims.play("enemybot-down-idle", true);
        }
        enemy.attack(playerTile, gridSize, pathToPlayer)
      }
    }
  }

  return isTrackingPlayer;
}

export const separateEnemies = (enemyGroup, minDistance) => {
  enemyGroup.getChildren().forEach((enemyA) => {
    enemyGroup.getChildren().forEach((enemyB) => {
      if (enemyA !== enemyB) {
        const dx = enemyA.x - enemyB.x;
        const dy = enemyA.y - enemyB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
              enemyA.x += minDistance - distance;
              enemyB.x -= minDistance - distance;
            } else {
              enemyA.x -= minDistance - distance;
              enemyB.x += minDistance - distance;
            }
          } else {
            if (dy > 0) {
              enemyA.y += minDistance - distance;
              enemyB.y -= minDistance - distance;
            } else {
              enemyA.y -= minDistance - distance;
              enemyB.y += minDistance - distance;
            }
          }
        }
      }
    });
  });
};
