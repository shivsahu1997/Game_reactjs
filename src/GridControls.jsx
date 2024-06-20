import React, { useEffect } from "react";
import { Direction } from "./Direction";
import { GridPhysics } from "./GridPhysics";

const GridControls = ({ input, gridPhysics }) => {
  console.log("gridPhysics", gridPhysics);
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          gridPhysics.movePlayer(Direction.LEFT);
          break;
        case "ArrowRight":
          gridPhysics.movePlayer(Direction.RIGHT);
          break;
        case "ArrowUp":
          gridPhysics.movePlayer(Direction.UP);
          break;
        case "ArrowDown":
          gridPhysics.movePlayer(Direction.DOWN);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gridPhysics]);

  return null;
};

export default GridControls;
