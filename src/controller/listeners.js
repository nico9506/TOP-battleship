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
  const newController = new Controller(
    player1Name,
    player1Type,
    player2Name,
    player2Type,
  );

  // Close the popup
  evLToggleNewGamePopup();

  // Clean main screen
  const mainContainer = document.getElementById("main_container");
  mainContainer.innerHTML = "";

  mainContainer.appendChild(
    viewUtilities.generateBoardToSetUpShips(newController.player1),
  );
};

const evLActivateTileToPlaceShip = (e) => {
  // Activate tiles to be clicked and assign ships (used to set up boards)

  const tileIndex = e.target.getAttribute("index");

  /**
   *
   *
   * Double check global instance of Controller
   *
   * How to access the players ???
   *
   *
   *
   */
};

exports.assignEventListeners = assignEventListeners;
exports.evLActivateTileToPlaceShip = evLActivateTileToPlaceShip;
