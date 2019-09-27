// Use the Twit node package.
const Twit = require('twit');

// Pull in the Twitter account keys.
const config = require('./config.js');

// Instantiate the API object.
const T = new Twit(config);

// Pull in the list of dinosaurs.
const dinosaurs = require('dinosaurs');
