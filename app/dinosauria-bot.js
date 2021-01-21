const config = require('./config.js')
const Twit = require('twit');
const { NoTwit } = require("./notwit");
const logger = require('./logger.js');
const tweetService = require('./tweet.js');
const dinoService = require('./dinosaur.js');

function main() {
    logger.setLogLevel(config.options.loglevel);
    logger.info("Booting dinosauria bot...");
    let forDinosaur;
    if (config.options.dinosaur) {
        forDinosaur = config.options.dinosaur;
        logger.info("Using supplied name: " + forDinosaur);
    } else {
        forDinosaur = dinoService.getRandomName();
        logger.info("Selected random name: " + forDinosaur);
    }
    let twitterAPI = config.options.quiet ? new NoTwit(logger) : new Twit(config.twitterKeys);
    tweetService.verifyCredentials(twitterAPI)
        .then(() => {
            return dinoService.prepareTweet(forDinosaur);
        })
        .then((preparedTweet) => {
            logger.debug("Prepared tweet (" + preparedTweet.length + " characters):\n" + preparedTweet);
            tweetService.tweet(twitterAPI, preparedTweet);
        })
        .finally(() => {
            logger.info("Shutting down dionsauria bot.");
        });
}

main();
