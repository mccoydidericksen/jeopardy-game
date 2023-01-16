const grid = $("#game-grid");
let score = 0;
let currentQuestion = {};
let currentPointValue = 0;
let currentBtn = null;
let hintsLeft = 5;
let currentHintsLeft = 0;
let questionHistory = {};
let questionCount = 0;
// function that gets stickers from giphy api
function getStickers(id,str){
    var giphyApiKey = "gt8q35GPIDL3tWEAEU2xhqNweAgcF7EZ"
var stickerUrl = "https://api.giphy.com/v1/gifs/search?q=" + str + "&api_key=" + giphyApiKey + "&rating=g,pg-13"
fetch(stickerUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
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
    for(let i=0; i<4; i++){
        //gets random category id (categoryCnt is the total amount of categories available)
        let randomInt = Math.floor(Math.random() * (categoryCnt - 1) + 1);
        let categoryUrl = 'https://jservice.io/api/category?id=' + randomInt;

        function getCategoryData(){
            let promise = fetch(categoryUrl)
                .then(function(response) {
                    return response.json()
                        .then(function (data) {
                            // checks if response data has at least 5 questions
                            if(data.clues_count > 4){
                                let questions = {}
                                let categoryQuestions = data.clues;
                                // building question object with keys of the difficulty value
                                for(let i=0; i<categoryQuestions.length; i++){
                                    questions[categoryQuestions[i].value] = categoryQuestions[i];
                                }
                                let triviaObj = {
                                    category: data.title,
                                    questions: Object.entries(questions).sort(function (a, b) {
                                        return a[0]-b[0]
                                    })
                                }
                            return triviaObj
                            } else {
                                // restarts api call with new categoryUrl
                                randomInt = Math.floor(Math.random() * (categoryCnt - 1) + 1);
                                categoryUrl = 'https://jservice.io/api/category?id=' + randomInt;
                                return getCategoryData()
                            }

                    })
                })
            return promise
        } 

        let promise = getCategoryData();
        triviaData.push(promise);
    }
    // returns multiple promises (from all api calls) as one promise
    return Promise.all(triviaData);
}

function displayHint(answer) {
  if (hintsLeft === 0){
    $("#modal-hint").text("no more hints");
    return;
  }
  if (currentHintsLeft === 0) {
    $("#modal-hint").text("only 2 hints per question");
    return;
  }
  let hint = "";
  let showList = [];
  let numShow = Math.floor(answer.length / 3);
  for (let i = 0; i < numShow; i++) {
    let rand = Math.floor(Math.random() * answer.length);
    if(showList.includes(rand)) {
      i--;
      continue;
    }
    showList.push(rand);
  }
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === " ") {
      hint += " ";
    }
    else if (answer[i] === "-"){
      hint += "-";
    } else {
      hint += "_";
    }
  }
  hint = hint.split("");
  answer = answer.split("");
  for (let i = 0; i < showList.length; i++) {
    hint[showList[i]] = answer[showList[i]];
  }
  $("#display-hint").text("hint: " + hint.join(""));
  hintsLeft--;
  currentHintsLeft--;
}

function checkAnswer(userAnswer){
  questionCount++;
  let decisionMessage = "";
  if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    score += currentPointValue;
    displayScore();
    currentBtn.attr("class", "bg-green-700 text-white p-10 px-20 m-4 rounded-md");
    decisionMessage = "✅";
  } else {
    score -= currentPointValue;
    displayScore();
    currentBtn.attr("class", "bg-red-700 text-white p-10 px-20 m-4 rounded-md");
    decisionMessage = "❌";
  }
  questionHistory[questionCount] = {question: currentQuestion.question, answer: currentQuestion.answer, userAnswer: userAnswer, "correct?": decisionMessage};
  console.log(questionHistory);
}

function displayScore() {
  $("#score").text(score);
}

function onQuestionClicked(categoryIndex, questionIndex, category, question, element) {
  currentBtn = $(element);
  if (currentBtn.attr("data-picked")) return;
  currentBtn.attr("data-picked", true);
  currentQuestion = question;
  currentPointValue = 100*(questionIndex + 1);
  console.log(question, categoryIndex, questionIndex, element);
  $("#modal-answer").val("");
  $("#display-hint").text("");
  $("#modal-question").text(question.question);
  $("#modal-category").text(category);
  $("#modal-points").text(100*(questionIndex + 1));
  $("#modal").attr("hidden", false);
  $("body").css("overflow", "hidden");
  $("#modal-hint").text("need a hint? (hints remaining: " + hintsLeft + ")");
  let hintBtn = $("#modal-hint");
  currentHintsLeft = 2;
  hintBtn.on("click", function () {
    displayHint(question.answer);
  });
}

$("#modal-submit").on("click", function (e) {
  e.preventDefault();
  let userAnswer = $("#modal-answer").val();
  checkAnswer(userAnswer);
  closeModal();
});

function closeModal() {
  $("body").attr("style","");
  $("#modal").attr("hidden", true);
}



getRandomTriviaData().then(function (categories) {
    for (let i = 0; i < categories.length; i++){
        getStickers("#img-" + (i + 1), encodeURIComponent(categories[i].category))
        let children = grid.children().eq(i);
        $("#desc-"+(i+1)).text(categories[i].category)
        let x = $("button[data-q=" + i + "]");
        x.each(function (index, element) {
            $(element).on("click", function (e) {
                onQuestionClicked(i,index,categories[i].category,categories[i].questions[index][1],element)
            });
        })
    }
})


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
