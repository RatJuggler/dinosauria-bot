const winston = require('./winston.js');
const tweet = require('./tweet.js');
const dinoService = require('./dinosaur.js');

winston.info("Booting dinosauria bot...");

async function main() {
    await tweet.verifyCredentials();
    dinoService.tweetDinosaur();
}

main()
    .finally(_ => {
        winston.info("Shutting down dionsauria bot.");
    }
);
