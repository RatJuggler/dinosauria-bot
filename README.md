# dinosauria-bot

This bot tweets a #DinosaurOfTheDay under the handle [@dinosauria_bot](https://twitter.com/dinosauria_bot).

It tweets a random dinosaur name with some additional text pulled from the dinosaurs Wikipedia page and a link to that page.

Scraping the text from Wikipedia proved to be way harder than I imagined (see the comments on the [wtf_wikipeda](https://github.com/spencermountain/wtf_wikipedia) 
page for an idea of why). It now makes a reasonable attempt at extracting something meaningful from the first sentence using a 
hodgepodge of regex.

## Install / Run

Assuming you already have Node.js/npm installed you can check out the source code from here:

    $ git clone https://github.com/RatJuggler/dinosauria-bot.git
    $ cd dinosauria-bot

Then install the packages required:

    $ npm install

You can then run the bot with `node app/dinosauria-bot.js`.

The full list of options is as follows:
```
$ node app/dinosauria-bot.js --help

Usage: node dinosauria-bot.js [options]

Options:
      --help      Show help                                            [boolean]
      --version   Show version number                                  [boolean]
  -d, --dinosaur  Run for the specified dinosaur                        [string]
  -l, --loglevel  Set the logging level
                           [choices: "debug", "info", "error"] [default: "info"]
  -q, --quiet     Run without invoking the Twitter API                 [boolean]
  -t, --test      Test the Twitter access tokens.                      [boolean]
```
To see it working you can use the `-q` option to run without using the Twitter API but to make it fully functional you will need to 
set up a Twitter account and apply for access [here](https://developer.twitter.com/en/apply-for-access). The access tokens created 
for the account then need to be made available as environment variables for the bot to find. The easiest way to do this is to 
create a `dinosauria-bot.env` file from the supplied template, then edit the file and copy in your tokens.

    $ cp dinosauria-bot.env.template dinosauria-bot.env

The edited file should then look something like this (not real tokens):

    TWITTER_CONSUMER_KEY="123abc456cde789fgh012ijkl"
    TWITTER_CONSUMER_SECRET="456cde789fgh012ijkl123abc456cde789fgh012ijkl123abc"
    TWITTER_ACCESS_TOKEN="789fgh012ijkl123abc456cde789fgh012ijkl123abc456cde"
    TWITTER_ACCESS_TOKEN_SECRET="c456cde789fgh012ijkl123abc456cde789fgh012ijkl"

The bot will always look for this file in the current working directory. Test that your tokens are working by using:

    $ node app/dinosauria-bot.js --test

There are also some pre-defined `npm` scripts you can use:

- start: Run the bot as normal.
- help:  Run the bot showing the help options.
- test:  Run the bot to test Twitter API access.
- quiet: Run the bot in quiet mode.
- brontosaurus: Run the bot for this dinosaur.

As the bot is really only meant to tweet once a day it will send a tweet and then immediately exit. I'm running it daily with a 
Cron job so that it's not sat there idling for the rest of the time.

## Docker

Docker build and compose files are available which create a standalone image to run the bot once a day.

Create the image with: 

    $ docker build -f docker/Dockerfile -t dinosauria-bot:local .

We need to be careful that any Twitter access tokens aren't included in the image in case it is pushed to a public repository (and
it's also just best practice). There are a number of ways to inject the tokens into the image but probably the easiest is to create
a `dinosauria-bot.env` file as described above and then run the image with the `--env-file` option.

    $ docker run dinosauria-bot:local -d --env-file dinosauria-bot.env

Or just use the compose file to do everything:

    $ docker-compose up -d

Environment variables can be used to configure image tagging (see the file), and a simple health check, using the `--test` option,
is available if running under orchestration.
