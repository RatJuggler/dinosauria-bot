const winston = require("winston");

// Instantiate and export a logger.
const logger = new winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            handleExceptions: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
