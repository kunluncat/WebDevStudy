/**
 * 
 * https://www.airpair.com/javascript/node-js-tutoria
 * 
 * npm install irc
 * 
 */
var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'myIrcBot', {
  channels: ['#sample-channel']
});

client.on('error', function(message) {
  console.error('error: ', message);
});

client.on('connect', function() {
  console.log('connected to the irc server');
});

client.on('message', function (from, to, message) {
  console.log(from + ' => ' + to + ': ' + message);
});

client.on('pm', function (from, message) {
  console.log(from + ' => ME: ' + message);
});