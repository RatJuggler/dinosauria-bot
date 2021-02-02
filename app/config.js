// Define the command line options and load the Twitter API keys.
// The keys can be loaded from environment variables or the command line but are best loaded from a file.
// They are used to initialise the Twitter API interface.

const nConf = require('nconf');

nConf.env()
    .argv(require('yargs')
        .help()
        .version()
        .usage("Usage: $0 [options]")
        .options({
            "dinosaur": { alias: "d", describe: "Run for the specified dinosaur", type: "string" },
            "loglevel": { alias: "l", describe: "Set the logging level", choices: ["debug", "info", "error"], default: "info" },
            "test": { alias: "t", describe: "Test the Twitter access tokens.", type: "boolean" },
            "quiet": { alias: "q", describe: "Run without invoking the Twitter API", type: "boolean" }
        }))
    .file({ file: 'app/config.json' });

const options = {
    dinosaur: nConf.get("dinosaur"),
    loglevel: nConf.get("loglevel"),
    test: nConf.get("test"),
    quiet: nConf.get("quiet")
}

const twitterKeys = {
    consumer_key: nConf.get("TWITTER_CONSUMER_KEY"),
    consumer_secret: nConf.get("TWITTER_CONSUMER_SECRET"),
    access_token: nConf.get("TWITTER_ACCESS_TOKEN"),
    access_token_secret: nConf.get("TWITTER_ACCESS_TOKEN_SECRET")
}

module.exports = { options, twitterKeys };
