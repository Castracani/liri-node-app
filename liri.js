require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var request=require("request");
var fs = require("fs");

var keys = require("./keys");

var spot
