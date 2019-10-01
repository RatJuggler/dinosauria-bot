const winston = require('./winston.js');
const twitterAPI = require('./config.js');

function tweet(update) {
    twitterAPI.post('statuses/update', { status: update }, function(err, data, response) {
        if (err) {
            winston.error("Problem Tweeting: " + err);
        } else {
            winston.info("Tweet Data:\n" + data.toString());
        }
    });
}

module.exports.tweet = tweet;
