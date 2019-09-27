// Pull in the list of dinosaurs.
const dinosaurs = require('dinosaurs');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getDinosaur() {
    let rndDino = getRandomInt(dinosaurs.length);
    let dinoName = dinosaurs[rndDino];
    dinoName = dinoName.charAt(0).toUpperCase() + dinoName.slice(1);
    let wikiURL = "https://en.wikipedia.org/wiki/" + dinoName;
    return {"name": dinoName, "wikiURL": wikiURL}
}

module.exports = getDinosaur();
