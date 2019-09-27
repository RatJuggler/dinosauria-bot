const winston = require("winston");

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

// Instantiate and export a logger.
const logger = new winston.createLogger({
    level: "debug",
    format: logFormat,
    transports: [
        new winston.transports.Console({
            handleExceptions: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
