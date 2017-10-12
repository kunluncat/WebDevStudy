/**
 *  http://expressjs.com/en/guide/using-middleware.html
 *  
 *  npm init
 *		entry point: (app.js)
 *  npm install express --save
 *  
 *  npm install cookie-parser
 * 
 *  node app.js
 *  http://localhost:8081/
 *  
 *  Install Postman: https://www.getpostman.com/
 * 
 *  try following by using Postman:
 * 
 * 		Get 		--> http://localhost:8081/
 * 		Post 	--> http://localhost:8081/
 * 		Get 		--> http://localhost:8081/user/0
 * 		Get		--> http://localhost:8081/user/12
 * 		Get 		--> http://localhost:8081/books
 * 		Get 		--> http://localhost:8081/hello
 * 		Get 		--> http://localhost:8081/cookie
 */
const express = require('express')
const app = express()

// Application-level middleware
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
}, function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // regular account
  res.send('regular')
})

// handler for the /user/:id path, which indicate special account
app.get('/user/:id', function (req, res, next) {
  res.send('special')
})

// Router-level middleware
var router = express.Router()

router.use('/books/', function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.get('/books/', function (req, res) {
  res.send('Book!')
})


// Write middleware yourself
var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use('/hello/', requestTime)

app.get('/hello/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

// Third party middleware
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/cookie', function(req, res) {
   console.log("Cookies: ", req.cookies)
    res.send('Cookies!')
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})