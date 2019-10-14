const dinosaurs = [].concat(require('dinosaurs'));  // Force type of dinosaurs array.

const baseLetterIndex = 'a'.charCodeAt(0);

function initialiseLetterCount(letters) {
    for (let i = 0; i < 26; i++) {
        letters[i] = 0;
    }
    return letters;
}

function letterIndex(string, index) {
    let letterCode = string.charCodeAt(index);
    return letterCode - baseLetterIndex;
}

function tweetMadeUp() {

}

let startLetters = initialiseLetterCount([]);
let endLetters = initialiseLetterCount([]);

dinosaurs.forEach(name => {
    startLetters[letterIndex(name, 0)]++;
    endLetters[letterIndex(name, name.length - 1)]++;
});

for (let i = 0; i < 26; i++) {
    console.log(String.fromCharCode(baseLetterIndex + i), startLetters[i], endLetters[i]);
}
