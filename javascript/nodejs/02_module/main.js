/**
 *  https://www.w3schools.com/nodejs/nodejs_modules.asp
 *  
 *  node main.js
 *  http://localhost:8080/
 */
var http = require('http');
var dt = require('./datetime');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time are currently: " + dt.myDateTime());
    res.end();
}).listen(8080);
