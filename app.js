const { PORT = 3000, TOKEN } = process.env;
const q = require('q');
const express = require('express');
const bodyParser = require('body-parser');
const restler = require('restler');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function(req, res, next){
  //https://api.slack.com/slash-commands#validating_the_command
  if(TOKEN && req.body.token !== TOKEN){
    res.status(403).send("Please go away!");
    return;
  }

  var deferred = q.defer();
  var url = req.body.text;
  if(url){
    var start = Date.now();
    restler.get(url, {timeout: 5000})
      .on("complete", function(result, response){
        if (Math.floor(response.statusCode/100) >= 4) {
          deferred.resolve(`${url} errored ${response.statusCode}`);
        } else {
          var end = Date.now();
          deferred.resolve(`${url} (${response.statusCode}) took ${end - start}ms`);
        }
      })
      .on('timeout', function(ms){
        deferred.resolve(`${url} timed out after ${ms}ms`);
      });
  } else {
    deferred.resolve("Hi! I am Ping Bot! What url should I ping?");
  }

  deferred.promise.then(function(text){
    res.status(200).json({ text: text });
  });
});

const server = app.listen(PORT, function(){
  console.log(`Server listening on port ${PORT}`);
});
