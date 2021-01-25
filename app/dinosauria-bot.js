const config = require('./config.js')
const NoTwit = require("./notwit.js");
const Twit = require('./tweet.js');
const logger = require('./logger.js');
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
    let twitterAPI = config.options.quiet ? new NoTwit() : new Twit(config.twitterKeys);
    twitterAPI.verifyCredentials()
        .then(_ => dinoService.prepareTweet(forDinosaur))
        .then(preparedTweet => twitterAPI.tweet(preparedTweet))
        .finally(() => logger.info("Shutting down dionsauria bot."));
}

main();
