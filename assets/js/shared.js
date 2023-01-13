var accessKey = "$2b$10$BHy89/CS.uMnQ28sL81y3eVz1aDA8zOTut5P25BkeZXQ49UArOIDu";

var getSettings = {
	url: "https://api.jsonbin.io/v3/b/63bf22d215ab31599e33e835",
	method: "GET",
	timeout: 0,
	headers: {
		"Content-Type": "application/json",
		"X-Access-Key": accessKey
	},
};

function getPutSettings(data) {
	return {
		url: "https://api.jsonbin.io/v3/b/63bf22d215ab31599e33e835",
		method: "PUT",
		timeout: 0,
		headers: {
			"Content-Type": "application/json",
			"X-Access-Key": accessKey
		},
		data:data
	};
}

function getHighScores() {
	return $.ajax(getSettings).then(function (response) {
		var records = response.record;

		if (!Array.isArray(records)) {
			// the data we got is malformed so we will assume its an empty array
			records = [];
		}

		for (let i = 0; i < records.length; i++) {
			if (typeof records[i].name !== "string" && typeof records[i].score !== "number") {
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
