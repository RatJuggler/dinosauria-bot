const config = require('./config.js')
const NoTwit = require("./notwit.js");
const Twit = require('./tweet.js');
const logger = require('./logger.js');
const dinoService = require('./dinosaur.js');

const client = require('prom-client');

function testCredentials() {
    const twitterAPI = new Twit(config.twitterKeys);
    twitterAPI.verifyCredentials();
}

function tweetDinosaur() {
    let forDinosaur;
    if (config.options.dinosaur) {
        forDinosaur = config.options.dinosaur;
        logger.info("Using supplied name: " + forDinosaur);
    } else {
        forDinosaur = dinoService.getRandomName();
        logger.info("Selected random name: " + forDinosaur);
    }
    const twitterAPI = config.options.quiet ? new NoTwit() : new Twit(config.twitterKeys);
    twitterAPI.verifyCredentials()
        .then(_ => dinoService.prepareTweet(forDinosaur))
        .then(preparedTweet => twitterAPI.tweet(preparedTweet))
        .then(_ => {
            logger.info("Pushing metrics to: " + config.options.metrics);
            let gateway = new client.Pushgateway(config.options.metrics);
            gateway.pushAdd({ jobName: 'dinosauria-bot' }, function (err, resp, body) {});
        })
        .finally(() => logger.info("Shutting down dionsauria bot."));
}

function main() {
    logger.setLogLevel(config.options.loglevel);
    logger.info("Booting dinosauria bot...");
    if (config.options.test)
        testCredentials();
    else
        tweetDinosaur();
}

main();
