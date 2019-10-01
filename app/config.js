// Load the Twitter API keys from environment variables, the command line or a file and initialise the API interface.

const nConf = require('nconf');
const Twit = require('twit');

nConf.env()
    .argv()
    .file({ file: 'app/config.json' });

const twitterKeys = {
    consumer_key: nConf.get("TWITTER_CONSUMER_KEY"),
    consumer_secret: nConf.get("TWITTER_CONSUMER_SECRET"),
    access_token: nConf.get("TWITTER_ACCESS_TOKEN"),
    access_token_secret: nConf.get("TWITTER_ACCESS_TOKEN_SECRET")
};

module.exports = new Twit(twitterKeys);
