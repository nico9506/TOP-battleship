const Tile = class {
  /**
   * Data structure to represent a Tile of the Gameboard
   * @param {Ship} ship - instance of Ship class to be saved in this tile
   */

  #ship = null;
  #isHit = false;

  constructor(ship = null) {
    this.#ship = ship;
    this.#isHit = false;
  }

  // Getters and Setters
  get ship() {
    return this.#ship;
  }

  get isHit() {
    return this.#isHit;
  }

  // Public methods
  markTileasHit() {
    this.#isHit = true;
  }
};
