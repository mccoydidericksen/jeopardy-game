const grid = $("#game-grid");
// function that gets stickers from giphy api
function getStickers(id, str) {
  var giphyApiKey = "gt8q35GPIDL3tWEAEU2xhqNweAgcF7EZ";
  var stickerUrl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    str +
    "&api_key=" +
    giphyApiKey +
    "&rating=g,pg-13";
  fetch(stickerUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // get sticker url from giphy stickers api
      if (data.data.length > 0) {
        var sticker = data.data[0].images.fixed_height_small.url;
        // add sticker to img tag
        $(id).attr("src", sticker);
      } else {
        $(id).attr("src", "placeholder-url fro no gif found");
      }
    });
}

//returns array of objects with 4 random trivia categories
//each object in the array stores the category title and associated questions object
function getRandomTriviaData() {
  let triviaData = [];
  const categoryCnt = 28163;
  // fetch 4 random trivia categories
  for (let i = 0; i < 4; i++) {
    //gets random category id (categoryCnt is the total amount of categories available)
    let randomInt = Math.floor(Math.random() * (categoryCnt - 1) + 1);
    let categoryUrl = "https://jservice.io/api/category?id=" + randomInt;
    let promise = fetch(categoryUrl).then(function (response) {
      return response.json().then(function (data) {
        let questions = {};
        let categoryQuestions = data.clues;
        // building question object with keys of the difficulty value
        for (let i = 0; i < categoryQuestions.length; i++) {
          questions[categoryQuestions[i].value] = categoryQuestions[i];
        }
        let triviaObj = {
          category: data.title,
          questions: Object.entries(questions).sort(function (a, b) {
            return a[0] - b[0];
          }),
        };
        return triviaObj;
      });
    });
    triviaData.push(promise);
  }
  // returns multiple promises (from all api calls) as one promise
  return Promise.all(triviaData);
}

// example of calling function
// var triviaData = getRandomTriviaData().then(console.log);
// console.log(triviaData);
function onQuestionClicked(categoryIndex, questionIndex, question, element) {
  let btn = $(element);
  if (btn.attr("data-picked")) return;
  btn.attr("class", "bg-gray-700 text-white p-10 px-20 m-4 rounded-md");
  btn.attr("data-picked", true);
  console.log(question, categoryIndex, questionIndex, element);
  // TODO: modal stuff here
}

getRandomTriviaData().then(function (questions) {
  for (let i = 0; i < questions.length; i++) {
    getStickers("#img-" + (i + 1), encodeURIComponent(questions[i].category));
    let children = grid.children().eq(i);
    children.children("p").text(questions[i].category);
    children.children("button").each(function (index, element) {
      $(element).on("click", function (e) {
        onQuestionClicked(i, index, questions[i].questions[index][1], element);
      });
    });
  }
});


function addScoreToLocalStorage(endScore) {
    // if localStorage has some score, push the new score
  if (localStorage.getItem("totalScoreStringify")) {
    let totalScore = JSON.parse(localStorage.getItem("totalScoreStringify"));
    totalScore["score"].push(endScore);
    localStorage.setItem("totalScoreStringify", JSON.stringify(totalScore));
  }
    // if no score in localStorage, create totalScore object with score property and add new score    
  else {
    let totalScore = {
      score: [endScore],
    };
    localStorage.setItem("totalScoreStringify", JSON.stringify(totalScore));
  }
}
