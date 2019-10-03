const winston = require('./winston.js');
const request = require('./request.js');
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
    request.get(wikiURL)
        .then((result) => {
            winston.debug(result.body);
        })
        .catch((error) => {
            winston.error(error);
        });
    winston.debug("GET Wiki Page completed.")
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
