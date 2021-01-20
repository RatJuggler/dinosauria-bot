const logger = require('./logger.js');

function verifyCredentials(twitterAPI) {
    let parameters = {
        include_entities: false,
        skip_status: true,
        include_email: true
    };
    return twitterAPI.get('account/verify_credentials', parameters)
        .then((data) => {
            logger.info("Twitter credentials verified.");
        })
        .catch((error) => {
            logger.error(error.code + ' : ' + error.message);
            throw new Error("Unable to verify Twitter credentials!");
        });
}

function tweet(twitterAPI, update) {
    return twitterAPI.post('statuses/update', { status: update })
        .then((data) => {
            logger.info("Tweeted: " + update);
        })
        .catch((error) => {
            logger.error(error.code + ' : ' + error.message);
            throw new Error("Unable to Tweet!");
        });
}

module.exports = { tweet, verifyCredentials };
