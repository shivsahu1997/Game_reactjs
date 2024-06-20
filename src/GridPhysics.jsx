import React, { useEffect, useState } from "react";
import { Direction } from "./Direction";
import { Player } from "./Player";
import GameScene from "./GameScene";
import Phaser from "phaser";

const Vector2 = Phaser.Math.Vector2;

const GridPhysics = ({ player, tilemap }) => {
  const tileSizePixelsWalked = 0;
  const [lastMovementIntent, setLastMovementIntent] = useState(Direction.NONE);
  const [movementDirection, setMovementDirection] = useState(Direction.NONE);
  const speedPixelsPerSecond = GameScene.TILE_SIZE * 2;
  const movementDirectionVectors = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT,
  };

  const isBlockingDirection = (direction) => {
    return hasBlockingTile(tilePosInDirection(direction));
  };

  const tilePosInDirection = (direction) => {
    return player.getTilePosition().add(movementDirectionVectors[direction]);
  };

  const hasBlockingTile = (pos) => {
    if (hasNoTile(pos)) return true;
    return tilemap.layers.some((layer) => {
      const tile = tilemap.getTileAt(pos.x, pos.y, false, layer.name);
      return tile && tile.properties.collides;
    });
  };

  const hasNoTile = (pos) => {
    return !tilemap.layers.some((layer) =>
      tilemap.hasTileAt(pos.x, pos.y, layer.name)
    );
  };

  const movePlayer = (direction) => {
    setLastMovementIntent(direction);
    if (isMoving()) return;
    if (isBlockingDirection(direction)) {
      player.stopAnimation(direction);
    } else {
      startMoving(direction);
    }
  };

  const updatePlayerPosition = (delta) => {
    const pixelsToWalkThisUpdate = getPixelsToWalkThisUpdate(delta);

    if (!willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      movePlayerSprite(pixelsToWalkThisUpdate);
    } else if (shouldContinueMoving()) {
      movePlayerSprite(pixelsToWalkThisUpdate);
      updatePlayerTilePos();
    } else {
      movePlayerSprite(GameScene.TILE_SIZE - tileSizePixelsWalked);
      stopMoving();
    }
  };

  const updatePlayerTilePos = () => {
    player.setTilePosition(
      player.getTilePosition().add(movementDirectionVectors[movementDirection])
    );
  };

  const shouldContinueMoving = () => {
    return (
      movementDirection === lastMovementIntent &&
      !isBlockingDirection(lastMovementIntent)
    );
  };

  const movePlayerSprite = (pixelsToMove) => {
    const directionVec = movementDirectionVectors[movementDirection].clone();
    const movementDistance = directionVec.multiply(new Vector2(pixelsToMove));
    const newPlayerPos = player.getPosition().add(movementDistance);
    player.setPosition(newPlayerPos);
  };

  const willCrossTileBorderThisUpdate = (pixelsToWalkThisUpdate) => {
    return tileSizePixelsWalked + pixelsToWalkThisUpdate >= GameScene.TILE_SIZE;
  };

  const getPixelsToWalkThisUpdate = (delta) => {
    const deltaInSeconds = delta / 1000;
    return speedPixelsPerSecond * deltaInSeconds;
  };

  const isMoving = () => {
    return movementDirection !== Direction.NONE;
  };

  const startMoving = (direction) => {
    player.startAnimation(direction);
    setMovementDirection(direction);
    updatePlayerTilePos();
  };

  const stopMoving = () => {
    player.stopAnimation(movementDirection);
    setMovementDirection(Direction.NONE);
    // Update state
    // This should be replaced with React state updates
  };

  // You can return JSX here to render any UI elements related to this component.
  return null;
};

export default GridPhysics;
