const Player = require("../model//Player.js");

const Controller = class {
  /**
   * Creates players and their gameboards
   * Controls game execution
   */

  // Player class instances
  #player1 = null;
  #player2 = null;

  // Player who is playing the current movement
  #currentPlayer = null;
  #currentOpponent = null;

  constructor() {
    // Singleton pattern
    if (Controller._instance) {
      throw new Error(
        "Class Controller can not be instantiated more than once",
      );
    }
    Controller._instance = this;
  }

  // Getters and Setters
  get player1() {
    return this.#player1;
  }

  get player2() {
    return this.#player2;
  }

  get currentPlayer() {
    return this.#currentPlayer;
  }

  set currentPlayer(player) {
    this.#currentPlayer = player;
  }

  get currentOpponent() {
    return this.#currentOpponent;
  }

  set currentOpponent(player) {
    this.#currentOpponent = player;
  }

  // Public methods
  nextTurn() {
    if (this.#currentPlayer === this.#player1) {
      this.#currentPlayer = this.#player2;
      this.#currentOpponent = this.#player1;
    } else {
      this.#currentPlayer = this.#player1;
      this.#currentOpponent = this.#player2;
    }
  }

  checkGameOver() {
    return this.#player1.isWinner || this.#player2.isWinner ? true : false;
  }

  restartInstance(
    player1Name = "Player 1",
    player1Human = true,
    player2Name = "Player 2",
    player2Human = false,
  ) {
    /**
     * Set up new values for all attributes of the instance
     */

    this.#player1 = new Player(player1Name, player1Human);
    this.#player2 = new Player(player2Name, player2Human);
    this.#currentPlayer = null;
    this.currentOpponent = null;
  }
};

const gameInstance = new Controller();

exports.gameInstance = gameInstance;
