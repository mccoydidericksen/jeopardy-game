# Random Jeopardy Game

## Description

[Visit the Deployed Site](https://mccoydidericksen.github.io/jeopardy-game)

Welcome to our Random Jeopardy Game, a fun and interactive game that tests your knowledge on a variety of topics. 
What makes this Jeopardy different from existing apps is that it has no advertisements, it has global high score board, it is simple and has a clean design. It is free to play, has completely random categories & questions and has unique game board on each refresh. Have fun!

![Web Page gif](/assets/images/Jeopardy%20game.gif)


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

## Table of Contents

- [User story related to Third-Party JSONBin API](user-story-related-to-third-party-jsonbin-api)
- [User story related to Third-Party Jservice API](#user-story-related-to-third-party-jservice-api)
- [CSS framework - Tailwind CSS](#css-framework-tailwind-css)
- [JavaScript Library - Canvas Confetti](javascript-library-canvas-confetti)
- [Features](#features)
- [How to play](#how-to-play)
- [Learning Points](#learning-points)
- [Author Info](#author-info)
- [License](#license)

## User story related to Third-Party JSONBin API

[JSONBin API Link](https://jsonbin.io/api-reference)

As a jeopardy connoisseur, 
I want To submit my score globally at the end of the game,
So That I can compare myself to other players around the world.

We fetched a list of previous high scores globally and added current username and score using JSONBin API as shown below:
```js
function getHighScores() {
	return $.ajax(getSettings).then(function (response) {
		var records = response.record;

		if (!Array.isArray(records)) {
			// the data we got is malformed so we will assume its an empty array
			records = [];
		}

		for (let i = 0; i < records.length; i++) {
			if (typeof records[i].name !== "string" || typeof records[i].score !== "number") {
				// if any records are non complient delete them;
				records.splice(i, 1);
				i--;
			}
		}
		return records;
	});
}
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

![High Score page gif](/assets/images/HighScore.gif)

## User story related to Third-Party Jservice API

[Jservice API Link](https://jservice.io/)

As a jeopardy connoisseur, 
I want To play a random questions from different random categories as the page reload,
So That I can have a more unpredictable and exciting gameplay experience.

```js
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
```

![Trivia Questions gif](/assets/images/Trivia%20questions.gif)

## CSS framework - Tailwind CSS

[Tailwindcss Link](https://tailwindcss.com/docs/installation/play-cdn)

Tailwind CSS is a utility-first CSS framework. It is a set of CSS classes that can be used to apply styles to HTML elements. Tailwind also provides a set of responsive design classes that can be used to create responsive and mobile layouts. Tailwind is relatively easy to get started with, and it is highly customizable and it can be integrated with any JavaScript framework or libraries.

```js
tailwind.config = {
	theme: {
	  extend: {
		  screens: {
			  'sm': '500px',
			  'md': '870px'
		  }
	  }
	}
}
```

![responsive layouts gif](/assets/images/responsive%20layouts.gif)

## JavaScript Library - Canvas Confetti

[Canvas-confetti link](https://www.kirilv.com/canvas-confetti/)

canvas-confetti is a JavaScript library that allows you to use confetti animation to your web page to celebrate when a correct answer is submitted

```js
function checkAnswer(userAnswer){
  let decisionMessage = "";
  let processedAnswer = userAnswer.toLowerCase().replace(/\(.+?\)/g, "").replace(/[^a-z0-9\s]/gi, "")
  if (processedAnswer === currentQuestion.answer) {
    confetti();
  }
}
```
![confetti animation gif](/assets/images/confetti.gif)

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
- If the player answers correctly, the dollar amount for that question is added to their score, and a confetti animation celebrating the win is displayed to the webpage.
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