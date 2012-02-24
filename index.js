(function() {
  var Twitter, client, subdomain;

  Twitter = require("ntwitter");

  client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  subdomain = process.env.SUBDOMAIN;

  client.stream("statuses/filter", {
    follow: "11132462"
  }, function(stream) {
    stream.on("data", function(data) {
      var params;
      console.log("Got tweet: " + data["text"]);
      if (data["in_reply_to_status_id"] || data["in_reply_to_user_id"]) {
        console.log("Ignored reply");
        return;
      }
      if (!data["text"].match(/subdomain/)) {
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
