// Define the command line options and load the Twitter API keys.
// The keys can be loaded from environment variables or the command line but are best loaded from a file.
// They are used to initialise the Twitter API interface.

require('dotenv').config({path: "dinosauria-bot.env"});

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const options = yargs(hideBin(process.argv))
    .usage("Usage: node $0 [options]")
    .help()
    .version()
    .options({
        "dinosaur": { alias: "d", describe: "Run for the specified dinosaur", type: "string" },
        "loglevel": { alias: "l", describe: "Set the logging level", choices: ["debug", "info", "error"], default: "info" },
        "quiet": { alias: "q", describe: "Run without invoking the Twitter API", type: "boolean" },
        "test": { alias: "t", describe: "Test the Twitter access tokens.", type: "boolean" }
    })
    .argv;

const twitterKeys = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}

module.exports = { options, twitterKeys };
