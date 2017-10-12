/**
 *  https://www.codementor.io/codeforgeek/build-website-from-scratch-using-expressjs-and-bootstrap-du107sby7
 *  
 *  Create and edit package.json
 *  
 *   {
 *     "name" : "website-using-express",
 *     "version" : "0.0.1",
 *     "scripts" : {
 *       "start" : "node Server.js"
 *     },
 *     "dependencies" : {
 *       "express" : "latest"
 *     }
 *   }
 *   
 *   Install the dependency defined in package.json by
 *   
 *   npm install 
 *   
 *  Start:
 *   npm start
 *  
 *  View:
 * 	 http://localhost:3000/
 */
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});