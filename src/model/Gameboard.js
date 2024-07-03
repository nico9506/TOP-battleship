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
   *      9     [90, 91, ...,              99]
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
    /**
     * The 1990 Milton Bradley version of the rules specify the following ships:
     * No.  ClassOfShip.  Size
     * 1    Carrier       5
     * 2    Battleship    4
     * 3    Cruiser       3
     * 4    Submarine     3
     * 5    Destroyer     2
     */

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
      // Out of board
      if (99 < tmpIndex) return false;

      // Tile not available
      if (this.#arrayOfTiles[tmpIndex].ship instanceof Ship) return false;

      // Math.floor(index/10) returns the first digit of the index (current row).
      // Check if there is enough space to place the ship in that row.
      if (
        !traverseVertically &&
        Math.floor(startIndex / 10) !== Math.floor(tmpIndex / 10)
      )
        return false;

      // Saves the available tiles already checked
      tilesChecked.push(tmpIndex);

      // Modify the index according the specified orientation
      traverseVertically ? (tmpIndex += 10) : tmpIndex++;
    }

    // Assign Ship to Checked Tiles
    tilesChecked.forEach(
      (index) => (this.#arrayOfTiles[index].ship = shipInstance),
    );

    this.#shipsPlaced++;

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
    return this.#traverseBoardTiles(shipInstance, tileIndex, verticalPosition);
  }

  receiveAttack(rowSelected, colSelected) {
    /**
     * Take a pair of coordinates, determines whether or not the attack hit a ship
     * and then send the ‘hit’ function to the correct ship, or mark that tile as hit.
     * @param {number} rowSelected - number between 1 and 10,
     * @param {string} colSelected - Char from A to J, Represents the board columns
     * @returns {Object} firs element: true if a valid tile was hit, otherwise false.
     * Second element: true if a ship was hit, otherwise false
     */

    const selectedIndex = this.#getIndexfromCoordinates(
      rowSelected,
      colSelected,
    );
    if (0 > selectedIndex) return { tileHit: false, shipHit: false }; // Not valid getIndexfromCoordinates

    const selectedTile = this.#arrayOfTiles[selectedIndex];
    if (selectedTile.isHit) {
      return { tileHit: false, shipHit: false };
    } else {
      selectedTile.markTileAsHit();
    }

    if (selectedTile.ship instanceof Ship) {
      selectedTile.ship.hit();
      return { tileHit: true, shipHit: true };
    }

    return { tileHit: true, shipHit: false };
  }
};

module.exports = Gameboard;
