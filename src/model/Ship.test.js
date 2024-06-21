const Ship = require("./Ship.js");

describe("Ship class inner methods testing", () => {
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

  test("Create new instances of Ship", () => {
    expect(new Ship(1) instanceof Ship).toBeTruthy();
    // expect(new Ship(7) instanceof Ship).toThrow();
    // expect(new Ship(-1)).toThrow();
  });

  test("Hit ships 1 time", () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(3);
    const ship3 = new Ship(5);

    for (let i = 0; i < 1; i++) {
      ship1.hit();
      ship2.hit();
      ship3.hit();
    }

    expect(ship1.timesHit).toEqual(1);
    expect(ship1.isSunk).toBeTruthy();
    expect(ship2.timesHit).toEqual(1);
    expect(ship2.isSunk).toBeFalsy();
    expect(ship3.timesHit).toEqual(1);
    expect(ship3.isSunk).toBeFalsy();
  });

  test("Hit ships 2 times", () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(3);
    const ship3 = new Ship(5);

    for (let i = 0; i < 2; i++) {
      ship1.hit();
      ship2.hit();
      ship3.hit();
    }

    expect(ship1.timesHit).toEqual(1);
    expect(ship1.isSunk).toBeTruthy();
    expect(ship2.timesHit).toEqual(2);
    expect(ship2.isSunk).toBeFalsy();
    expect(ship3.timesHit).toEqual(2);
    expect(ship3.isSunk).toBeFalsy();
  });

  test("Hit ships 3 times", () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(3);
    const ship3 = new Ship(5);

    for (let i = 0; i < 3; i++) {
      ship1.hit();
      ship2.hit();
      ship3.hit();
    }

    expect(ship1.timesHit).toEqual(1);
    expect(ship1.isSunk).toBeTruthy();
    expect(ship2.timesHit).toEqual(3);
    expect(ship2.isSunk).toBeTruthy();
    expect(ship3.timesHit).toEqual(3);
    expect(ship3.isSunk).toBeFalsy();
  });

  test("Hit ships 7 time", () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(3);
    const ship3 = new Ship(5);

    for (let i = 0; i < 7; i++) {
      ship1.hit();
      ship2.hit();
      ship3.hit();
    }

    expect(ship1.timesHit).toEqual(1);
    expect(ship1.isSunk).toBeTruthy();
    expect(ship2.timesHit).toEqual(3);
    expect(ship2.isSunk).toBeTruthy();
    expect(ship3.timesHit).toEqual(5);
    expect(ship3.isSunk).toBeTruthy();
  });
});
