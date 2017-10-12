/**
 * 
 * https://expressjs.com/en/starter/hello-world.html
 * 
 * npm init
 *		entry point: (app.js)
 * npm install express --save
 * 
 * node app.js
 * http://localhost:3000/
 * 
 * Install Postman: https://www.getpostman.com/
 * 
 * try following by using Postman:
 * 
 * 		Get 		--> http://localhost:3000/
 * 		Post 	--> http://localhost:3000/
 * 		Put 		--> http://localhost:3000/user/
 * 		Delete	--> http://localhost:3000/user/
 * 		Get		--> http://localhost:3000/about
 * 		Get		--> http://localhost:3000/acd
 * 		Get		--> http://localhost:3000/abbcd
 * 		Get		--> http://localhost:3000/abxcd
 * 		Get		--> http://localhost:3000/abe
 * 		Get		--> http://localhost:3000/apple
 * 		Get		--> http://localhost:3000/butterfly
 * 		Get 		--> http://localhost:3000/users/34/books/8989
 * 		Get 		--> http://localhost:3000/test/b
 * 		Get 		--> http://localhost:3000/test/c
 * 		Get 		--> http://localhost:3000/test/d
 * 		Get 		--> http://localhost:3000/book
 * 		Post 	--> http://localhost:3000/book
 * 		put 		--> http://localhost:3000/book
 * 		Get 		--> http://localhost:3000/secret
 */

const express = require('express')
const app = express()

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

// PUT method route
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

// DELETE method route
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

// This route path will match requests to /about.
app.get('/about', function (req, res) {
  res.send('about')
})

// This route path will match acd and abcd
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd')
})

// This route path will match abcd, abbcd, abbbcd, and so on.
app.get('/ab+cd', function (req, res) {
  res.send('ab+cd')
})

// This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
app.get('/ab*cd', function (req, res) {
  res.send('ab*cd')
})

// This route path will match /abe and /abcde.
app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})

// This route path will match anything with an “a” in the route name.
app.get(/a/, function (req, res) {
  res.send('/a/')
})

// This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/')
})

// Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})

// Multiple call backs
app.get('/test/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

// Call backs in arrays
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}
var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}
var cb2 = function (req, res) {
  res.send('Hello from C!')
}
app.get('/test/c', [cb0, cb1, cb2])

// Mixed array and independent callbacks
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}
var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}
app.get('/test/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})

// You can create chainable route handlers for a route path by using app.route()
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
  
// There is a special routing method, app.all(), which is not derived from any HTTP method. 
// This method is used for loading middleware functions at a path for all request methods.
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})