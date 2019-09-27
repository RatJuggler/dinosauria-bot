const winston = require("winston");

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.padLevels(),
    winston.format.printf(details => {
        return `${details.timestamp} ${details.level}: ${details.message}`;
    })
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
