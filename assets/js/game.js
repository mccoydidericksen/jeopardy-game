
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
        let promise = fetch(categoryUrl)
        .then(function(response) {
            return response.json()
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
            return triviaObj
            })
        })
        triviaData.push(promise);
    }
    // returns multiple promises (from all api calls) as one promise
    return Promise.all(triviaData);
}

// example of calling function
// var triviaData = getRandomTriviaData().then(console.log);
// console.log(triviaData);

