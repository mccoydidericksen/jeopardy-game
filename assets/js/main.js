const buttonEl = $("#startButton");
const globalScoreEl = $("#globalScore");
const localScoreEl = $("#localScore");
const globalTableEl = $("#globalTable");
const localTableEl = $("#localTable");
const localScores = localStorage.getItem("totalScoreStringify");
const globalScores = getHighScores();

// add event listener to call the game.html
buttonEl.on("click", function () {
  window.location = "./game.html";
});

if(globalScores){
  globalScores.then(function (records) {
    // display the top 10 global scores
    for (let i = 0; i < records.length && i < 10; i++) {
      globalTableEl.append(
        `<tr class="border-t hover:bg-gray-400">
          <td class="text-left px-4 py-2">${i+1}</td>
          <td class="text-left px-4 py-2">${records[i].name}</td>
          <td class="text-left px-4 py-2">${records[i].score}</td>
        </tr>`
      );
  }
  });
} else {
  // if there are no high scores display a message
  globalScoreEl.text("No high scores yet");
}

if(localScores){
  let records = JSON.parse(localScores)["score"];
  // sort the scores in descending order
  records.sort(function (a, b) {return b-a;});
  // display the top 10 local scores
  for (let i = 0; i < records.length && i < 10; i++) {
    localTableEl.append(
      `<tr class="border-t hover:bg-gray-400">
        <td class="text-left px-4 py-2">${i+1}</td>
        <td class="text-left px-4 py-2">${records[i]}</td>
      </tr>`
    );
  }
} else {
  localScoreEl.text("No high scores yet");
}

