# dinosauria-bot

This bot currently tweets a "Dinosaur of the Day Twitter" under the handle [@dinosauria_bot](https://twitter.com/dinosauria_bot).

It tweets a random dinosaur name with some additional text pulled from its Wikipedia page and a link to that page.

Scraping the text from Wikipedia proved to be way harder than I imagined (see the comments on the 
[wtf_wikipeda](https://github.com/spencermountain/wtf_wikipedia) page for an idea of why). It now makes a reasonable attempt at 
extracting something meaningful from the first sentence using a hodgepodge of regex.

## Install / Run

Assuming you already have NodeJS/npm installed you can check out the source code from here:
```
$ git clone https://github.com/RatJuggler/dinosauria-bot.git
$ cd dinosauria-bot
```
Then install the packages required:
```
$ npm install
```
You can then run the bot with `node app/dinosauria-bot.js` or just `npm start`.
```
$ node app/dinosauria-bot.js --help

Usage: dinosauria-bot.js [options]

Options:
      --help      Show help                                            [boolean]
      --version   Show version number                                  [boolean]
  -d, --dinosaur  Run for the specified dinosaur                        [string]
  -q, --quiet     Run without invoking the Twitter API                 [boolean]
```
You can use the `-q` option to run without using the Twitter API but to make it fully functional you will need to set up a Twitter
account and apply for access [here](https://developer.twitter.com/en/apply-for-access). You'll then need to make the following
tokens available to run it:
```
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN
TWITTER_ACCESS_TOKEN_SECRET
```
I've used [nconf](https://www.npmjs.com/package/nconf) so that you can configure the access keys using environment variables, or a 
configuration file. To use the configuration file copy the template:
```
$ cp app/config.json.template app/config.json
```
Edit the new file and add your keys:
```
{
  "TWITTER_CONSUMER_KEY": "<your consumer key here>",
  "TWITTER_CONSUMER_SECRET": "<your consumer secret here>",
  "TWITTER_ACCESS_TOKEN": "<your access token here>",
  "TWITTER_ACCESS_TOKEN_SECRET": "<your access token secret here>"
}
```
As the bot is really only meant to tweet once a day it will send a tweet then exit immediately. I'm running it daily with a Cron 
job so that it's not sat there idling for the rest of the time.

## Addendum

With npm it's easy to start pulling in packages left, right and centre and soon build up a huge list of dependencies, so I've tried 
not to do that. Instead, I've only pulled in packages for major infrastructure components that are essential (like the Twitter API) 
or that I want to try out as I think they are useful (`nconf` and `winston`). For other things I've tried to stick with simple 
functions which implement the bare minimum of what the application needs. This also helps with learning as I'm forced to write my 
own code.

Packages I chose not to use:

- `random`
- `request`
- `request-promise-native`
- `url-exists`
- `wtf-wikipedia`
