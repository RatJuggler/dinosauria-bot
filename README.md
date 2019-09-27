# dinosauria-bot

Dinosaur of the Day Twitter bot.

# Addendum

With npm it's easy to start pulling in packages left, right and centre and soon build up a huge list of dependencies,
so I've tried not to do that. Instead I've only pulled in packages for major infrastructure components that are
essential (like the Twitter API) or that I want to try out as I think they are useful (nconf and winston). For other 
things I've tried to stick with simple functions which implement the bare minimum of what the application needs.

Packages I chose not to use (these are still good packages).

- random
- request
- url-exists
