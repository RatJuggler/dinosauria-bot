// Pull in logger and Twit.
const winston = require('./winston.js');
const Twit = require('twit');

// Pull in the Twitter account keys.
const config = require('./config.js');

// Instantiate the API object.
const T = new Twit(config);

// Pull in the dinosaur lookup.
const dinosaur = require('./dinosaur.js');

winston.info("Booting dinosauria bot...");

winston.info("Chosen dinosaur: " + dinosaur.name);

const https = require('https');
const url = require('url');

let options = {
    method: 'HEAD',
    host: url.parse(dinosaur.wikiURL).host,
    port: url.parse(dinosaur.wikiURL).port,
    path: url.parse(dinosaur.wikiURL).path
};
let req = https.request(options, function(r) {
    winston.debug(r.statusCode + " = " + r.statusMessage);
    winston.info("Chosen dinosaur: " + dinosaur.name);
}).end();
