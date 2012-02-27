# NextBot

This was a quick hack to attempt to get a beta invite to Basecamp Next. The code
should be fairly self-explanitory, but basically it's a Twitter bot that waits for
@37signals to tweet about Basecamp Next invites, then responds with your Basecamp
subdomain. I got my invite from [this tweet](https://twitter.com/#!/37signals/status/173948874828943361).

## Dependencies

A simple `$ npm install` should take care of the package dependencies. Other
than that, you'll need to set the following environment variables:

    CONSUMER_KEY
    CONSUMER_SECRET
    ACCESS_TOKEN_KEY
    ACCESS_TOKEN_SECRET
    SUBDOMAIN

## License

The "do whatever the hell you want to" license.
