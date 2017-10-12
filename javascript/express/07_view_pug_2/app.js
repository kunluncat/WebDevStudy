/**
 *  https://gist.github.com/joepie91/c0069ab0e0da40cc7b54b8c2203befe1
 *  https://www.tutorialspoint.com/expressjs/expressjs_templating.htm
 *  
 *  npm init
 *		entry point: (app.js)
 *  npm install express --save
 *  
 *  npm install pug --save
 *  
 *  	http://localhost:8081/
 *  http://localhost:8081/1 	
 *  http://localhost:8081/2
 *  http://localhost:8081/3
 *  http://localhost:8081/4
 *  http://localhost:8081/5
 *  http://localhost:8081/6
 *  http://localhost:8081/7
 *  http://localhost:8081/components
 * 
 */

const express = require('express')
const app = express()
var path = require('path');

// Set directory to contain the templates ('views')
app.set('views', path.join(__dirname, 'views/'))
app.set('view engine', 'pug')

// Application level middleware to override request user
app.use((req, res, next) => {
    req.user = {username: 'Tom'};
    next();
});

// Rendering a page
app.get("/", (req, res) => {
    res.render("homepage");
});

//Rendering a page with locals
app.get("/1", (req, res) => {
    res.render("homepage1", {
        user: req.user
    });
});

// Using conditionals
app.get("/2", (req, res) => {
    res.render("homepage2", {
        user: req.user
    });
});

// Using loops
app.get("/3", (req, res) => {
    res.render("homepage3", {
        user: req.user,
        vegetables: [
            "carrot",
            "potato",
            "beet"
        ]
    });
});

// Request-wide locals
var router = express.Router()
router.use('/', function (req, res, next) {
	res.locals.user = req.user;
    next();
})
router.get("/", (req, res) => {
    res.render("homepage4", {
        vegetables: [
            "carrot",
            "potato",
            "beet"
        ]
    });
});
app.use('/4', router)

// Application-wide locals
var router2 = express.Router()
app.locals.siteName = "Vegetable World";
router2.use('/', function (req, res, next) {
	res.locals.user = req.user;
    next();
})
router2.get("/", (req, res) => {
    res.render("homepage5", {
        vegetables: [
            "carrot",
            "potato",
            "beet"
        ]
    });
});
app.use('/5', router2)

// Template inheritance in Pug
var router3 = express.Router()
router3.use('/', function (req, res, next) {
	res.locals.user = req.user;
    next();
})
router3.get("/", (req, res) => {
    res.render("homepage6", {
        vegetables: [
            "carrot",
            "potato",
            "beet"
        ]
    });
});
app.use('/6', router3)

// Static files
var router4 = express.Router()
app.use("/static", express.static(path.join(__dirname, "public")));
router4.use('/', function (req, res, next) {
	res.locals.user = req.user;
    next();
})
router4.get("/", (req, res) => {
    res.render("homepage7", {
        vegetables: [
            "carrot",
            "potato",
            "beet"
        ]
    });
});
app.use('/7', router4)

// Include and components
app.get('/components', function(req, res){
    res.render('content');
});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})