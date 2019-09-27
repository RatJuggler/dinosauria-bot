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
