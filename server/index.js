const express = require('express');
var bodyParser = require('body-parser')

let app = express();

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded()

app.use(express.static(__dirname + '/../client/dist'));

// creates 'body' key in the incoming message equal to an object with all your data inside
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/repos', jsonParser, function (req, res) {
  console.log(req.body);
  // res.send(req.body.data)
  // take github username and get repo info from github API, then save repo info in db
  // getReposByUsername(username, callback)
  // save(repoData, callback)
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

