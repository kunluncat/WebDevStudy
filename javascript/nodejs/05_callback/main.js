/**
 * 
 * https://www.airpair.com/javascript/node-js-tutorial
 * 
 */
var dns = require('dns');

dns.resolve4('www.google.com', function (err, addresses) {
  if (err) throw err;

  console.log('addresses: ' + JSON.stringify(addresses));
});