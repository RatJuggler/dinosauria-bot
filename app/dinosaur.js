// Pull in the list of dinosaurs.
const winston = require('./winston.js');
const dinosaurs = require('dinosaurs');
const https = require('https');
const url = require('url');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function validWikiPage(wikiPage) {
    return true;
}

function getWikiPage(wikiURL) {
    winston.debug("Getting Wiki Page: " + wikiURL);
    let options = {
        method: 'GET',
        host: url.parse(wikiURL).host,
        port: url.parse(wikiURL).port,
        path: url.parse(wikiURL).path
    };
    https.request(options, (response) => {
        let page = '';
        response.on('data', (chunk) => {
            page += chunk;
        });
        response.on('end', () => {
            winston.debug("GET returned: " + page);
        })
    }).on('error', (error) => {
        winston.error(error.message);
    }).end();
}

function getRandomName() {
    let rndDino = getRandomInt(dinosaurs.length);
    let dinoName = dinosaurs[rndDino];
    winston.debug("Selected random name: " + dinoName);
    dinoName = dinoName.charAt(0).toUpperCase() + dinoName.slice(1);
    return dinoName;
}

function getDinosaur() {
    let dinoName, wikiURL, wikiPage;
    do {
        dinoName = getRandomName();
        wikiURL = "https://en.wikipedia.org/wiki/" + dinoName;
        wikiPage = getWikiPage(wikiURL);
    } while (!validWikiPage(wikiPage));
    return {"name": dinoName, "wikiURL": wikiURL, "wikiPage": wikiPage}
}

module.exports.getDinosaur = getDinosaur;
