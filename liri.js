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

//---------------------------------------//
//Twitter Tweet retrieval
//---------------------------------------//
const tweetRetrieval = function() {
  const params = {
    screen_name: "corded_twigsley"
  };
  client.get("status/user_timeline", params, function(res, err, tweets) {
    if (!err)
  })
}
