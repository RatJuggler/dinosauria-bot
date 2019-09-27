// Pull in logger and Twit.
const winston = require('./winston.js');
const Twit = require('twit');

// Pull in the Twitter account keys.
const config = require('./config.js');

// Instantiate the API object.
const T = new Twit(config);

winston.info("Booting dinosauria bot...");

// Pull in the dinosaur lookup.
const dinoService = require('./dinosaur.js');

dinosaur = dinoService.getDinosaur();

winston.info("Chosen dinosaur: " + dinosaur.name);
