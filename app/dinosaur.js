const winston = require('./winston.js');
const request = require('./request.js');
const dinosaurs = [].concat(require('dinosaurs'));  // Force type of dinosaurs array.
const tweetService = require('./tweet.js');
const wikpedia = require('./wikipedia');

const TWEET_LENGTH = 280;
const WIKI_URL = "https://en.wikipedia.org/wiki/";
const WIKI_API = "https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&page=";
const DINO_OF_THE_DAY = "\n#DinosaurOfTheDay";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomName() {
    let rndDino = getRandomInt(dinosaurs.length);
    let dinoName = dinosaurs[rndDino];
    dinoName = dinoName.charAt(0).toUpperCase() + dinoName.slice(1);
    return dinoName;
}

function tweetDinosaur(redirectTo) {
    let dinoName;
    if (redirectTo) {
        dinoName = redirectTo;
        winston.debug("Redirected to: " + dinoName);
    } else {
        dinoName = getRandomName();
        winston.debug("Selected random name: " + dinoName);
    }
    let wikiURL = WIKI_URL + dinoName;
    winston.debug("Wiki URL: " + wikiURL);
    let wikiAPI = WIKI_API + dinoName;
    winston.debug("Wiki API: " + wikiAPI);
    request.get(wikiAPI)
        .then((result) => {
            // Twitter shortens links to 23 characters.
            let textSize = TWEET_LENGTH - 23 - DINO_OF_THE_DAY.length - 1;
            let dinoText = wikpedia.findSomeText(result.body, textSize);
            if (!dinoText) {dinoText = dinoName;}
            let tweet = dinoText + '\n' + wikiURL + DINO_OF_THE_DAY;
            winston.debug("Prepared tweet(" + tweet.length + "):\n" + tweet);
            return tweet;
        })
        .then((tweet) => {
            tweetService.tweet(tweet);
        })
        .catch((error) => {
            if (error instanceof wikpedia.RedirectError) {
                tweetDinosaur(error.redirectTo);
            } else {
                winston.error("Unable to retrieve Wikipedia details: " + error.message);
            }
        });
}

module.exports.tweetDinosaur = tweetDinosaur;
