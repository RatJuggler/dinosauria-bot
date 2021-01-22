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

function prepareTweet(dinoName) {
    const wikiURL = encodeURI(WIKI_URL + dinoName);
    logger.debug("Wiki URL: " + wikiURL);
    const wikiAPI = encodeURI(WIKI_API + dinoName);
    logger.debug("Wiki API: " + wikiAPI);
    return request.get(wikiAPI)
        .then((result) => {
            // Twitter shortens links to 23 characters.
            const textSize = TWEET_LENGTH - 23 - DINO_OF_THE_DAY.length - 1;
            let dinoText = wikipedia.findSomeText(result.body, textSize);
            if (!dinoText) dinoText = dinoName;
            return dinoText + '\n' + wikiURL + DINO_OF_THE_DAY;
        })
        .catch((error) => {
            if (error instanceof wikipedia.RedirectError) {
                logger.debug("Redirecting to: " + error.redirectTo);
                return prepareTweet(error.redirectTo);
            }
            logger.error("Unable to retrieve Wikipedia details: " + error.message);
        });
}

module.exports = { getRandomName, prepareTweet };
