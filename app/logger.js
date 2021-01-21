const winston = require("winston");

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.padLevels(),
    winston.format.printf(details => {
        return `${details.timestamp} ${details.level}: ${details.message}`;
    })
);

const transports = {
    console: new winston.transports.Console({ handleExceptions: true })
}

const logger = new winston.createLogger({
    format: logFormat,
    transports: [
        transports.console
    ],
    exitOnError: false
});


logger.setLogLevel = (newLevel) => {
    transports.console.level = newLevel;
}

module.exports = logger;
