Limelight.js
------------------------
A node.js library for authenticating Limelight CDN requests.

This is a simple library for authenticating node.js applications that want to communicate to the Limelight API found
at http://support.video.limelight.com/support/docs/content_api/#9.0.

Usage
===================

You can use this library by including ```limelight``` as a dependency on your node.js library.

```
{
  "name": "my_library",
  dependencies: {
    "needle": ">=0",
    "limelight": ">=0"
  }
}

```

You can then use this within your library like the following.

```
// Include the dependencies.
var needle = require('needle');
var limelight = require('limelight');

// Setup the variables.
var organization = '1234567';
var access_key = '1234567';
var secret = '1234567';

// Get the request URL.
var url = 'http://api.video.limelight.com/rest/organizations/' + organization + '/media/1234567/encodings.json';

// Sign the request using limelight.authenticate
var signed_url = limelight.authenticate("GET", url, access_key, secret);

// Get the response.
needle.get(signed_url, function (error, response, info) {
  console.log(info.encodings);
});

```
