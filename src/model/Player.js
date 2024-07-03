const Gameboard = require("./Gameboard.js");

const Player = class {
  /**
   *
   */

  #name = "";
  #isWinner = false;
  #gameboard = null;
  #isHumanPlayer = false;

  constructor(name, isHumanPlayer) {
    this.#name = name;
    this.#isHumanPlayer = isHumanPlayer;
    this.#gameboard = new Gameboard();
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

  // Public methods
  setAsWinner() {
    this.#isWinner = true;
  }

  makeRandomMovement(opponentsBoard) {
    if (this.#isHumanPlayer) return false;

    let tileHit = false;
    let shipHit = false;
    let randomRow = -1;
    let randomCol = "";

    do {
      // Random number between 1 and 10
      randomRow = Math.floor(1 + Math.random() * 10);

      // Random number between 65 and 74 to get characters from "A" to "J"
      randomCol = String.fromCharCode(65 + Math.floor(Math.random() * 10));

      ({ tileHit, shipHit } = opponentsBoard.receiveAttack(
        randomRow,
        randomCol,
      ));
    } while (!tileHit);

    return shipHit ? this.makeRandomMovement(opponentsBoard) : true;
  }
};
