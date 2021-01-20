const config = require('./config.js')
const Twit = require('twit');
const { NoTwit } = require("./notwit");
const logger = require('./winston.js');
const tweetService = require('./tweet.js');
const dinoService = require('./dinosaur.js');

function main() {
    logger.info("Booting dinosauria bot...");
    let twitterAPI = config.options.quiet ? new NoTwit(logger) : new Twit(config.twitterKeys);
    tweetService.verifyCredentials(twitterAPI)
        .then(() => {
            return dinoService.prepareTweet();
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
