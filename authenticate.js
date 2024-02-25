// var client_id = "30cac4debe7f423eb830668305930adf";
// var client_secret = "62735ac866f64d7f96362f646356f42a";
// var redirect_uri = 'http://localhost:3000/callback';

// const express = require('express')
// const querystring = require('querystring');

// var app = express();

// app.get('/login', function(req, res) {

//   var state = 1;
//   var scope = 'ugc-image-upload user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email user-read-private';

//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

// const request = require('request'); // Add this at the top with your other require statements

// app.get('/callback', function(req, res) {
//   var code = req.query.code || null;
//   var state = req.query.state || null;

//   if (state === null) {
//     res.redirect('/#' +
//       querystring.stringify({
//         error: 'state_mismatch'
//       }));
//   } else {
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;

//         // Here you can redirect the user with the tokens or do something else with the tokens
//         // For demonstration, redirecting back to the home page with tokens in query
//         console.log(
//           querystring.stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         // Handle errors or invalid responses
//         console.log(
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });


// app.listen(3000, () => {
//     console.log('App listening on port 3000');
//   });

var client_id = '18b5e773b5ae4bd282cc2cac6176f899';
var client_secret = '6be7d6b9a66b4f88ac8e7a84165f6755';
const request = require('request');

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      console.log('Access Token:', token); // Output the token to the terminal
    } else {
      // It's good practice to log errors or unsuccessful status codes as well
      console.log('Error:', error);
      console.log('Status Code:', response && response.statusCode);
      console.log('Response Body:', body);
    }
  });