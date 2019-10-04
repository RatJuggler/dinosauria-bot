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
    let braceStart;
    while ((braceStart = markup.indexOf(openBrace)) !== -1) {
        markup = removeBrace(markup, braceStart, openBrace, closeBrace);
    }
    return markup;
}

function stripUnwanted(markup) {
    markup = markup.replace(/'''/gi, '');
    markup = markup.replace(/''/gi, '');
    winston.debug("Removed bold/italic:\n" + markup);
    markup = markup.replace(/\|.*?]/gi, ']');
    winston.debug("Removed page names:\n" + markup);
    markup = markup.replace(/\[\[|]]/gi, '');
    winston.debug("Removed all square brackets:\n" + markup);
    markup = markup.replace(/&nbsp;/gi, ' ');
    winston.debug("Removed &nbsp;:\n" + markup);
    return markup;
}

function findSomeText(body, textSize) {
    let markup = JSON.parse(body);
    let wikiText = markup.parse.wikitext['*'];
    // Replace all newlines with spaces to help with parsing.
    wikiText = wikiText.replace(/\n/gi, ' ');
    winston.debug("From Wiki:\n"+ wikiText);
    // TODO: Deal with redirects correctly.
    if (wikiText.includes('#redirect') || wikiText.includes('#REDIRECT')) {return;}
    wikiText = removeBraceSections(wikiText, '{', '}');
    winston.debug("Removed {} sections:\n" + wikiText);
    wikiText = removeBraceSections(wikiText, '<', '>');
    winston.debug("Removed <> sections:\n" + wikiText);
    if (wikiText.startsWith('[')) {
        wikiText = removeBrace(wikiText, 0, '[', ']');
        winston.debug("Removed initial [] section:\n" + wikiText);
    }
    wikiText = stripUnwanted(wikiText);
    wikiText = wikiText.match(/.*?\. /);
    wikiText = String(wikiText).trim();
    winston.debug("First Sentence:\n" + wikiText);
    if (wikiText.length > textSize) {
        wikiText = wikiText.slice(0, textSize-3) + '...';
    }
    return wikiText;
}

module.exports.findSomeText = findSomeText;
