const logger = require('./logger.js');
const request = require('./request.js');
const dinosaurs = [...require('dinosaurs')];  // Force type of dinosaurs array.
const wikipedia = require('./wikipedia');

const TWEET_LENGTH = 280;
const WIKI_URL = "https://en.wikipedia.org/wiki/";
const WIKI_API = "https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&page=";
const DINO_OF_THE_DAY = "\n#DinosaurOfTheDay";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomName() {
    const dinoName = dinosaurs[getRandomInt(dinosaurs.length)];
    return dinoName.charAt(0).toUpperCase() + dinoName.slice(1);
}

function buildTweet(dinoName, wikiResult) {
    const wikiURL = encodeURI(WIKI_URL + dinoName);
    // Twitter shortens links to 23 characters so that's the length of the wikiURL and -1 is for the new line.
    const textSize = TWEET_LENGTH - 23 - DINO_OF_THE_DAY.length - 1;
    let dinoText = wikipedia.findSomeText(wikiResult, textSize);
    if (!dinoText) dinoText = dinoName;
    let preparedTweet = dinoText + '\n' + wikiURL + DINO_OF_THE_DAY;
    logger.debug("Prepared tweet (" + (preparedTweet.length - wikiURL.length + 23) + " characters):\n" + preparedTweet);
    return preparedTweet;
}

function prepareTweet(dinoName) {
    const wikiAPI = encodeURI(WIKI_API + dinoName);
    logger.debug("Wiki API call to: " + wikiAPI);
    return request.get(wikiAPI)
        .then((response) => {
            return buildTweet(dinoName, response.body);
        })
        .catch((error) => {
            if (error instanceof wikipedia.RedirectError) {
                logger.debug("Redirecting to: " + error.redirectTo);
                return prepareTweet(error.redirectTo);
            }
            throw new Error("Unable to retrieve Wikipedia details: " + error.message);
        });
}

module.exports = { getRandomName, prepareTweet };
