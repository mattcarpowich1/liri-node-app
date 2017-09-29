const fetch_data = require('./fetch_data.js');
const fs = require('fs');

const getMyTweets = fetch_data.getMyTweets;
const getSongInfo = fetch_data.getSongInfo;
const getMovieInfo = fetch_data.getMovieInfo;

// depending on the input, do the right thing
let handleInput = function(args) {
  switch(args[0]) {
  	case "my-tweets": 
  		getMyTweets();
  		break;
    case "spotify-this-song":
      if (args[1]) {
        let song_input = args.slice(1, args.length);
        let song = song_input.join(" ");
        getSongInfo(song);
      } else {
        console.log("Please enter a song name");
      }
      break;
    case "movie-this":
      let movie;
      if (args[1]) {
        let movie_input = args.slice(1, args.length);
        movie = movie_input.join(" ");
      } else {
        movie = "Mr. Nobody";
      }
      getMovieInfo(movie);
      break;
    case "do-what-it-says":
      fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          console.log("Error: " + err.message);
        } else {
          let data_input = data.split(",");
          return handleInput(data_input);
        }
      });
      break;
    default: 
      console.log("Please enter a valid command!");
  }

};

handleInput((process.argv.slice(2, process.argv.length)));

