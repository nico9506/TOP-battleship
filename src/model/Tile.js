const Tile = class {
  /**
   * Data structure to represent a Tile of the Gameboard
   * @param {Ship} ship - instance of Ship class to be saved in this tile
   */

  #ship = null;
  #isHit = false;

  constructor() {
    this.#ship = null;
    this.#isHit = false;
  }

  // Getters and Setters
  get ship() {
    return this.#ship;
  }

  get isHit() {
    return this.#isHit;
  }

  set ship(value) {
    this.#ship = value;
  }

  // Public methods
  markTileAsHit() {
    this.#isHit = true;
  }
};

module.exports = Tile;
