require("dotenv").config();

const request=require("request");
const fs = require("fs");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");

const keys = require("./keys");

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

//----------------------------------------------------------//
//Functions
//----------------------------------------------------------//

//--------------------------------------//
//Spotify aritst song fetch
//--------------------------------------//
const findSong = function(songName) {
  if (songName === undefined) {
    songName = "The Sign";
  }

  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
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
    }
  );
};

//-------//
//Captures artist names for preceding function
//------//
const getArtistNames = function(artist) {
  return artist.name;
};

//---------------------------------------//
//Twitter Tweet retrieval
//---------------------------------------//
const tweetRetrieval = function() {
  const params = {
    screen_name: "cnn"
  };
  client.get("statuses/user_timeline", params, function(res, err, tweets) {
    console.log("working!");
    if (!err) {
      for (let i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};
//----------------------------------------------//
//Determing which command is executed
//----------------------------------------------//
let choose = function(caseType, functionType) {
  switch (caseType) {
    case "spotify-this-song":
      findSong(functionType);
      break;
    case "my-tweets":
      tweetRetrieval();
      break;
    default:
    console.log("LIRI is currently undeveloped and unable to understand the command given.");
  }
};
//--------------------------------------------------------//
//Function to capture user input and runs the preceding function according to command
//--------------------------------------------------------//
const run = function(argOne, argTwo) {
  choose(argOne, argTwo);
};



run(process.argv[2], process.argv[3]);

