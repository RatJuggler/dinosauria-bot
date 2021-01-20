const twitterKeys = require('./config.js')
const Twit = require('twit');
const winston = require('./winston.js');
const tweetService = require('./tweet.js');
const dinoService = require('./dinosaur.js');

function main() {
    winston.info("Booting dinosauria bot...");
    let twitterAPI = new Twit(twitterKeys);
    tweetService.verifyCredentials(twitterAPI)
        .then(() => {
            return dinoService.prepareTweet();
        })
        .then((tweet) => {
            winston.debug("Prepared tweet(" + tweet.length + "):\n" + tweet);
            tweetService.tweet(twitterAPI, tweet);
        })
        .finally(() => {
            winston.info("Shutting down dionsauria bot.");
        });
}

main();
