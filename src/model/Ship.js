const Ship = class {
  /**
   * Represents the fave types of ships that can be placed
   * in the gameboard
   */

  #size = 0; // Should be a number between 1 and 5
  #timesHit = 0; // Should be a number between 1 and #size
  #isSunk = false;

  constructor(size) {
    if (1 > size || 5 < size) {
      throw new Error("Ship size must be a number between 1 and 5");
    }
    this.#size = size;
    this.#timesHit = 0;
    this.#isSunk = false;
  }

  // Getters and Setters
  get size() {
    return this.#size;
  }

  get timesHit() {
    return this.#timesHit;
  }

  get isSunk() {
    return this.#isSunk;
  }

  // Public methods
  hit() {
    if (!this.#isSunk) this.#timesHit++;
    this.#checkShip();
    return;
  }

  // Private methods
  #checkShip() {
    if (this.#isSunk) {
      console.log("Ship is sunk");
      return;
    }

    if (this.#timesHit === this.#size) {
      console.log("Ship has been sunk");
      this.#isSunk = true;
      return;
    }

    console.log(
      `Ship (size: ${this.#size}) has been hit ${this.#timesHit} times`,
    );
    return;
  }
};

module.exports = Ship;
