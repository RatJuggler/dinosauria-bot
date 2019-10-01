const winston = require('./winston.js');

winston.info("Booting dinosauria bot...");

// Pull in the dinosaur details lookup.
const dinoService = require('./dinosaur.js');

dinoService.getDinosaur();

winston.info("Shutting down dionsauria bot.");
