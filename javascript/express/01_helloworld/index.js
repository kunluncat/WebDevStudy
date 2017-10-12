/**
 * 
 * https://expressjs.com/en/starter/hello-world.html
 * 
 * npm init
 *		entry point: (index.js)
 * npm install express --save
 * 
 * node index.js
 * http://localhost:3000/
 * 
 */

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})