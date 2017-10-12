/**
 *  https://www.tutorialspoint.com/expressjs/expressjs_url_building.htm
 * 
 *  npm init
 *		entry point: (index.js)
 *  npm install express --save
 * 
 *  node app.js
 *  
 *  	http://localhost:8081/123
 *  http://localhost:8081/things/tutorialspoint/12345
 *  http://localhost:8081/things/14554
 *  http://localhost:8081/things/145
 */
const express = require('express')
const app = express()

app.get('/:id', function(req, res){
   res.send('The id you specified is ' + req.params.id);
});

app.get('/things/:name/:id', function(req, res) {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

app.get('/things/:id([0-9]{5})', function(req, res){
   res.send('id: ' + req.params.id);
});

//Other routes here
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})