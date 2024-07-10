/**
 * Collection of functions to assist the HTML Elements creation
 */

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

exports.generateFieldsToSetUpPlayers = generateFieldsToSetUpPlayers;
exports.createBtnIconLabel = createBtnIconLabel;
