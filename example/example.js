// Include the dependencies.
var needle = require('needle');
var limelight = require('../limelight.js');

// Setup the variables.
var organization = '1234567890';
var access_key = '1234567890';
var secret = '1234567890';
var mediaId = '123123123123';

// Get the request URL.
var url = 'http://api.video.limelight.com/rest/organizations/' + organization + '/media/' + mediaId + '/encodings.json';

// Sign the request using limelight.authenticate
var signed_url = limelight.authenticate("GET", url, access_key, secret);

// Get the response.
needle.get(signed_url, function (error, response, info) {
  console.log(info.encodings);
});