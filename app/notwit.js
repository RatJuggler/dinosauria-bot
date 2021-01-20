class NoTwit {

    constructor(logger) {
        this.logger = logger;
    }

    get(path, params) {
        this.logger.info("Quiet Mode: Call to check Twitter credentials suppressed.");
        return Promise.resolve();
    }

    post(path, paraams) {
        this.logger.info("Quiet Mode: Call to Tweet suppressed.");
        return Promise.resolve();
    }
}

module.exports = { NoTwit: NoTwit };
