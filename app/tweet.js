const winston = require('./winston.js');
const twitterAPI = require('./config.js');

function verifyCredentials() {
    let parameters = {
        include_entities: false,
        skip_status: true,
        include_email: true
    };
    twitterAPI.get('account/verify_credentials', parameters, (err, data) => {
        if (err) {
            winston.error(err.code + ' : ' + err.message);
            throw new Error("Unable to verify Twitter credentials!");
        } else {
            winston.debug(JSON.stringify(data));
            winston.info("Twitter credentials verified.");
        }
    })
}

function tweet(update) {
    twitterAPI.post('statuses/update', { status: update }, (err, data) => {
        if (err) {
            winston.error(err.code + ' : ' + err.message);
        } else {
            winston.debug(JSON.stringify(data));
            winston.info("Tweeted: " + update);
        }
    });
}

verifyCredentials();

module.exports.tweet = tweet;
