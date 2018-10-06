# liri-node-app

## Application Overview

This CLI-driven app captures (two) inputs put in by the user, and responds appropriately. More use-cases could be developed, but the primary purpose for building this app was to familiarize myself with utilizing Node.js along with making API calls. 

### Technology used
* Node.js
* `twitter` npm package
* `node-spotify-api` npm package
* `dotenv` npm package

### How to Use
As of right now (Octobe 5, 2018) the application accepts four valid inputs:

```
`my-tweets`, `spotify-this-song`, `movie-this`, and `do-what-it-says`
````

Giving the `my-tweets` input queries the hardcoded Twitter screen name, and relays the Tweet along with the date and time that the Tweet was made.

![my-tweets input](https://i.imgur.com/hmfwwJZ.png)

Giving the `spotify-this-song` input queries the Spotify API, which searches for the given song along with the artist(s) names, a preview of the song if applicable, and the album that the song came on.

![spotify-this-song input](https://i.imgur.com/mbryFFD.png)

The `movie-this` input queries the OMDB API, which searches the given movie name and returns the movies title, year and country it was created, both IMDB and Rotten Tomatoes scores, the films language, a short summary of the plot, and the high-profile actors.

![movie-this input](https://i.imgur.com/07aybeo.png)

The `do-what-it-says` input imports and reads a file *random.txt* and does takes its' arguments from whatever is in the file; its' default is to take the movie retrieval function with an argument of "Evil".

![do-what-it-says input](https://i.imgur.com/8F5E1VR.png)

Any other command given will prompt the default response.

![balance-my-taxes input](https://i.imgur.com/KG1PxQ6.png)
