import React, { useEffect } from "react";
import Phaser from "phaser";
import GridControls from "./GridControls";
import GridPhysics from "./GridPhysics";
import Player from "./Player";
import { Direction } from "./Direction";

const GameScene = () => {
  let gridPhysics; // Declare as a regular class property
  let gridControls; // Declare as a regular class property

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800, // Adjust the width as needed
      height: 600, // Adjust the height as needed
      scene: {
        preload: function () {
          this.load.image("tiles", "assets/cloud_tileset.png");
          this.load.tilemapTiledJSON(
            "cloud-city-map",
            "assets/cloud_city.json"
          );
          this.load.spritesheet("player", "assets/characters.png", {
            frameWidth: 26,
            frameHeight: 36,
          });
        },
        create: function () {
          const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
          cloudCityTilemap.addTilesetImage("Cloud City", "tiles");

          for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
            const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
            layer.setDepth(i);
            layer.scale = 3;
          }

          const playerSprite = this.add.sprite(5, 5, "player");
          playerSprite.setDepth(1);
          playerSprite.scale = 3;
          this.cameras.main.startFollow(playerSprite);
          this.cameras.main.roundPixels = true;
          const player = new Player(
            playerSprite,
            new Phaser.Math.Vector2(6, 6)
          );

          gridPhysics = new GridPhysics(player, cloudCityTilemap);
          gridControls = new GridControls(this.input, gridPhysics);

          this.createPlayerAnimation(Direction.UP, 90, 92);
          this.createPlayerAnimation(Direction.RIGHT, 78, 80);
          this.createPlayerAnimation(Direction.DOWN, 54, 56);
          this.createPlayerAnimation(Direction.LEFT, 66, 68);
        },
        update: function (time, delta) {
          gridControls.update();
          gridPhysics.update(delta);
        },
      },
      parent: "game-container",
      dom: {
        createContainer: true,
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id='game-container' />;
};

export default GameScene;
