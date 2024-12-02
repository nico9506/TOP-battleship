/**
 * Collection of functions to assist the HTML Elements creation
 */

const {
  evLActivateTileToPlaceShip,
  evLActivateTileToReceiveAttack,
} = require("../controller/listeners");

const generateFieldsToSetUpPlayers = (playerNumber) => {
  /**
   * Generates the form fields (name and type) for setting up players
   * @param {number} playerNumber - to create strings for Player 1 and Player 2
   * @returns {HTMLDivElement}
   */

  const container = document.createElement("div");
  container.classList.add("player-fields");

  // Player Name
  const labelPlayerName = document.createElement("label");
  labelPlayerName.setAttribute("for", "player" + playerNumber + "Name");
  labelPlayerName.textContent = "Player " + playerNumber;
  container.appendChild(labelPlayerName);

  const inputPlayerName = document.createElement("input");
  inputPlayerName.type = "text";
  inputPlayerName.id = "player_" + playerNumber + "_name";
  inputPlayerName.placeholder = "Player name";
  inputPlayerName.name = "player" + playerNumber + "Name";
  inputPlayerName.required;
  container.appendChild(inputPlayerName);

  // Type (Human or PC)
  const inputPlayerType = document.createElement("input");
  inputPlayerType.type = "checkbox";
  inputPlayerType.id = "player_" + playerNumber + "_type";
  inputPlayerType.value = true;
  inputPlayerType.name = "player" + playerNumber + "Type";
  container.appendChild(inputPlayerType);

  const labelPlayerType = document.createElement("label");
  labelPlayerType.setAttribute("for", "player" + playerNumber + "Type");
  labelPlayerType.textContent = "Human";
  container.appendChild(labelPlayerType);

  return container;
};

const createBtnIconLabel = (label, icon_path = null) => {
  /**
   * Returns a created button element containing an Icon and a text label
   */

  // Add task button contains an Icon and a label
  const btn = document.createElement("button");
  btn.classList.add("btn-icon-label");
  btn.id = "btn_" + label.toLowerCase().replace(" ", "_");
  btn.textContent = label;

  if (icon_path !== null) {
    const icon = new Image();
    icon.src = icon_path;
    btn.appendChild(icon);
  }

  return btn;
};

const generateCurrentPlayerLabel = (playerName) => {
  const container = document.createElement("div");
  container.classList.add("current-player");
  container.innerText = playerName;

  return container;
};

const generateBoardToSetUpShips = (player) => {
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("boardContainer");

  for (let i = 0; i < player.gameboard.arrayOfTiles.length; i++) {
    const newTile = document.createElement("div");
    newTile.classList.add("tile");
    newTile.setAttribute("index", i);

    if (player.gameboard.arrayOfTiles[i].ship !== null) {
      newTile.classList.add("ship");
    } else {
      newTile.addEventListener("click", evLActivateTileToPlaceShip);
    }

    boardContainer.appendChild(newTile);
  }

  // Adds the current-player name
  document
    .getElementById("main_container")
    .appendChild(generateCurrentPlayerLabel(player.name));

  // Adds switch to place ships in v or h position
  document.getElementById("main_container").appendChild(generateToggleSwitch());

  return boardContainer;
};

const generateToggleSwitch = () => {
  const container = document.createElement("div");
  container.classList.add("slider-box");

  const leftLabel = document.createElement("h4");
  leftLabel.innerText = "Horizontal";

  const rightLabel = document.createElement("h4");
  rightLabel.innerText = "Vertical";

  const label = document.createElement("label");
  label.classList.add("switch");

  const inputCheckbox = document.createElement("input");
  inputCheckbox.id = "v_h_slider";
  inputCheckbox.type = "checkbox";
  inputCheckbox.checked = true;
  label.appendChild(inputCheckbox);

  const spanSlider = document.createElement("span");
  spanSlider.classList.add("slider");
  label.appendChild(spanSlider);

  container.appendChild(leftLabel);
  container.appendChild(label);
  container.appendChild(rightLabel);

  return container;
};

const generateHumanPlayerGameView = (player, opponent) => {
  /**
   * Returns the required HTML Elements to display the current player board
   * and the opponents board to mark attacks.
   */

  const mainContainer = document.getElementById("main_container");
  mainContainer.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("gameplay-human-view");

  // Board to display current-playey ships (including destroyed units)
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("boardContainer");

  for (let i = 0; i < player.gameboard.arrayOfTiles.length; i++) {
    const newTile = document.createElement("div");
    newTile.classList.add("tile");
    newTile.setAttribute("index", i);

    if (player.gameboard.arrayOfTiles[i].ship !== null) {
      newTile.classList.add("ship");
    }

    if (player.gameboard.arrayOfTiles[i].isHit) {
      newTile.classList.add("destroyed-ship");
    }

    boardContainer.appendChild(newTile);
  }

  // Board to display current-playey attacks
  const attacksBoardContainer = document.createElement("div");
  attacksBoardContainer.classList.add("attacksBoardContainer");

  for (let i = 0; i < player.gameboard.arrayOfTiles.length; i++) {
    const newTile = document.createElement("div");
    newTile.classList.add("tile");
    newTile.setAttribute("index", i);

    if (opponent.gameboard.arrayOfTiles[i].isHit)
      newTile.classList.add("tile-hit");

    if (
      opponent.gameboard.arrayOfTiles[i].ship !== null &&
      opponent.gameboard.arrayOfTiles[i].isHit
    ) {
      newTile.classList.add("ship-hit");
    } else {
      newTile.addEventListener("click", (e) => {
        evLActivateTileToReceiveAttack(e);
      });
    }

    attacksBoardContainer.appendChild(newTile);
  }

  // Adds the current-player name
  mainContainer.appendChild(generateCurrentPlayerLabel(player.name));

  container.appendChild(boardContainer);
  container.appendChild(attacksBoardContainer);

  return container;
};

exports.generateFieldsToSetUpPlayers = generateFieldsToSetUpPlayers;
exports.createBtnIconLabel = createBtnIconLabel;
exports.generateBoardToSetUpShips = generateBoardToSetUpShips;
exports.generateHumanPlayerGameView = generateHumanPlayerGameView;
