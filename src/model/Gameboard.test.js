const Gameboard = require("./Gameboard.js");
const Ship = require("./Ship.js");
const Tile = require("./Tile.js");

/**
 * Full board test
 */

const testBoard = new Gameboard();

const testSize = 4;
const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const shipInstance = new Ship(testSize);

const initBoard = () => {
  console.log("POPULATE BOARD");
  rows.forEach((row) => {
    cols.forEach((col) => {
      process.stdout.write(
        `[(${[row, col]}) ${testBoard.placeShipInGameboard(shipInstance, row, col, false) ? "X" : " "}]`,
      );
    });
    console.log("");
  });
};

const printBoard = () => {
  console.log("PRINT BOARD");
  for (let i = 0; i < testBoard.arrayOfTiles.length; i++) {
    if (i % 10 === 0 && i !== 0) console.log("");
    process.stdout.write(
      `[${i}:${testBoard.arrayOfTiles[i].ship !== null ? testBoard.arrayOfTiles[i].ship.size : " "}]`,
    );
  }
};

// Unit Test (JEST)
describe("Gameboard class inner methods testing", () => {
  // beforeAll(() => {
  //   /* Runs before all tests */
  // })
  // afterAll(() => {
  //   /* Runs after all tests */
  // })
  // beforeEach(() => {
  //   /* Runs before each test */
  // })
  // afterEach(() => {
  //   /* Runs after each test */
  // })

  test("Create new instance of board (empty)", () => {
    const boardTest = new Gameboard();
    expect(boardTest instanceof Gameboard).toBeTruthy();
    expect(boardTest.arrayOfTiles.length).toEqual(100);
    expect(boardTest.arrayOfTiles[0] instanceof Tile).toBeTruthy();
    expect(boardTest.arrayOfTiles[9] instanceof Tile).toBeTruthy();
    expect(boardTest.arrayOfTiles[66] instanceof Tile).toBeTruthy();
    expect(boardTest.arrayOfTiles[99] instanceof Tile).toBeTruthy();
    expect(boardTest.arrayOfTiles[0].ship).toBeNull();
    expect(boardTest.arrayOfTiles[4].ship).toBeNull();
    expect(boardTest.arrayOfTiles[44].ship).toBeNull();
    expect(boardTest.arrayOfTiles[98].ship).toBeNull();
  });

  test("Test positioning of ships in gameboard", () => {
    const boardTest = new Gameboard();
    const shipTest5 = new Ship(5);
    expect(
      boardTest.placeShipInGameboard(shipTest5, 5, "D", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest5, 5, "h", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest5, 4, "D", false),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest5, 7, "e", false),
    ).toBeFalsy();
    expect(
      boardTest.placeShipInGameboard(shipTest5, 3, "H", false),
    ).toBeFalsy();
    expect(
      boardTest.placeShipInGameboard(shipTest5, 10, "j", true),
    ).toBeFalsy();
    expect(
      boardTest.placeShipInGameboard(shipTest5, 10, "j", false),
    ).toBeFalsy();
  });

  test("Test limit of ships in gameboard", () => {
    const boardTest = new Gameboard();
    const shipTest1 = new Ship(2);
    const shipTest2 = new Ship(3);
    const shipTest3 = new Ship(3);
    const shipTest4 = new Ship(4);
    const shipTest5 = new Ship(5);
    expect(
      boardTest.placeShipInGameboard(shipTest1, 1, "a", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest1, 1, "b", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest1, 1, "c", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest1, 1, "d", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest1, 1, "e", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest2, 1, "f", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest2, 1, "g", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest2, 1, "h", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest2, 1, "i", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest3, 1, "j", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest3, 3, "a", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest3, 3, "b", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest4, 3, "c", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest4, 3, "d", true),
    ).toBeTruthy();
    expect(
      boardTest.placeShipInGameboard(shipTest5, 3, "e", true),
    ).toBeTruthy();
    expect(boardTest.placeShipInGameboard(shipTest1, 8, "a", true)).toBeFalsy();
    expect(boardTest.placeShipInGameboard(shipTest1, 9, "a", true)).toBeFalsy();
    expect(boardTest.placeShipInGameboard(shipTest5, 9, "e", true)).toBeFalsy();
  });

  test("Test receiveAttack method", () => {
    const boardTest = new Gameboard();
    const shipTest3 = new Ship(3);
    boardTest.placeShipInGameboard(shipTest3, 3, "c");

    expect(boardTest.arrayOfTiles[22].isHit).toBeFalsy();
    expect(boardTest.arrayOfTiles[22].ship.timesHit).toEqual(0);
    expect(boardTest.receiveAttack(3, "c")).toBeTruthy();
    expect(boardTest.arrayOfTiles[22].ship.timesHit).toEqual(1);
    expect(boardTest.arrayOfTiles[22].ship.isSunk).toBeFalsy();
    expect(boardTest.arrayOfTiles[22].isHit).toBeTruthy();

    expect(boardTest.receiveAttack(3, "c")).toBeFalsy();

    expect(boardTest.arrayOfTiles[32].isHit).toBeFalsy();
    expect(boardTest.arrayOfTiles[32].ship.timesHit).toEqual(1);
    expect(boardTest.receiveAttack(4, "c")).toBeTruthy();
    expect(boardTest.arrayOfTiles[32].ship.timesHit).toEqual(2);
    expect(boardTest.arrayOfTiles[32].ship.isSunk).toBeFalsy();
    expect(boardTest.arrayOfTiles[32].isHit).toBeTruthy();

    expect(boardTest.arrayOfTiles[42].isHit).toBeFalsy();
    expect(boardTest.arrayOfTiles[42].ship.timesHit).toEqual(2);
    expect(boardTest.receiveAttack(5, "c")).toBeTruthy();
    expect(boardTest.arrayOfTiles[42].ship.timesHit).toEqual(3);
    expect(boardTest.arrayOfTiles[42].ship.isSunk).toBeTruthy();
    expect(boardTest.arrayOfTiles[42].isHit).toBeTruthy();

    expect(boardTest.receiveAttack(0, "a")).toBeFalsy();
    expect(boardTest.receiveAttack(1, "a")).toBeTruthy();
    expect(boardTest.receiveAttack(1, "a")).toBeFalsy();
  });
});
