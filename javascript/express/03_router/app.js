/**
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
 * 		Get 		--> http://localhost:3000/birds
 * 		Get 		--> http://localhost:3000/birds/about
 * 		Get 		--> http://localhost:3000/wiki
 * 		Get		--> http://localhost:3000/wiki/about
 *
 */
const express = require('express')
const app = express()

var birds = require('./birds')
app.use('/birds', birds)

var wiki = require('./wiki.js');
app.use('/wiki', wiki);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})