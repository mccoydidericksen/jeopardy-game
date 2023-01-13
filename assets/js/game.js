

function getTriviaData() {
    let triviaData = [];
    for(let i=0; i<4; i++){
        const categoryCnt = 6000; 
        let randomInt = Math.floor(Math.random() * (categoryCnt - 1) + 1);
        let categoryUrl = 'https://jservice.io/api/category?id=' + randomInt;
        fetch(categoryUrl)
        .then(function(response) {
            response.json()
        .then(function(data){
            console.log(data);
            let triviaObj = {
                category: data.title
            }
            // let categoryQuestions = category.clues;
            // categoryQuestions.sort(function (a, b) {
            //     return b.score - a.score
            })
            })
        })
    }

}

getTriviaData();