const Gameboard = require("./Gameboard.js");

const Player = class {
  /**
   * Represents a Human or Computer player
   */

  #name = "";
  #isWinner = false;
  #gameboard = null;
  #isHumanPlayer = false;
  #tilesAvailable = []; // items are pop out when the related tile is hit

  constructor(name, isHumanPlayer) {
    this.#name = name;
    this.#isHumanPlayer = isHumanPlayer;
    this.#gameboard = new Gameboard();
    this.#tilesAvailable = this.#generateArrayOfIndex();
  }

  // Getters and Setters
  get name() {
    return this.#name;
  }

  get isWinner() {
    return this.#isWinner;
  }

  get isHumanPlayer() {
    return this.#isHumanPlayer;
  }

  get gameboard() {
    return this.#gameboard;
  }

  get tilesAvailable() {
    return this.#tilesAvailable;
  }

  // Public methods
  setAsWinner() {
    this.#isWinner = true;
  }

  makeRandomMovement(opponentsBoard) {
    if (this.#isHumanPlayer) return false;
    if (this.tilesAvailable.length < 1) return false;

    let tileHit = false;
    let shipHit = false;
    let randomIndex = -1;
    let randomIndexFromLength = -1;

    // Get a random item from tilesAvailable (index of tile)
    randomIndexFromLength = Math.floor(
      Math.random() * this.#tilesAvailable.length,
    );

    randomIndex = this.#tilesAvailable[randomIndexFromLength];

    ({ tileHit, shipHit } = opponentsBoard.receiveAttackAtIndex(randomIndex));

    // console.log(`randomIndex: ${randomIndex}`);
    if (!tileHit) console.log(`Tile not hit at index ${randomIndex}`);

    this.#tilesAvailable.splice(randomIndexFromLength, 1);

    return shipHit ? this.makeRandomMovement(opponentsBoard) : true;
  }

  // Private methods
  #generateArrayOfIndex() {
    return [...Array(100).keys()];
  }
};

module.exports = Player;
