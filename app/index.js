const twitterKeys = require('./config.js')
const Twit = require('twit');
const winston = require('./winston.js');
const tweet = require('./tweet.js');
const dinoService = require('./dinosaur.js');

winston.info("Booting dinosauria bot...");

async function main() {
    let twitterAPI = new Twit(twitterKeys);
    await tweet.verifyCredentials(twitterAPI);
    dinoService.tweetDinosaur(twitterAPI);
}

main()
    .finally(() => {
        winston.info("Shutting down dionsauria bot.");
    }
);
