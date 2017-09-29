const request = require('request');
const spotify = require('node-spotify-api');
const twitter = require('twitter');
const keys = require('./keys.js')

const twitterKeys = keys.twitter;
const spotifyKeys = keys.spotify;

// Outputs my last 20 tweets 
// and when they were created
function getMyTweets() {

	let client = new twitter({
	  consumer_key: twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.access_token_secret
	});
	 
	let params = {screen_name: 'mattlovessynths'};

	// console.log last 20 tweets and their creation date
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    let i = 0;
	    console.log("Recent tweets from " + params.screen_name + ".");
	    while(tweets[i]) {
        // stop if 20th tweet is reached
	    	if (i === 20) { break; }
	    	console.log("--------------------------------------------");
	    	console.log(tweets[i].text);
	    	console.log("Date: " + tweets[i].created_at);
	    	i++;
	    }
	    console.log("--------------------------------------------");
	  }
	});
}

// Outputs the following info for a given song
// 1. Artist
// 2. Song name
// 3. A preview link of the song from Spotify
// 4. The album the song is from
function getSongInfo(song) {
 
  let spotify_client = new spotify({
    id: spotifyKeys.client_id,
    secret: spotifyKeys.client_secret
  });
   
  spotify_client.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    }
   
    let result = data.tracks.items[0]; 

    console.log("--------------------------------------------");
    
    if (!result) {
      console.log("No results returned for that song.");
      return false;
    } else {

      // artist name
      let artist = result.artists[0].name;
      if (!artist) {
        artist = "No artist data found";
      }
      console.log("Artist: " + artist);

      // song name
      let song_name = result.name;
      console.log("Song name: " + song_name);

      // preview url
      let preview_link = result.preview_url;
      if (!preview_link) {
        preview_link = "No preview found";
      }
      console.log("Preview: " + preview_link);

      //album name
      let album = result.album.name;
      if (!album) {
        album = "No album data found"
      }
      console.log("Album: " + album);

      console.log("--------------------------------------------");

    }

  });

}


// Outputs the following information to the terminal:
// * Title of the movie
// * Year the movie came out
// * IMDB rating of the movie
// * Rotten Tomatoes rating of the movie
// * Country where the movie was produced
// * Language of the movie
// * Plot of the movie
// * Actors in the movie
function getMovieInfo(title) {
  request('http://www.omdbapi.com/?apikey=40e9cece&t=' + title, function (error, response, body) {
    if (error) {
      console.log("Error: " + error.message);
    } else {
      body = JSON.parse(body);

      // Save movie data in object
      let movie_data = {
        "Title": body.Title,
        "Year": body.Year,
        "IMDB Rating": body.Ratings[0].Value,
        "Rotten Tomatoes Rating": body.Ratings[1].Value,
        "Country": body.Country,
        "Language": body.Language,
        "Plot": body.Plot,
        "Actors": body.Actors
      };

      console.log("Movie information for : " + movie_data["Title"]);
      console.log("--------------------------------------------");

      for (property in movie_data) {
        console.log(property + ": " + movie_data[property]);
      }

      console.log("--------------------------------------------");

    }

  });
}

module.exports = {
	getMyTweets: getMyTweets,
	getSongInfo: getSongInfo,
	getMovieInfo: getMovieInfo
};