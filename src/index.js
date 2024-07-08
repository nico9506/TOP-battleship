const viewElements = require("./view/home.js");
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
