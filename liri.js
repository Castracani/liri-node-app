require("dotenv").config();

const request = require("request");
const fs = require("fs");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");

const keys = require("./keys");

const spotify = new Spotify(keys.spotify);

//----------------------------------------------------------//
//Functions
//----------------------------------------------------------//

//------------------------------------------//
//Logging given commnands to log.txt
//------------------------------------------//

const logCommands = function (commands) {
  fs.appendFile("log.txt", JSON.stringify(commands) + "\n", function (error) {
    if (error) {
      return console.log(error);
    }

    console.log("log.txt successfully updated");
  })
};

//--------------------------------------//
//Spotify aritst song fetch
//--------------------------------------//
const findSong = function (songName) {
  if (songName === undefined) {
    songName = "The Sign";
  }

  spotify.search(
    {
      type: "track",
      query: songName
    },
    function (err, data) {
      if (err) {
        console.log("Error occured: " + err);
      }

      let songs = data.tracks.items;

      for (let i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("---------------------------------------");
      }
      let hits = data.tracks.items;
      let hitsArray = [];

      for (let i = 0; i < hits.length; i++) {
        hitsArray.push({
          "artist(s)": hits[i].artists.map(getArtistNames),
          "song name": hits[i].name,
          "preview song": hits[i].preview_url,
          "album": hits[i].album.name
        });
      }
      
      logCommands(hitsArray);

    });
};

//-------//
//Captures artist names for preceding function
//------//
const getArtistNames = function (artist) {
  return artist.name;
};

//---------------------------------------//
//Twitter Tweet retrieval
//---------------------------------------//

const tweetRetrieval = function () {
  const client = new Twitter(keys.twitter);

  const params = {
    screen_name: "corded_twigsley"
  };
  client.get("statuses/user_timeline", params, function (err, tweets, res) {
    if (!err) {
      for (let i = 0; i < tweets.length; i++) {
        console.log("----------------------------");
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
      }
    } else {
      console.log("Error: " + err);
    }
  });
};

//----------------------------------------------//
//Function for retrieving movie from OMDB
//----------------------------------------------//

let movieRetrieval = function (movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  console.log(movieName);

  let query = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  request(query, function (err, res, body) {
    if (!err & res.statusCode === 200) {
      let jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
    }
  });
};

//---------------------------------------//
//"Do what is says" function
//---------------------------------------//

const doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);

    const dataArray = data.split(",");

    if (dataArray.length === 2) {
      choose(dataArray[0], dataArray[1]);
    }
    else if (dataArray.length === 1) {
      choose(dataArray[0]);
    }
  });
};

//----------------------------------------------//
//Determing which command is executed
//----------------------------------------------//
let choose = function (caseName, functionType) {
  switch (caseName) {
    case "spotify-this-song":
      findSong(functionType);
      break;
    case "my-tweets":
      tweetRetrieval();
      break;
    case "movie-this":
      movieRetrieval(functionType);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI is currently undeveloped and unable to understand the command given.");
  }
};
//--------------------------------------------------------//
//Function to capture user input and runs the preceding function according to command
//--------------------------------------------------------//
const run = function (argOne, argTwo) {
  choose(argOne, argTwo);
};



run(process.argv[2], process.argv[3]);

