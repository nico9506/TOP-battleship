const Gameboard = require("./Gameboard.js");
const Ship = require("./Ship.js");

const Player = class {
  /**
   * Represents a Human or Computer player
   */

  #name = "";
  #isWinner = false;
  #gameboard = null;
  #isHumanPlayer = false;
  #tilesAvailable = []; // items are pop out when the related tile is hit
  #shipsToPlace = [];
  #tilesWithShipsSunk = 0; // 44 is the maximum for this game set up

  constructor(name, isHumanPlayer) {
    this.#name = name;
    this.#isHumanPlayer = isHumanPlayer;
    this.#gameboard = new Gameboard();
    this.#tilesAvailable = this.#generateArrayOfIndex();
    this.#shipsToPlace = this.#generateShips();
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

  get shipsToPlace() {
    return this.#shipsToPlace;
  }

  get tilesWithShipsSunk() {
    return this.#tilesWithShipsSunk;
  }

  // Public methods
  increaseCounterOfShipsSunk() {
    this.#tilesWithShipsSunk++;
  }

  shiftShipFromListToPlace() {
    /**
     * Remove and return the first element of the list of shipsToPlace
     * Null if no any element
     * returns {Ship}
     */
    if (this.#shipsToPlace.length < 1) return null;
    return this.#shipsToPlace.shift();
  }

  /**
   * @param {number} index
   */
  spliceTilesAvailable(index) {
    this.#tilesAvailable.splice(index, 1);
  }

  generateRandomBoard() {
    /**
     * Place the player ships in random coordinates
     */

    let randomIndex = 0;
    let randomOrientation = false;
    let currentShip = null;

    this.#shipsToPlace.forEach((ship) => {
      currentShip = ship;

      while (currentShip !== null) {
        // random int between 0 and 99
        randomIndex = Math.round(Math.random() * 100);

        // random int between 0 and 1
        randomOrientation = Math.round(Math.random() * 2) === 0 ? false : true;

        // true if the ship was placed, otherwise false
        const shipPlaced = this.#gameboard.placeShipInGameboard(
          currentShip,
          1,
          "a",
          randomIndex,
          randomOrientation,
        );

        if (shipPlaced) currentShip = null;
      }
    });

    // clean the array as all ships were placed.
    this.#shipsToPlace = [];
    console.log(
      `Ships randomly placed in gameboard. Player name: ${this.#name}, Human player: ${this.#isHumanPlayer}}`,
    );
  }

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

  #generateShips() {
    /**
     * Creates 15 instances of Ship according to the game rules
     * The 1990 Milton Bradley version of the rules specify the following ships:
     * No.  ClassOfShip.  Size
     * 1    Carrier       5
     * 2    Battleship    4
     * 3    Cruiser       3
     * 4    Submarine     3
     * 5    Destroyer     2
     */

    const arrayOfShips = [];

    arrayOfShips.push(new Ship(5));
    arrayOfShips.push(new Ship(4));
    arrayOfShips.push(new Ship(4));

    for (let i = 0; i < 7; i++) {
      arrayOfShips.push(new Ship(3));
    }

    for (let i = 0; i < 5; i++) {
      arrayOfShips.push(new Ship(2));
    }

    return arrayOfShips;
  }
};

module.exports = Player;
