(function() {
  var Twitter, client, subdomain, user_id;

  Twitter = require("ntwitter");

  client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  subdomain = process.env.SUBDOMAIN;

  user_id = "11132462";

  /*
  client.get "/users/lookup.json", screen_name: "BobSage47873711", (err, data) ->
    throw err if err
    console.log data
  */

  client.stream("statuses/filter", {
    follow: user_id
  }, function(stream) {
    stream.on("data", function(data) {
      var params;
      console.log("Got tweet: " + data["text"]);
      if (data["in_reply_to_status_id"] || data["in_reply_to_user_id"]) {
        console.log("Ignored reply");
        return;
      }
      if (data["retweeted_status"]) {
        console.log("Ignored retweet");
        return;
      }
      if (data["user"]["id_str"] !== user_id) {
        console.log("Ignored non-@37signals tweet");
        return;
      }
      if (!data["text"].match(/subdomain/i)) {
        console.log("Ignored non-match");
        return;
      }
      console.log("Responding...");
      params = {
        status: "@37signals We'd love to try Next! Our subdomain is " + subdomain,
        in_reply_to_status_id: data["id_str"]
      };
      return client.post("/statuses/update.json", params, null, function(err, response) {
        if (err) throw err;
        return console.log("Successfully tweeted");
      });
    });
    stream.on("end", function(response) {
      console.log(response);
      throw "Connection ended";
    });
    return stream.on("destroy", function(response) {
      console.log(response);
      throw "Connection destroyed";
    });
  });

}).call(this);
