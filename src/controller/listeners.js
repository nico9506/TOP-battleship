/**
 * Collection of methods to add functionality to the HTML Elements
 */

const Controller = require("./Controller.js");
const viewUtilities = require("../view/utilities.js");

const assignEventListeners = () => {
  /**
   * Add the eventListener to all needed HTML Elements
   */

  // TOGGLE: New game popup
  const newGamePopup = document.getElementById("btn_new_game");
  newGamePopup.addEventListener("click", evLToggleNewGamePopup);

  // CONTINUE New game popup
  const continueNewGamePopup = document.getElementById("accept_players");
  continueNewGamePopup.addEventListener("click", evLStartGameSetUp);
};

const evLToggleNewGamePopup = () => {
  // CSS class to change the display parameter
  document.getElementById("new_game_popup").classList.toggle("popup-unhidden");

  // Cleans the form fields
  document.getElementById("player_1_name").value = "";
  document.getElementById("player_1_type").checked = true;
  document.getElementById("player_2_name").value = "";
  document.getElementById("player_2_type").checked = false;
};

const evLStartGameSetUp = () => {
  /**
   * Action triggered after clicking "continue" in the new game popup
   */

  const player1Name = document.getElementById("player_1_name").value;
  const player1Type = document.getElementById("player_1_type").checked;

  const player2Name = document.getElementById("player_2_name").value;
  const player2Type = document.getElementById("player_2_type").checked;

  // Launch a new game instance
  Controller.gameInstance.restartInstance(
    player1Name == "" ? "Player 1" : player1Name,
    player1Type,
    player2Name == "" ? "Player 2" : player2Name,
    player2Type,
  );

  //fill up computer players gameboard randomly
  if (!player1Type) Controller.gameInstance.player1.generateRandomBoard();
  if (!player2Type) Controller.gameInstance.player2.generateRandomBoard();

  // asign the initial current player
  // Human players have to fill up their boards
  if (player1Type) {
    Controller.gameInstance.currentPlayer = Controller.gameInstance.player1;
    Controller.gameInstance.currentOpponent = Controller.gameInstance.player2;
  } else if (player2Type) {
    Controller.gameInstance.currentPlayer = Controller.gameInstance.player2;
    Controller.gameInstance.currentOpponent = Controller.gameInstance.player1;
  } else {
    Controller.gameInstance.nextTurn();
  }

  // Close the popup
  evLToggleNewGamePopup();

  cleanUIAndGenerateBoardToPlaceShips();
};

const cleanUIAndGenerateBoardToPlaceShips = () => {
  // Clean main screen
  const mainContainer = document.getElementById("main_container");
  mainContainer.innerHTML = "";

  if (Controller.gameInstance.currentPlayer.isHumanPlayer) {
    mainContainer.appendChild(
      viewUtilities.generateBoardToSetUpShips(
        Controller.gameInstance.currentPlayer,
      ),
    );
  } else {
    console.error(
      `Current player is not human - (isHuman: ${Controller.gameInstance.currentPlayer.isHumanPlayer})`,
    );

    alert(
      "At least one player must be Human. Click on 'New Game' button to set up a new game.",
    );
  }
};

const cleanUIAndGenerateBoardToPlay = () => {
  const mainContainer = document.getElementById("main_container");

  if (Controller.gameInstance.checkGameOver()) {
    console.log(
      `PLAYER 1: ${Controller.gameInstance.player1.isWinner ? "WINNER" : "LOSER"}`,
    );
    console.log(
      `PLAYER 2: ${Controller.gameInstance.player2.isWinner ? "WINNER" : "LOSER"}`,
    );

    // creates and replaces with a copy a specific element. USed to clean EventListeners
    const cleanCopy = mainContainer.cloneNode(true);
    mainContainer.parentNode.replaceChild(cleanCopy, mainContainer);

    const winner = Controller.gameInstance.player1.isWinner
      ? Controller.gameInstance.player1.name
      : Controller.gameInstance.player2.name;
    const banner = document.createElement("h1");
    banner.innerText = `${winner} wins!`;
    banner.classList.add("winner-banner");
    cleanCopy.appendChild(banner);

    return;
  }

  // Clean main screen
  mainContainer.innerHTML = "";

  if (Controller.gameInstance.currentPlayer.isHumanPlayer) {
    mainContainer.appendChild(
      viewUtilities.generateHumanPlayerGameView(
        Controller.gameInstance.currentPlayer,
        Controller.gameInstance.currentOpponent,
      ),
    );
  } else {
    console.error(
      `Current player is not human - (isHuman: ${Controller.gameInstance.currentPlayer.isHumanPlayer})`,
    );
  }
};

