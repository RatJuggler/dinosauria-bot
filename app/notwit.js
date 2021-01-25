const logger = require('./logger.js');

class NoTwit {

    constructor() {}

    verifyCredentials() {
        logger.info("Quiet Mode: Call to check Twitter credentials suppressed.");
        return Promise.resolve("<No Response>");
    }

    tweet(update) {
        logger.info("Quiet Mode: Call to Tweet suppressed.");
        return Promise.resolve("<No Response>");
    }
}

module.exports = NoTwit;
