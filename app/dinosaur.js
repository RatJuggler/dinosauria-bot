// Pull in the list of dinosaurs.
const winston = require('./winston.js');
const dinosaurs = require('dinosaurs');
const https = require('https');
const url = require('url');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function validURL(urlToValidate) {
    winston.debug("Validating URL: " + urlToValidate);
    let options = {
        method: 'HEAD',
        host: url.parse(urlToValidate).host,
        port: url.parse(urlToValidate).port,
        path: url.parse(urlToValidate).path
    };
    let isValid = await new Promise(resolve => {
        https.request(options, result => resolve(result.statusCode === 200)).end();
    })
}

function getRandomName() {
    let rndDino = getRandomInt(dinosaurs.length);
    let dinoName = dinosaurs[rndDino];
    winston.debug("Selected random name: " + dinoName);
    dinoName = dinoName.charAt(0).toUpperCase() + dinoName.slice(1);
    return dinoName;
}

function getDinosaur() {
    let dinoName, wikiURL;
    do {
        dinoName = getRandomName();
        wikiURL = "https://en.wikipedia.org/wiki/" + dinoName;
    } while (!validURL(wikiURL));
    return {"name": dinoName, "wikiURL": wikiURL}
}

module.exports = getDinosaur();
