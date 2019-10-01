const winston = require('./winston.js');

winston.info("Booting dinosauria bot...");

// Pull in the dinosaur details lookup.
const dinoService = require('./dinosaur.js');

let dinosaur = dinoService.getDinosaur();

const tweetService = require('./tweet');

tweetService.tweet(dinosaur);

winston.info("Shutting down dionsauria bot.");
