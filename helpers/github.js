const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // Use the request module to request repos for a user from github API
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  }
  
  request(options, function(error, response, body) {
    if (error) {
      callback(error);
      console.log('error: '+ response.statusCode)
      return;
    }
    console.log('GET request successful')
    callback(null, body);  
    return;
  }

)};

module.exports.getReposByUsername = getReposByUsername;