/**
 *  https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm
 *  
 *  npm init
 *		entry point: (app.js)
 *  npm install express --save
 * 
 *  node app.js
 *  http://localhost:8081/
 *  
 *  http://localhost:8081/images/logo.png
 */

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})
