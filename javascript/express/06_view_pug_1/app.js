/**
 *  http://expressjs.com/en/guide/using-template-engines.html
 *  
 *  npm init
 *		entry point: (app.js)
 *  npm install express --save
 *  
 *  npm install pug --save
 *  
 *  http://localhost:8081/
 */
const express = require('express')
const app = express()

var path = require('path');

// Set directory to contain the templates ('views')
app.set('views', path.join(__dirname, 'views/'))
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
