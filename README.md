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
my-tweets`, `spotify-this-song`, `movie-this`, and `do-what-it-says`
````

Giving the `my-tweets` input queries the hardcoded Twitter screen name, and relays the Tweet along with the date and time that the Tweet was made.

![my-tweets input](https://i.imgur.com/hmfwwJZ.png)

Giving the `spotify-this-song` input queries the Spotify API, which searches for the given song along with the artist(s) names, a preview of the song if applicable, and the album that the song came on.

![spotify-this-song input](https://i.imgur.com/mbryFFD.png)

Any other command given will prompt the default response.

![balance-my-taxes input](https://i.imgur.com/KG1PxQ6.png)
