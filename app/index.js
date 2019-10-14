const winston = require('./winston.js');
const tweet = require('./tweet.js');

winston.info("Booting dinosauria bot...");

async function dinosaurOfTheDay() {
    const dotdService = require('./dinosaur.js');
    await tweet.verifyCredentials();
    await dotdService.tweetDinosaur();
}

async function madeUpDinosaur() {
    const mudService = require('./madeup.js');
    await tweet.verifyCredentials();
    console.log('mudService.tweetMadeUp()');
}

let operation;
let argv = process.argv.slice(2);
if (!argv || argv.length === 0 || argv[0] === 'dotd') {
    operation = dinosaurOfTheDay();
} else {
    operation = madeUpDinosaur();
}
operation.finally(_ => {
        winston.info("Completing dinosauria bot.");
    }
);
