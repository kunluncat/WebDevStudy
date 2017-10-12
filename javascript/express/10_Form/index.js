/**
 *  https://www.tutorialspoint.com/expressjs/expressjs_form_data.htm
 *  
 *  npm init
 *		entry point: (index.js)
 *  npm install express --save
 *  npm install pug --save
 *  npm install --save body-parser multer
 *  
 *  node index.js
 *  
 *  	http://localhost:3000
 */

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.get('/', function(req, res){
   res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});
app.listen(3000);