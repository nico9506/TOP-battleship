/**
 * Collection of methods to add functionality to the HTML Elements
 */

const assignEventListeners = () => {
  /**
   * Add the eventListener to all needed HTML Elements
   */

  // TOGGLE: New game popup
  const newGamePopup = document.getElementById("btn_new_game");
  newGamePopup.addEventListener("click", evLToggleNewGamePopup);
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

exports.assignEventListeners = assignEventListeners;
