const https = require('https');

const winston = require('./winston.js');
const dinosaurs = require('dinosaurs');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomName() {
    let rndDino = getRandomInt(dinosaurs.length);
    let dinoName = dinosaurs[rndDino];
    dinoName = dinoName.charAt(0).toUpperCase() + dinoName.slice(1);
    return dinoName;
}

function getWikiPage(wikiURL) {
    winston.debug("GET Wiki Page: " + wikiURL);
    https.get(wikiURL, (response) => {
        let page = '';
        response.on('data', (chunk) => {
            winston.debug("Got data chunk...");
            page += chunk;
        });
        response.on('end', () => {
            winston.debug("GET returned!");
            return page;
        })
    }).on('error', (error) => {
        winston.error(error.message);
    }).end();
}

function getDinosaur() {
    let dinoName, wikiURL;
    dinoName = getRandomName();
    winston.debug("Selected random name: " + dinoName);
    wikiURL = "https://en.wikipedia.org/wiki/" + dinoName;
    return {"name": dinoName, "wikiURL": wikiURL}
}

let dinosaur = getDinosaur();
getWikiPage(dinosaur.wikiURL);

module.exports.getDinosaur = getDinosaur;
