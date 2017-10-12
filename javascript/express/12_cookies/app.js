/**
 *  https://www.tutorialspoint.com/expressjs/expressjs_cookies.htm
 *  
 *  npm init
 *		entry point: (app.js)
 *
 *  npm install express --save
 *  npm install cookie-parser --save
 *  
 *  node app.js
 *  
 *  http://localhost:3000/foo
 *  http://localhost:3000/clear_cookie_foo
 */
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set a new cookie
// You can check if cookie is set in Javascript console by
// console.log(document.cookie);
app.get('/foo', function(req, res){
   res.cookie('foo', 'foo_val').send('cookie set'); //Sets name = express
});

////Expires after 360000 ms from the time it is set.
//res.cookie(name, 'value', {expire: 360000 + Date.now()}); 
//
////This cookie also expires after 360000 ms from the time it is set.
//res.cookie(name, 'value', {maxAge: 360000});

// Delete a cookie
app.get('/clear_cookie_foo', function(req, res){
   console.log('Cookies to clear: ', req.cookies);
   res.clearCookie('foo');
   res.send('cookie foo cleared');
});

app.listen(3000);

