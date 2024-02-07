var client_id = process.env.SPOTIPY_CLIENT_ID;
var client_secret = process.env.SPOTIPY_CLIENT_SECRET;
var redirect_uri = 'http://localhost:3000/callback';
const express = require('express')
const querystring = require('querystring');

var app = express();

app.get('/login', function(req, res) {

  var state = 1;
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

const request = require('request'); // Add this at the top with your other require statements

app.get('/callback', function(req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        // Here you can redirect the user with the tokens or do something else with the tokens
        // For demonstration, redirecting back to the home page with tokens in query
        console.log(
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        // Handle errors or invalid responses
        console.log(
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});


app.listen(3000, () => {
    console.log('App listening on port 3000');
  });