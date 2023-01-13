

function getRandomTriviaData() {
    let triviaData = [];
    const categoryCnt = 28163;
    // fetch 4 random trivia categories
    for(let i=0; i<4; i++){
        //gets random category id (categoryCnt is the total amount of categories available)
        let randomInt = Math.floor(Math.random() * (categoryCnt - 1) + 1);
        let categoryUrl = 'https://jservice.io/api/category?id=' + randomInt;
        fetch(categoryUrl)
        .then(function(response) {
            response.json()
        .then(function(data){
            let triviaObj = {
                category: data.title,
                questions: {}
            }
            let categoryQuestions = data.clues;
            // building question object with keys of the difficulty value
            for(let i=0; i<categoryQuestions.length; i++){
                triviaObj.questions[categoryQuestions[i].value] = categoryQuestions[i];
            }
            triviaData.push(triviaObj);
            })
        })
    }
    return triviaData;
}

