const winston = require('./winston.js');

function stripUnwanted(markup) {
    let text = markup.replace(/'''''/gi, '');
    winston.debug("Removed bold/italic: " + text);
    text = markup.replace(/\[\[|\]\]/gi, '');
    winston.debug("Removed all square brackets: " + text);
    return text;
}

function findSomeText(body) {
    let markup = JSON.parse(body);
    let wikitext = markup.parse.wikitext;
    winston.debug("From Wiki: "+ JSON.stringify(markup.parse.wikitext));
    // TODO: Deal with redirects correctly.
    if (wikitext.contains('#redirect')) {return}
    let initialText = wikitext.match(/'''''.*?[.,]/);
    winston.debug("initialText: " + initialText);

}

module.exports.findSomeText = findSomeText;
