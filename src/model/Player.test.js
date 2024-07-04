const { experiments } = require("webpack");
const Gameboard = require("./Gameboard.js");
const Player = require("./Player.js");

describe("Test inner methods of Player class", () => {
  test("Create instances of Players", () => {
    const human = new Player("Human", true);
    const pc = new Player("PC", false);

    expect(human.gameboard instanceof Gameboard).toBeTruthy();
    expect(pc.gameboard instanceof Gameboard).toBeTruthy();
    expect(human.isWinner).toBeFalsy();
    expect(pc.isWinner).toBeFalsy();

    human.setAsWinner();
    pc.setAsWinner();

    expect(human.isWinner).toBeTruthy();
    expect(pc.isWinner).toBeTruthy();

    expect(human.name).toBe("Human");
    expect(pc.name).toBe("PC");

    expect(human.isHumanPlayer).toBeTruthy();
    expect(pc.isHumanPlayer).toBeFalsy();
  });
});
