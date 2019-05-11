let express = require('express');
let bodyParser = require('body-parser')
let app = express();
let saveFile = require('../database/index.js');
// gives access to modules.exports object in github.js
let githubHelperFile = require('../helpers/github.js');

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded()

// specify middleware as the callback/handler function
// creates 'body' key in the incoming message equal to an object with all your data inside
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));


// take github username and get repo info from github API, then save repo info in db
app.post('/repos', jsonParser, function (req, res) {
  console.log('username: ', req.body.term);
  githubHelperFile.getReposByUsername(req.body.term, (err, data) => {
    if (err) {
      console.log('Could not find user in database');
      return;
    }
    saveFile.save(data, (err, data) => {
      if(err) {
        console.log('Unable to save repos to database')
      }
      res.status(201).send()
    })
  });
});


// This route should send back the top 25 repos
app.get('/repos', function (req, res) {
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

