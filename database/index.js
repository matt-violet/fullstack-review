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
  userID: Number,
  username: String,  
  userPage: String,
  userReposPage: String,
  stargazersCount: Number
});

// model class with which we construct documents (instances of model)
let Repo = mongoose.model('Repo', repoSchema);

// create collection to store repos
db.createCollection("repos", { capped: false,
  autoIndexId: true,
  }
)

// save a repo or repos to the MongoDB and prevent duplicates
let save = (repoData, callback) => {
  var parsedRepoData = JSON.parse(repoData);
  for (var i = 0; i < parsedRepoData.length; i++) {
    var repo = new Repo({
      userID: parsedRepoData[i].id,
      username: parsedRepoData[i].owner.login,  
      userPage: parsedRepoData[i].owner.url,
      userReposPage: parsedRepoData[i].owner.repos_url,
      stargazersCount: parsedRepoData[i].stargazers_count
    })
    repo.save(function (err, data) {
      if (err) {
        console.log('Unable to save repo to database');
        return;
      }
      console.log('Successfully saved repo to database!')
    })
  }
}


module.exports.save = save;