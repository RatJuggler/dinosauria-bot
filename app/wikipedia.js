const winston = require('./winston.js');

function removeBrace(markup, startingFrom, openBrace, closeBrace) {
    let braceMatch = 0;
    for (let i = startingFrom; i < markup.length; i++) {
        let char = markup.charAt(i);
        if (char === openBrace) {braceMatch++;}
        if (char === closeBrace) {braceMatch--;}
        if (braceMatch === 0) {braceMatch = i; break;}
    }
    return markup.slice(0, startingFrom) + markup.slice(++braceMatch);
}

function removeBraceSections(markup, openBrace, closeBrace) {
    let braceStart = -1;
    while ((braceStart = markup.indexOf(openBrace)) !== -1) {
        markup = removeBrace(markup, braceStart, openBrace, closeBrace);
    }
    return markup;
}

function stripUnwanted(markup) {
    markup = markup.replace(/'''''/gi, '');
    winston.debug("Removed bold/italic:\n" + markup);
    markup = markup.replace(/\[\[|\]\]/gi, '');
    winston.debug("Removed all square brackets:\n" + markup);
    return markup;
}

function findSomeText(body, textSize) {
    let markup = JSON.parse(body);
    let wikiText = markup.parse.wikitext['*'];
    wikiText = wikiText.replace(/\n/gi, '');
    winston.debug("From Wiki:\n"+ wikiText);
    // TODO: Deal with redirects correctly.
    if (wikiText.includes('#redirect') || wikiText.includes('#REDIRECT')) {return;}
    wikiText = removeBraceSections(wikiText, '{', '}');
    winston.debug("Removed {} sections:\n" + wikiText);
    wikiText = removeBraceSections(wikiText, '<', '>');
    winston.debug("Removed <> sections:\n" + wikiText);
    wikiText = stripUnwanted(wikiText);
    wikiText = wikiText.match(/.*?\./);
    winston.debug("First Sentence:\n" + wikiText);
    return wikiText;
}

module.exports.findSomeText = findSomeText;
