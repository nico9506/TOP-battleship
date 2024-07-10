const viewElements = require("./view/home.js");
const controllerListeners = require("./controller/listeners.js");
import "./style.css";

(function generateWebPage() {
  /**
   * Load the components to create and show the HTML elements
   */

  const body = document.body;

  // Nav bar
  body.appendChild(viewElements.generateNavigationBar());

  // Footer
  body.appendChild(viewElements.generateFooter());

  //Popup (new game)
  body.appendChild(viewElements.generateNewGamePopup());
})();

(function addAllEventListeners() {
  /**
   * Call the needed function to assing the required EventListeners
   */

  controllerListeners.assignEventListeners();
})();
