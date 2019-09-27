// Load the Twitter API keys from environment variables, the command line or a file.

const nconf = require('nconf');

nconf.env()
    .argv()
    .file({ file: 'app/config.json' });

module.exports = {
    consumer_key: nconf.get("TWITTER_CONSUMER_KEY"),
    consumer_secret: nconf.get("TWITTER_CONSUMER_SECRET"),
    access_token: nconf.get("TWITTER_ACCESS_TOKEN"),
    access_token_secret: nconf.get("TWITTER_ACCESS_TOKEN_SECRET")
};
