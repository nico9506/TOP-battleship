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
exports.createBtnIconLabel = createBtnIconLabel;
exports.generateFooter = generateFooter;
