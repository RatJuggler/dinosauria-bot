const logger = require('./logger.js');
const BaseTwit = require('twit');

BaseTwit.prototype.verifyCredentials = function () {
    let parameters = {
        include_entities: false,
        skip_status: true,
        include_email: true
    };
    return this.get('account/verify_credentials', parameters)
        .then((data) => {
            logger.debug(data);
            logger.info("Twitter credentials verified.");
        })
        .catch((error) => {
            logger.error("Unable to verify Twitter credentials!");
            logger.error(error.code + ' : ' + error.message);
            process.exit(1);
        });
}

BaseTwit.prototype.tweet = function (update) {
    return this.post('statuses/update', { status: update })
        .then((data) => {
            logger.debug(data);
            logger.info("Tweet sent!");
        })
        .catch((error) => {
            logger.error(error.code + ' : ' + error.message);
            throw new Error("Unable to Tweet!");
        });
}

module.exports = BaseTwit;
