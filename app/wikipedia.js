const winston = require('./winston.js');
const cheerio = require('cheerio');

function stripUnwanted(html) {
    html = html.replace(/(<([^>]+)>)/gi, '');
    winston.debug("Removed HTML Elements: " + html);
    html = html.replace(/\/.*?\//gi, '');
    winston.debug("Removed Unicode Pronunciation: " + html);
    html = html.replace(/&quot;/gi, '');
    winston.debug("Removed HTML &quot;s: " + html);
    html = html.replace(/&#[0-9A-Z]*;/, '');
    winston.debug("Removed Remaining Unicode: " + html);
    html = html.replace(/Chinese: .*?; /gi, '');
    winston.debug("Removed Chinese: " + html);
    html = html.replace(/Pinyin: .*?; /gi, '');
    winston.debug("Removed Pinyin: " + html);
    return html;
}

function findSomeText(body) {
    let $ = cheerio.load(body);
    let firstParagraph = $("p i b").closest('p').html();
    winston.debug("firstParagraph: " + firstParagraph);
    let rawText = '';
    if (firstParagraph) {
        let firstParentheses = firstParagraph.match(/<\/b><\/i> \(.*?\)/);
        winston.debug("firstParentheses: " + firstParentheses);
        if (firstParentheses) {
            rawText = stripUnwanted(firstParentheses.toString());
        } else {
            let isAText = firstParagraph.match(/<\/b><\/i> is a .*?([,.])/);
            if (isAText) {
                rawText = stripUnwanted((isAText.toString()));
            }
        }
    }
    winston.debug("rawText: " + rawText);
    return rawText;
}

module.exports.findSomeText = findSomeText;
