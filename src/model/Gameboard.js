const { version } = require("html-webpack-plugin");
const Tile = require("./Tile.js");
const Ship = require("./Ship.js");

const Gameboard = class {
  /**
   * Represents a classic battleship gameboard (10x10 grid)
   *    Row/Col (A, B, C, D, E, F, G, H, I, J)
   *      0     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   *      1     [10, 11, ...                 ]
   *      .     [20, 21                      ]
   *      .     [30, 31                      ]
   *      .     [40, 41                      ]
   *      .       .   .
   *      10    [90, 91, ...,              99]
   *
   * Each array element has a Tile (class)
   */

  #BOARD_LENGTH = 10;
  #arrayOfTiles = Array(this.#BOARD_LENGTH ** 2);
  #shipsPlaced = 0;
  #columnMap = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  constructor() {
    this.#arrayOfTiles = this.#generateGameboard();
    this.#shipsPlaced = 0;
  }

  // Getters and Setters
  get arrayOfTiles() {
    return this.#arrayOfTiles;
  }

  // Private methods
  #generateGameboard() {
    const newArrayOfTiles = [];

    for (let i = 0; i < this.#BOARD_LENGTH ** 2; i++) {
      newArrayOfTiles.push(new Tile());
    }

    return newArrayOfTiles;
  }

  #isBoardFull() {
    return this.#shipsPlaced >= 15 ? true : false;
  }

  #getIndexfromCoordinates(rowSelected, colSelected) {
    /**
     * @description Validate input coordinate to be converted to a Gameboard index (0, 99)
     * @param {number} rowSelected - number between 1 and 10,
     * it is converted to a range of 0-9 to match the arrayOfTiles index;
     * @param {string} colSelected - Char from A to J, Represents the board columns
     * @returns {number} index of Tile in this.#arrayOfTiles (number 0-99), (-1) in
     * case of not valid input
     */

    // Validates input
    if (1 > rowSelected || 10 < rowSelected) return -1;
    if (!this.#columnMap.includes(colSelected.toUpperCase())) return -1;

    return (
      (rowSelected - 1) * 10 +
      this.#columnMap.indexOf(colSelected.toUpperCase())
    );
  }

  #traverseBoardTiles(shipInstance, startIndex, traverseVertically = true) {
    if (0 > shipInstance.size || 5 < shipInstance.size)
      throw new Error(`Length (${shipInstance.size}) not valid`);

    const tilesChecked = [];
    let tmpIndex = startIndex;

    for (let i = 0; i < shipInstance.size; i++) {
      if (99 < tmpIndex) return false; // Out of board
      if (this.#arrayOfTiles[tmpIndex].ship instanceof Ship) return false; // Tile not available
      tilesChecked.push(tmpIndex);
      traverseVertically ? (tmpIndex += 10) : tmpIndex++;
    }

    // Assign Ships to Tiles
    tilesChecked.forEach(
      (index) => (this.#arrayOfTiles[index].ship = shipInstance),
    );

    return true;
  }

  // Public methods
  placeShipInGameboard(
    shipInstance,
    rowSelected,
    colSelected,
    verticalPosition = true,
  ) {
    /**
     * @param {Ship} shipInstance - Instance of class Ship
     * @param {number} rowSelected - number between 1 and 10,
     * it is converted to a range of 0-9 to match the arrayOfTiles index;
     * @param {string} colSelected - Char from A to J, Represents the board columns
     * @param {boolean} verticalPosition - ship alignment, true for vertical, false for horizontal
     * @returns {boolean} true if the shipInstance was placed in board, otherwise false
     */

    // Check if all 15 ships have been placed
    if (this.#isBoardFull()) return false;

    // Validate positioning
    // index from 0 to 99 (-1 invalid index)
    const tileIndex = this.#getIndexfromCoordinates(rowSelected, colSelected);
    if (tileIndex < 0 || 99 < tileIndex) return false; // Not a valid coordinate;

    // Check tiles and place ships in board
    return this.#traverseBoardTiles(shipInstance, tileIndex);
  }
};

module.exports = Gameboard;
