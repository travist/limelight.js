var crypto = require("crypto");
exports = module.exports = {
  authenticate: function($http_verb, $resource_url, $access_key, $secret, $params) {
    $params = $params ? $params : {};
    var $url = $resource_url + '?';
    var $parsed_url = url.parse($resource_url);
    var $str_to_sign = $http_verb + '|' + $parsed_url.host + '|' + $parsed_url.pathname + '|';
    $str_to_sign = $str_to_sign.toLowerCase();
    if (!$params.hasOwnProperty('expires')) {
      $params.expires = Math.floor(new Date().getTime() / 1000) + 300;
    }
    $params.access_key = $access_key;

    // Get all the keys in an array.
    var keys = [], key = '', len = 0, i = 0;
    for (key in $params) {
      if ($params.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    // Sort the keys...
    keys.sort();
    len = keys.length;

    // Iterate through all of the sorted keys.
    for (i = 0; i < len; i++) {
      key = keys[i];
      $str_to_sign += key + '=' + $params[key] + '&';
      $url += encodeURIComponent(key) + '=' + encodeURIComponent($params[key]) + '&';
    }

    $str_to_sign = $str_to_sign.substring(0, $str_to_sign.length - 1);
    var $signature = crypto.createHmac("SHA256", $secret).update($str_to_sign).digest('base64');
    $url += 'signature=' + encodeURIComponent($signature);
    return $url;
  }
};