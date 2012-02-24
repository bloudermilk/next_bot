Twitter = require "ntwitter"

client = new Twitter
  consumer_key:         process.env.CONSUMER_KEY
  consumer_secret:      process.env.CONSUMER_SECRET
  access_token_key:     process.env.ACCESS_TOKEN_KEY
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET

# Subscribe to all tweets from @37signals
client.stream "statuses/filter", follow: "11132462", (stream) ->
  # Called every time a tweet comes in
  stream.on "data", (data) ->
    console.log "Got tweet: #{data["text"]}"

    # Don't care about replies
    if data["in_reply_to_status_id"] or data["in_reply_to_user_id"]
      console.log "Ignored reply"
      return

    # Only reply to tweets that contain "subdomain"
    unless data["text"].match(/subdomain/)
      console.log "Ignored non-match"
      return

    console.log "Responding..."

    params =
      status: "@BobSage47873711 foo bar baz bar foo bar"
      in_reply_to_status_id: data["id_str"]

    # Post a tweet via the REST API
    client.post "/statuses/update.json", params, null, (err, response) ->
      throw err if err
      console.log "Successfully tweeted"

  stream.on "end", (response) ->
    console.log response
    throw "Connection ended"

  stream.on "destroy", (response) ->
    console.log response
    throw "Connection destroyed"
