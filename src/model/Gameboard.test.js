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

  test("Assign ships to Gameboard", () => {
    const boardTest = new Gameboard();
    const shipTest1 = new Ship(1);
    const shipTest2 = new Ship(2);
    const shipTest3 = new Ship(3);
    const shipTest4 = new Ship(4);
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
});
