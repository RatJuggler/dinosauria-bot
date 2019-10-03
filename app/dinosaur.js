const winston = require('./winston.js');
const request = require('./request.js');
const dinosaurs = require('dinosaurs');
const tweetService = require('./tweet.js');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomName() {
    let rndDino = getRandomInt(dinosaurs.length);
    let dinoName = dinosaurs[rndDino];
    dinoName = dinoName.charAt(0).toUpperCase() + dinoName.slice(1);
    return dinoName;
}

function tweetDinosaur() {
    let dinoName, wikiURL;
    dinoName = getRandomName();
    winston.debug("Selected random name: " + dinoName);
    wikiURL = "https://en.wikipedia.org/wiki/" + dinoName;
    winston.debug("GET Wiki Page: " + wikiURL);
    request.get(wikiURL)
        .then((result) => {
            return dinoName + ": " + wikiURL + "\n#DinosaurOfTheDay";
        })
        .then((tweet) => {
            tweetService.tweet(tweet);
        })
        .catch((error) => {
            winston.error(error);
        });
}

module.exports.tweetDinosaur = tweetDinosaur;