const evLActivateTileToPlaceShip = (e) => {
  // Activate tiles to be clicked and assign ships (used to set up boards)

  const tileIndex = e.target.getAttribute("index");

  const boardContainer = document.getElementsByClassName("boardContainer");

  const shipToPlace =
    Controller.gameInstance.currentPlayer.shiftShipFromListToPlace();

  if (
    shipToPlace === null &&
    (Controller.gameInstance.currentPlayer ===
      Controller.gameInstance.player2 ||
      !Controller.gameInstance.currentOpponent.isHumanPlayer)
  ) {
    console.log("Boards configured.");
    console.log("Launch game flow");

    Controller.gameInstance.setInitialTurn();

    document
      .getElementById("main_container")
      .appendChild(
        viewUtilities.generateHumanPlayerGameView(
          Controller.gameInstance.currentPlayer,
          Controller.gameInstance.currentOpponent,
        ),
      );

    return;
  }

  if (shipToPlace === null) {
    console.log(`No more ships to place`);

    Controller.gameInstance.nextTurn();
    cleanUIAndGenerateBoardToPlaceShips();

    return;
  }

  let result =
    Controller.gameInstance.currentPlayer.gameboard.placeShipInGameboard(
      shipToPlace,
      1,
      "a",
      tileIndex,
    );

  if (!result) {
    Controller.gameInstance.currentPlayer.shipsToPlace.unshift(shipToPlace);
    console.log(
      `Placement not allowed at index ${tileIndex} for ship size ${shipToPlace.size}`,
    );
    return;
  }

  boardContainer.innerHTML = "";

  // Clean main screen
  const mainContainer = document.getElementById("main_container");
  mainContainer.innerHTML = "";

  mainContainer.appendChild(
    viewUtilities.generateBoardToSetUpShips(
      Controller.gameInstance.currentPlayer,
    ),
  );
};

const evLActivateTileToReceiveAttack = (e) => {
  const index = e.target.getAttribute("index");

  const { tileHit, shipHit } =
    Controller.gameInstance.currentOpponent.gameboard.receiveAttackAtIndex(
      index,
    );

  if (shipHit) {
    Controller.gameInstance.currentPlayer.increaseCounterOfShipsSunk();
    console.log(
      `Ship hit: counter increased to ${Controller.gameInstance.currentPlayer.tilesWithShipsSunk}`,
    );

    cleanUIAndGenerateBoardToPlay();
    return;
  }

  if (tileHit) {
    console.log("Tile hit");
    if (!Controller.gameInstance.currentOpponent.isHumanPlayer) {
      const nextMov =
        Controller.gameInstance.currentOpponent.makeRandomMovement(
          Controller.gameInstance.currentPlayer.gameboard,
        );
      console.log(`Opponent random attack: ${nextMov}`);
      console.log(
        `Oppenent's sunk counter: ${Controller.gameInstance.currentOpponent.tilesWithShipsSunk}`,
      );
    }

    cleanUIAndGenerateBoardToPlay();
    return;
  }

  console.log("No tile hit");
  return;
};

exports.assignEventListeners = assignEventListeners;
exports.evLActivateTileToPlaceShip = evLActivateTileToPlaceShip;
exports.evLActivateTileToReceiveAttack = evLActivateTileToReceiveAttack;
