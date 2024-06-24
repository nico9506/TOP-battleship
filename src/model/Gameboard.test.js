const Gameboard = require("./Gameboard.js");
const Ship = require("./Ship.js");

const testBoard = new Gameboard();

const testSize = 5;
const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const shipInstance = new Ship(testSize);

rows.forEach((row) => {
  cols.forEach((col) => {
    process.stdout.write(
      `[(${[row, col]}) ${testBoard.placeShipInGameboard(shipInstance, row, col) ? "S" : "."}]`,
    );
  });
  console.log("");
});

testBoard.arrayOfTiles.forEach((tile) =>
  console.log(
    `${testBoard.arrayOfTiles.indexOf(tile)}: ${tile.ship !== null ? tile.ship.size : "empty"}`,
  ),
);
