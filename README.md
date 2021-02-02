# dinosauria-bot

This bot tweets a #DinosaurOfTheDay under the handle [@dinosauria_bot](https://twitter.com/dinosauria_bot).

It tweets a random dinosaur name with some additional text pulled from the dinosaurs Wikipedia page and a link to that page.

Scraping the text from Wikipedia proved to be way harder than I imagined (see the comments on the 
[wtf_wikipeda](https://github.com/spencermountain/wtf_wikipedia) page for an idea of why). It now makes a reasonable attempt at 
extracting something meaningful from the first sentence using a hodgepodge of regex.

## Install / Run

Assuming you already have Node.js/npm installed you can check out the source code from here:
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
  -l, --loglevel  Set the logging level
                           [choices: "debug", "info", "error"] [default: "info"]
  -q, --quiet     Run without invoking the Twitter API                 [boolean]
```
To see it working you can use the `-q` option to run without using the Twitter API but to make it fully functional you will need to 
set up a Twitter account and apply for access [here](https://developer.twitter.com/en/apply-for-access). You'll then need to make 
the following tokens available to run it:
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
As the bot is really only meant to tweet once a day it will send a tweet then immediately exit. I'm running it daily with a Cron 
job so that it's not sat there idling for the rest of the time.

## Docker

Docker build and compose files are available which create a standalone image to run the bot once a day.

Create the image with: `docker build -f docker/Dockerfile -t dinosauria-bot:local .`

We need to be careful that any Twitter access keys aren't included in the image in case it is pushed to a public repository (and
it's also just best practice). There are a number of ways to inject the keys into the image but probably the easiest is to create 
an `env.list` file from the supplied template, set the keys in it and then run the image with the `--env-file` option.

    docker run dinosauria-bot:local -d --env-file ./docker/env.list

Or just use the compose file to do everything:

    docker-compose up -d

## Addendum

With npm it's easy to start pulling in packages left, right and centre and soon build up a huge list of dependencies, so I've tried 
not to do that. Instead, I've only pulled in packages for major infrastructure components that are essential (like the Twitter API) 
or that I want to try out as I think they are useful (`nconf` and `winston`). For other things I've tried to stick with simple 
functions which implement the bare minimum of what the application needs. This also helps with learning as I'm forced to write my 
own code.

Packages I chose not to use:

- `random`
- `request` / `got`
- `url-exists`
- `wtf-wikipedia`
