const winston = require('./winston.js');
const dinoService = require('./dinosaur.js');
const tweetService = require('./tweet.js');

winston.info("Booting dinosauria bot...");

let dinosaur = dinoService.getDinosaur();
let tweet = dinosaur.name + ": " + dinosaur.wikiURL + "\n#DinosaurOfTheDay";
winston.debug("Tweet:\n" + tweet);

tweetService.tweet(tweet);

winston.info("Shutting down dionsauria bot.");
