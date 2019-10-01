const winston = require('./winston.js');
const Twit = require('twit');

// Pull in the Twitter account keys.
const config = require('./config.js');

function tweetTest() {
    // Instantiate the API object.
    const T = new Twit(config);

    T.post('statuses/update', { status: 'Hello Pangaea!' }, function(err, data, response) {
        if (err) {
            winston.error("Problem Tweeting: " + err);
        } else {
            winston.debug("Tweet Data: " + data.text);
        }
    });
}

function tweet(dinosaur) {
    winston.debug("Tweet: " + JSON.stringify(dinosaur));
}

module.exports.tweet = tweet;
