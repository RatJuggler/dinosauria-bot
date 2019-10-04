const winston = require('./winston.js');
const request = require('./request.js');
const dinosaurs = require('dinosaurs');
const tweetService = require('./tweet.js');
const wikpedia = require('./wikipedia');

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
    let dinoName = getRandomName();
    winston.debug("Selected random name: " + dinoName);
    let wikiURL = "https://en.wikipedia.org/wiki/" + dinoName;
    winston.debug("Wiki URL: " + wikiURL);
    let wikiAPI = "https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&page=" + dinoName;
    winston.debug("Wiki API: " + wikiAPI);
    request.get(wikiAPI)
        .then((result) => {
            let tweet = dinoName;
            tweet += wikpedia.findSomeText(result.body);
            tweet += ' ' + wikiURL + "\n#DinosaurOfTheDay";
            winston.debug("Prepared tweet(" + tweet.length + "):\n" + tweet);
            return tweet;
        })
        .then((tweet) => {
//            tweetService.tweet(tweet);
        })
        .catch((error) => {
            winston.error("Unable to retrieve Wikipedia details: " + error.message);
        });
}

module.exports.tweetDinosaur = tweetDinosaur;
