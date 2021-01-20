const twitterKeys = require('./config.js')
const Twit = require('twit');
const winston = require('./winston.js');
const tweetService = require('./tweet.js');
const dinoService = require('./dinosaur.js');

winston.info("Booting dinosauria bot...");

async function main() {
    let twitterAPI = new Twit(twitterKeys);
    await tweetService.verifyCredentials(twitterAPI);
    dinoService.prepareTweet()
        .then((tweet) => {
            winston.debug("Prepared tweet(" + tweet.length + "):\n" + tweet);
            tweetService.tweet(twitterAPI, tweet);
        });
}

main()
    .finally(() => {
        winston.info("Shutting down dionsauria bot.");
    }
);
