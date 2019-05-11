// include mongoose in project
const mongoose = require('mongoose');
// open connection to test db on locally running instance of MongoDB.
mongoose.connect('mongodb://localhost/fetcher');

// get notified if we connect or error
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

// define shape of documents (instances of model)
let repoSchema = mongoose.Schema({
  id: Number,
  owner: Object,  // includes login username and repos url
  description: String,
  stargazers_count: Number 
});

// makes a model/collection of schema
let Repo = mongoose.model('Repo', repoSchema);

// consider taking array of repos
let save = (repoData, callback) => {
  // write data into a collection/model
  // This function should save a repo or repos to the MongoDB
  Repo.create(repoData, function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(result);
});

module.exports.save = save;



// mongoose specifies type of data entering mongo db