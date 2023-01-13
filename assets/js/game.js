// function that gets stickers from giphy api
function getStickers(str){
    var giphyApiKey = "gt8q35GPIDL3tWEAEU2xhqNweAgcF7EZ"
var stickerUrl = "https://api.giphy.com/v1/stickers/search?q=" + str + "&api_key=" + giphyApiKey
fetch(stickerUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // get sticker url from giphy stickers api
    var sticker= data.data[0].images.fixed_height_small.url;
    // add sticker to img tag
    $("img").attr("src", sticker);
  });
}

getStickers("cat")