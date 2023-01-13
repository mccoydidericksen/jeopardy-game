

function getTriviaData() {
    const categoryUrl = 'https://jservice.io/api/random'
    let triviaData = [];
    for(let i=0; i<4; i++){
        fetch(categoryUrl)
        .then(function(response) {
            response.json()
        .then(function(data){
            console.log(data);

            })
        })
    }

}

getTriviaData();