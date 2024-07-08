/**
 * Creates the HTML elements to generate the DOM
 */
const logo = require("../assets/logo.svg");
const githubIcon = require("../assets/github.svg");

const generateNavigationBar = () => {
  /**
   * Creates the nav bar element and returns the HTML element
   */

  // Labels
  const BUTTON_LABEL = "New Game";
  const DEFAULT_TITLE = "TOP-Battleship";

  const navbar = document.createElement("nav");

  // DIV to keep together the main logo and the list title
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");

  const appLogo = new Image();
  appLogo.src = logo;
  appLogo.id = "appLogo";
  appLogo.classList.add("logo");
  titleContainer.appendChild(appLogo);

  const appName = document.createElement("h1");
  appName.classList.add("app-name");
  appName.textContent = DEFAULT_TITLE;
  titleContainer.appendChild(appName);

  // Add-new-task button
  const addBtn = createBtnIconLabel(BUTTON_LABEL);

  navbar.appendChild(titleContainer);
  navbar.appendChild(addBtn);

  return navbar;
};

const generateNewGamePopup = () => {
  /**
   * Generates the HTML container with the menu t set up a new Game
   */

  const POPUP_TITLE = "New Game";
  const BTN_LABEL_ACCEPT = "Start!";

  const popupForm = document.createElement("div");
  popupForm.id = "new_game_popup";
  popupForm.classList.add("popup-new-game");

  const form = document.createElement("form");
  form.classList.add("form-container");
  form.action = "javascript:void(0);";

  const title = document.createElement("h1");
  title.classList.add("popup-title");
  title.textContent = POPUP_TITLE;
  form.appendChild(title);

  // Fields
  form.appendChild(generateFieldsToSetUpPlayers(1));
  form.appendChild(generateFieldsToSetUpPlayers(2));

  // button
  const acceptButton = document.createElement("button");
  acceptButton.type = "submit";
  acceptButton.id = "accept_players";
  acceptButton.classList.add("btn-form");
  acceptButton.value = "Accept";
  acceptButton.textContent = "Continue";
  form.appendChild(acceptButton);

  popupForm.appendChild(form);

  return popupForm;
};

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
  labelPlayerName.textContent = "Player" + playerNumber + " name: ";
  container.appendChild(labelPlayerName);

  const inputPlayerName = document.createElement("input");
  inputPlayerName.type = "text";
  inputPlayerName.id = "player" + playerNumber + "_name";
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

const generateFooter = () => {
  /**
   * Creates the footer element and returns the HTML element
   */

  const GITHUB_USER = "nico9506";
  const GITHUB_REPO_URL = "https://github.com/nico9506/TOP-battleship";

  const footer = document.createElement("footer");

  // DIV to keep together the GitHub logo and the username
  const githubLink = document.createElement("a");
  githubLink.classList.add("github-contact-info");
  githubLink.href = GITHUB_REPO_URL;
  githubLink.target = "_blank";

  const logo = new Image();
  logo.src = githubIcon;
  logo.classList.add("footer-logo");
  githubLink.appendChild(logo);

  const githubUser = document.createElement("h1");
  githubUser.classList.add("github-user");
  githubUser.id = "githubUser";
  githubUser.textContent = GITHUB_USER;
  githubLink.appendChild(githubUser);

  footer.appendChild(githubLink);

  return footer;
};

const createBtnIconLabel = (label, icon_path = null) => {
  /**
   * Returns a created button element containing an Icon and a text label
   */

  // Add task button contains an Icon and a label
  const btn = document.createElement("button");
  btn.classList.add("btn-icon-label");
  btn.id = "btn-" + label.toLowerCase().replace(" ", "_");
  btn.textContent = label;

  if (icon_path !== null) {
    const icon = new Image();
    icon.src = icon_path;
    btn.appendChild(icon);
  }

  return btn;
};

exports.generateNavigationBar = generateNavigationBar;
exports.generateFooter = generateFooter;
exports.generateNewGamePopup = generateNewGamePopup;
