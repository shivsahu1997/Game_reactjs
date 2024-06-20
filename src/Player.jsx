import React, { useState, useRef, useEffect } from "react";
import GameScene from "./GameScene"; // Import the GameScene if needed
import { Direction } from "./Direction";

const Player = ({ playerSprite, initialTilePos }) => {
  const [tilePos, setTilePos] = useState(initialTilePos);
  const spriteRef = useRef(null);

  const offsetX = GameScene.TILE_SIZE / 2;
  const offsetY = GameScene.TILE_SIZE;

  // Initialize sprite position
  const initializeSprite = () => {
    if (spriteRef.current) {
      spriteRef.current.setOrigin(0.5, 1);
      spriteRef.current.setPosition(
        tilePos.x * GameScene.TILE_SIZE + offsetX,
        tilePos.y * GameScene.TILE_SIZE + offsetY
      );
      spriteRef.current.setFrame(55);
    }
  };

  // Initialize the sprite position when the component mounts
  useEffect(() => {
    initializeSprite();
  }, []); // Make sure to include the empty dependency array to run this effect only once

  const getPosition = () => {
    if (spriteRef.current) {
      return spriteRef.current.getBottomCenter();
    }
    return { x: 0, y: 0 }; // Default value if spriteRef is not available
  };

  const setPosition = (position) => {
    if (spriteRef.current) {
      spriteRef.current.setPosition(position.x, position.y);
    }
  };

  const getTilePosition = () => {
    return { ...tilePos }; // Return a clone to avoid mutation
  };

  const setTilePosition = (tilePosition) => {
    setTilePos({ ...tilePosition }); // Update the state with a clone
  };

  const stopAnimation = () => {
    if (spriteRef.current && spriteRef.current.anims.currentAnim) {
      const standingFrame =
        spriteRef.current.anims.currentAnim.frames[1].frame.name;
      spriteRef.current.anims.stop();
      spriteRef.current.setFrame(standingFrame);
    }
  };

  const startAnimation = (direction) => {
    if (spriteRef.current) {
      spriteRef.current.anims.play(direction);
    }
  };

  return (
    // Use an appropriate HTML element for your sprite representation, or use a custom game engine component
    <div
      ref={spriteRef}
      style={{
        width: "yourWidth",
        height: "yourHeight",
        background: "url(yourSpriteImage.png) no-repeat",
        backgroundPosition: "0px 0px", // Adjust this based on your sprite image
      }}></div>
  );
};

export default Player;
