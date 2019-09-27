// Pull in logger and Twit.
const winston = require('./winston.js');
const Twit = require('twit');

// Pull in the Twitter account keys.
const config = require('./config.js');

// Instantiate the API object.
const T = new Twit(config);

// Pull in the list of dinosaurs.
const dinosaurs = require('dinosaurs');

winston.info("Booting dinosauria bot...");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let rndDino = getRandomInt(dinosaurs.length);
let dinoName = dinosaurs[rndDino];
dinoName = dinoName.charAt(0).toUpperCase() + dinoName.slice(1);

winston.debug("Chosen dinosaur: " + dinoName);
