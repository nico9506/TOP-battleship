/**
 * Creates the HTML elements to generate the DOM
 */

// import iconMenu from "../assets/bars-solid.svg";
const iconMenu = require("../assets/bars-solid.svg");
const iconPlus = require("../assets/circle-plus-solid.svg");

const generateNavigationBar = () => {
  /**
   * Creates the nav bar element and returns the HTML element
   */

  // Labels
  const BUTTON_LABEL = "New task";
  const DEFAULT_TITLE = "TO-DO x Hacer!";

  const navbar = document.createElement("nav");

  // DIV to keep together the main logo and the list title
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");

  const menuIcon = new Image();
  menuIcon.src = iconMenu;
  menuIcon.id = "menuIcon";
  menuIcon.classList.add("logo");
  titleContainer.appendChild(menuIcon);

  const appName = document.createElement("h1");
  appName.classList.add("app-name");
  appName.textContent = DEFAULT_TITLE;
  titleContainer.appendChild(appName);

  // Add-new-task button
  const addBtn = createBtnIconLabel(BUTTON_LABEL, iconPlus);

  navbar.appendChild(titleContainer);
  navbar.appendChild(addBtn);

  return navbar;
};

const createBtnIconLabel = (label, icon_path) => {
  /**
   * Returns a created button element containing an Icon and a text label
   */

  // Add task button contains an Icon and a label
  const btn = document.createElement("button");
  btn.classList.add("btn-icon-label");
  btn.id = "btn-" + label.toLowerCase().replace(" ", "_");
  btn.textContent = label;

  const icon = new Image();
  icon.src = icon_path;
  btn.appendChild(icon);

  return btn;
};

exports.generateNavigationBar = generateNavigationBar;
exports.createBtnIconLabel = createBtnIconLabel;
