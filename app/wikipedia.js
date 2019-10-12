const winston = require('./winston.js');

class RedirectError extends Error {
    constructor(redirectTo, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RedirectError);
        }
        this.name = 'RedirectError';
        // Custom debugging information
        this.redirectTo = redirectTo;
    }
}

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

function removePageNames(markup) {
    let links = markup.match(/\[\[.*?]]/gi);
    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        // If no page name in link then skip.
        if (link.indexOf('|') === -1) {continue;}
        // Find the text shown for the link.
        let findLinkText = link.match(/\|.*?]/gi);
        // Odd if we don't find anything...
        if (!findLinkText) {continue;}
        // Replace the link with the text that should show.
        let linkText = findLinkText[0];
        linkText = linkText.slice(1, linkText.length-1);
        markup = markup.replace(link, linkText);
        winston.debug("Replace link: " + link + ' => ' + linkText);
    }
    return markup;
}

function stripUnwanted(markup) {
    markup = markup.replace(/'''''/gi, '');
    markup = markup.replace(/''''/gi, '');
    markup = markup.replace(/'''/gi, '');
    markup = markup.replace(/''/gi, '');
    winston.debug("Removed bold/italic:\n" + markup);
    markup = markup.replace(/\[\[|]]/gi, '');
    winston.debug("Removed all double square brackets:\n" + markup);
    markup = markup.replace(/&nbsp;/gi, ' ');
    winston.debug("Removed &nbsp;:\n" + markup);
    return markup;
}

function fixFormat(markup) {
    markup = markup.replace(/\([:;,.] /gi, '(');
    markup = markup.replace(/  /gi, ' ');
    markup = markup.replace(/ , /gi, ', ');
    markup = markup.replace(/ \/ /gi, ' ');
    markup = markup.replace(/ ( ) /gi, ' ');
    winston.debug("Fixed format:\n" + markup);
    return markup;
}

function findSomeText(body, textSize) {
    let markup = JSON.parse(body);
    let wikiText = markup.parse['wikitext']['*'];
    // Replace all newlines with spaces to help with parsing.
    wikiText = wikiText.replace(/\n/gi, ' ');
    winston.debug("From Wiki:\n"+ wikiText);
    if (wikiText.includes('#redirect') || wikiText.includes('#REDIRECT')) {
        let redirectTo = String(wikiText.match(/\[\[.*?]]/));
        redirectTo = redirectTo.replace(/\[\[|]]/gi, '');
        winston.info("Redirecting to: " + redirectTo);
        throw new RedirectError(redirectTo);
    }
    wikiText = removeBraceSections(wikiText, '{', '}');
    winston.debug("Removed {} sections:\n" + wikiText);
    wikiText = wikiText.replace(/\[\[File:.*?]]/gi, '');
    winston.debug("Removed file links:\n" + wikiText);
    wikiText = wikiText.replace(/<ref.*?ref>/gi, '');
    winston.debug("Removed references:\n" + wikiText);
    if (wikiText.startsWith('[')) {
        wikiText = removeBrace(wikiText, 0, '[', ']');
        winston.debug("Removed initial [] section:\n" + wikiText);
    }
    wikiText = removePageNames(wikiText);
    winston.debug("Removed page names:\n" + wikiText);
    wikiText = stripUnwanted(wikiText);
    wikiText = fixFormat(wikiText);
    wikiText = wikiText.match(/.*?\. /);
    wikiText = String(wikiText).trim();
    winston.debug("First Sentence:\n" + wikiText);
    if (wikiText.length > textSize) {
        wikiText = wikiText.slice(0, textSize-3) + '...';
        winston.debug("Resize to fit:\n" + wikiText);
    }
    return wikiText;
}

module.exports.RedirectError = RedirectError;
module.exports.findSomeText = findSomeText;
