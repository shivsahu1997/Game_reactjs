import React, { useEffect } from "react";
import GameScene from "./GameScene";
import Phaser from "phaser";

const App = () => {
console.log("GameScene",GameScene())
  useEffect(() => {
    const CANVAS_WIDTH = 720;
    const CANVAS_HEIGHT = 528;

    const config = {
      title: "Sample",
      render: {
        antialias: false,
      },
      type: Phaser.AUTO,
      scene: {GameScene}, 
      scale: {
        parent: "app",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      parent: "app",
    };

    console.log("config",config)

    const game = new Phaser.Game(config);

    console.log("game",game)

    return () => {
      // Clean up the game instance when the component unmounts
      game.destroy(true);
    };
  }, []);

  return <div id='app' />;
};

export default App;
