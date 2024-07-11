/**
 * Creates the HTML elements to generate the DOM
 */

const utilities = require("./utilities.js");
const logo = require("../assets/logo.svg");
const githubIcon = require("../assets/github.svg");
const welcomeImg = require("../assets/welcomeScreen.jpg");

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
  const addBtn = utilities.createBtnIconLabel(BUTTON_LABEL);

  navbar.appendChild(titleContainer);
  navbar.appendChild(addBtn);

  return navbar;
};

const generateMainContent = () => {
  /**
   * Generates the main div which contains the welcome screen and will
   * contain the gameboards
   */

  const container = document.createElement("div");
  container.id = "main_container";
  container.classList.add("mainContainer");

  // Fills the main container with a welcome screen
  const imgScreen = new Image();
  imgScreen.src = welcomeImg;
  container.appendChild(imgScreen);

  return container;
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
  form.appendChild(utilities.generateFieldsToSetUpPlayers(1));
  form.appendChild(utilities.generateFieldsToSetUpPlayers(2));

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

exports.generateNavigationBar = generateNavigationBar;
exports.generateMainContent = generateMainContent;
exports.generateFooter = generateFooter;
exports.generateNewGamePopup = generateNewGamePopup;
