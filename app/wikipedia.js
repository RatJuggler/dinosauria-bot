const logger = require('./logger.js');

class RedirectError extends Error {
    constructor(redirectTo, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RedirectError);
        }
        this.name = 'RedirectError';
        this.redirectTo = redirectTo;
    }
}

function parseBraces(markup, startingFrom, openBrace, closeBrace) {
    let braceMatch = 0;
    const braceSize = openBrace.length;
    for (let i = startingFrom; i < markup.length; i++) {
        let match = markup.slice(i, i + braceSize);
        if (match === openBrace) {braceMatch++;}
        if (match === closeBrace) {braceMatch--;}
        if (braceMatch === 0) {
            return i + braceSize;
        }
    }
    return markup.length;
}

function removeBraceSections(markup, openSection, openBrace, closeBrace) {
    let sectionStart;
    while ((sectionStart = markup.indexOf(openSection)) !== -1) {
        markup = markup.slice(0, sectionStart) + markup.slice(parseBraces(markup, sectionStart, openBrace, closeBrace));
    }
    return markup;
}

function removePageNames(markup) {
    const links = markup.match(/\[\[.*?]]/gi);
    links.forEach((link) => {
        // If no page name in link then skip.
        if (link.indexOf('|') !== -1) {
            // Find the text shown for the link.
            const findLinkText = link.match(/\|.*?]/gi);
            // Odd if we don't find anything...
            if (findLinkText) {
                // Replace the link with the text that should show.
                let linkText = findLinkText[0];
                linkText = linkText.slice(1, linkText.length - 1);
                markup = markup.replace(link, linkText);
                logger.debug("Replace link: " + link + ' => ' + linkText);
            }
        }
    });
    return markup;
}

function stripUnwanted(markup) {
    markup = markup.replace(/'''''/gi, '');
    markup = markup.replace(/''''/gi, '');
    markup = markup.replace(/'''/gi, '');
    markup = markup.replace(/''/gi, '');
    logger.debug("Removed bold/italic:\n" + markup);
    markup = markup.replace(/\[\[|]]/gi, '');
    logger.debug("Removed all double square brackets:\n" + markup);
    markup = markup.replace(/&nbsp;/gi, ' ');
    logger.debug("Removed &nbsp;:\n" + markup);
    return markup;
}

function fixFormat(markup) {
    markup = markup.replace(/\( ?[:;,. ] ?/gi, '(');
    markup = markup.replace(/ {2,}/gi, ' ');
    markup = markup.replace(/ , /gi, ', ');
    markup = markup.replace(/ \/ /gi, ' ');
    markup = markup.replace(/ \( ?\) /gi, ' ');
    logger.debug("Fixed format:\n" + markup);
    return markup;
}

function logForDebug(message, wikiText) {
    logger.debug(message + " (length: " + wikiText.length + "):\n"+ wikiText);
}

function findSomeText(body, textSize) {
    let wikiText = JSON.parse(body).parse['wikitext']['*'];
    // Replace all newlines with spaces to help with parsing.
    wikiText = wikiText.replace(/\n/gi, ' ');
    logForDebug("Initial text from Wikipedia", wikiText);
    if (wikiText.includes('#redirect') || wikiText.includes('#REDIRECT')) {
        let redirectTo = String(wikiText.match(/\[\[.*?]]/));
        redirectTo = redirectTo.replace(/\[\[|]]/gi, '');
        logger.info("Redirecting to: " + redirectTo);
        throw new RedirectError(redirectTo);
    }
    if (wikiText.length > 4096) {
        wikiText = wikiText.slice(0, 4096);
        logForDebug("Only use the first 4K of text", wikiText);
    }
    wikiText = removeBraceSections(wikiText, '{', '{','}');
    logForDebug("Removed {} sections", wikiText);
    wikiText = removeBraceSections(wikiText, '[[File:', '[[', ']]');
    logForDebug("Removed file links", wikiText);
    wikiText = removeBraceSections(wikiText,'<!--', '<!--', '-->');
    logForDebug("Removed comments", wikiText);
    wikiText = removeBraceSections(wikiText,'== ', '== ', ' ==');
    logForDebug("Removed section headers", wikiText);
    wikiText = wikiText.replace(/<references.*?\/.*?>/gi, '');
    wikiText = wikiText.replace(/<ref.*?\/.*?>/gi, '');
    logForDebug("Removed references", wikiText);
    wikiText = removePageNames(wikiText);
    logForDebug("Removed page names", wikiText);
    wikiText = stripUnwanted(wikiText);
    wikiText = fixFormat(wikiText);
    wikiText = String(wikiText).trim();
    const sentences = wikiText.match(/.*?\. /gi);
    let finalText = "";
    for (const sentence of sentences) {
        if (finalText.length + sentence.length > textSize) {
            if (finalText.length < (textSize / 2)) {
                finalText += sentence;
            }
            break;
        }
        finalText += sentence;
    }
    logForDebug("Final Text", wikiText);
    if (finalText.length > textSize) {
        finalText = finalText.slice(0, textSize-3) + '...';
        logForDebug("Resize to fit", wikiText);
    }
    return finalText;
}

module.exports.RedirectError = RedirectError;
module.exports.findSomeText = findSomeText;
