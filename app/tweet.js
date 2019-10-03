const winston = require('./winston.js');
const twitterAPI = require('./config.js');

async function verifyCredentials() {
    let parameters = {
        include_entities: false,
        skip_status: true,
        include_email: true
    };
    return twitterAPI.get('account/verify_credentials', parameters)
        .then((data) => {
            winston.debug(JSON.stringify(data));
            winston.info("Twitter credentials verified.");
        })
        .catch((error) => {
            winston.error(error.code + ' : ' + error.message);
            throw new Error("Unable to verify Twitter credentials!");
        });
}

function tweet(update) {
    twitterAPI.post('statuses/update', { status: update })
        .then((data) => {
            winston.debug(JSON.stringify(data));
            winston.info("Tweeted: " + update);
        })
        .catch((error) => {
            winston.error(error.code + ' : ' + error.message);
            throw new Error("Unable to verify Twitter credentials!");
        });
}

module.exports.tweet = tweet;
module.exports.verifyCredentials = verifyCredentials;
