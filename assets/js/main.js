const buttonEl = $("#startButton");
const highScoreEl = $("#highScore");
// const globalScores = getHighScores();

// add event listener to call the game.html
buttonEl.on("click", function () {
  window.location = "./game.html";
});



