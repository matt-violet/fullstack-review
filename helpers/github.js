const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  request(
    {
      method: 'GET',
      uri: 'https://api.github.com' 
    },
    function(error, response, body) {
      if(response.statusCode == 200){
        console.log('GET request successful')
      } else {
        console.log('error: '+ response.statusCode)
        console.log(body)
      }
  )
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

}

module.exports.getReposByUsername = getReposByUsername;