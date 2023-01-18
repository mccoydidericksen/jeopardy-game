# Random Jeopardy Game

## Technology Used

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| HTML    | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | 
| CSS     | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)      |   
| Git | [https://git-scm.com/](https://git-scm.com/)     |   
| JavaScript   | [https://developer.mozilla.org/en-US/docs/Learn/JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)      |
| jQuery API   | [https://api.jquery.com/](https://api.jquery.com/)  |
| canvas-confetti    |  [https://cdn.jsdelivr.net/npm/canvas-confetti](https://cdn.jsdelivr.net/npm/canvas-confetti)[https://www.kirilv.com/canvas-confetti/](https://www.kirilv.com/canvas-confetti/)   |
| Jservice API  |  [https://jservice.io/](https://jservice.io/)    |
| JSONBin     |  [https://jsonbin.io/](https://jsonbin.io/)      |
| Giphy API   |  [https://developers.giphy.com/docs/api/](https://developers.giphy.com/docs/api/)      |

## Description
[Visit the Deployed Site](https://mccoydidericksen.github.io/jeopardy-game)

Welcome to Random Jeopardy Game, a fun and interactive game that tests your knowledge on a variety of topics.

![Web Page gif](/assets/images/Jeopardy%20game.gif)

## Table of Contents

- [Code Example](#code-example)
- [Features](#features)
- [How to play](#how-to-play)
- [Learning Points](#learning-points)
- [Author Info](#author-info)
- [License](#license)

## Code Example

This function checks if the answer submitted is correct or incorrect and it will change its background color and display confetti animation accordingly.
```js
function checkAnswer(userAnswer){
  let decisionMessage = "";
  let processedAnswer = userAnswer.toLowerCase().replace(/\(.+?\)/g, "").replace(/[^a-z0-9\s]/gi, "")
  if (processedAnswer === currentQuestion.answer) {
    confetti();
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
  if(questionCount === 20) {
    endGame();
  }
}
```
This function displays high scores list to the home page after comparing global scores.
```js
function putHighScore(username, score) {

	// fetch a list of high scores
	return getHighScores().then(function (records) {
		
		// add our score to the list
		records.push({
			name: username,
			score:score
		})

		// sort the list so its highest score first
		records.sort(function (a, b) {
			return b.score - a.score
		})

		// remove anything thats not top 10
		records.splice(10, records.length - 10);

		// re upload the new high scores list
		return $.ajax(getPutSettings(JSON.stringify(records)))
	});
}
```

## Features

- The game contains 4 random categories with 5 random questions each.
- Each category contains questions with varying difficulty and dollar amount.
- A modal that shows question, answer input field, hint and submit buttons.
- A game score card that displays current user score.
- A game over modal that shows the game final score, player name input field, submit score and back to menu buttons.
- User friendly and unique game board on each refresh.

## How to play

- When the web page open, you will be presented with a landing page with a start button that will take you to the game board.
- the game board consists of a board with categories and dollar amounts (from 100 to 500 for each category).
- players take turns selecting a category and dollar amount to read and answer a question.
- If the player answers correctly, the dollar amount for that question is added to their score, and a confetti animation for celebrating the win is displayed to the webpage.
- If the player answers incorrectly, that amount is deducted from their score.
- The game ends when all questions have been answered.
- The player with the most money which represents score at the end of the game wins.

## Learning Points

- Integration of data from multiple server-side API requests to execute our Jeopardy game.
- Implementation of Agile development methodologies to work collaboratively.
- Implementation of feature and bug fixes using Git branch workflow and pull requests.
- Wrting user stories from scratch in GitHub Issues and link them with GitHub Project to track the status of each task.

## Author Info

```md
* [Github](https://github.com/Isglad)
* [Github](https://github.com/mccoydidericksen)
* [Github](https://github.com/IanSSenne)
```

## License

MIT License

Copyright (c) 2022 Isglad, mccoydidericksen, IanSSenne

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.