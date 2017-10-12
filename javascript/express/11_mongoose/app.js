/**
 *  https://www.tutorialspoint.com/expressjs/expressjs_database.htm
 *  
 *  Make sure MongoDB installed
 *  Start MongoDB:
 *  		mongod
 *  Start MongoDB Shell:
 *  		mongo
 *  Create "my_db" database in the shell:
 *  		use my_db
 *  
 *  npm init
 *		entry point: (app.js)
 *
 *  npm install express --save
 *  npm install pug --save
 *  npm install mongoose --save
 *  npm install body-parser --save
 *  npm install multer --save
 *  
 *  node app.js
 *  
 *  http://localhost:3000/person
 *  http://localhost:3000/people
 *  curl -X PUT --data "name=James&age=22&nationality=American" http://localhost:3000/people/59c6051c830411e4433e5591
 *  curl -X DELETE http://localhost:3000/people/59c6051c830411e4433e5591
 *  
 */
var express = require('express');
var app = express();
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db', {
  useMongoClient: true,
  /* other options */
});

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.set('views', path.join(__dirname, 'views/'))
app.set('view engine', 'pug')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static('public'));

// create a new model.
var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);

// (1) Saving Documents
app.get('/person', function(req, res){
   res.render('person');
});

app.post('/person', function(req, res){
   console.log("submit");
   var personInfo = req.body; //Get the parsed information
   console.log(personInfo);
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

// (2) Retrieving Documents
Person.find(function(err, response){
   console.log(response);
});

// Model.find(conditions, callback)
//Person.find({name: "Ayush", age: 20}, function(err, response){
//      console.log(response);
//});
//Person.find({nationality: "Indian"}, "name", function(err, response){
//   console.log(response);
//});

// Model.findOne(conditions, callback)
//Person.findOne(function(err, response){
//   console.log(response);
//});

// Model.findById(id, callback)
//Person.findById("507f1f77bcf86cd799439011", function(err, response){
//   console.log(response);
//});

// view all people records
app.get('/people', function(req, res){
   Person.find(function(err, response){
      res.json(response);
   });
});

// (3) Updating Documents

// Model.update(condition, updates, callback)
//Person.update({age: 25}, {nationality: "American"}, function(err, response){
//   console.log(response);
//});

// Model.findOneAndUpdate(condition, updates, callback)
//Person.findOneAndUpdate({name: "Ayush"}, {age: 40}, function(err, response) {
//   console.log(response);
//});

// Model.findByIdAndUpdate(id, updates, callback)
//Person.findByIdAndUpdate("507f1f77bcf86cd799439011", {name: "James"}, function(err, response){
//   console.log(response);
//});

// create a route to update people
// To test this route, enter the following in your terminal (replace the id with an id from your created people)
// curl -X PUT --data "name=James&age=20&nationality=American" http://localhost:3000/people/507f1f77bcf86cd799439011
app.put('/people/:id', function(req, res){
   Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
      if(err) res.json({message: "Error in updating person with id " + req.params.id});
      res.json(response);
   });
});

// (4) Deleting Documents

// Model.remove(condition, [callback])
// Person.remove({age:20});

// Model.findOneAndRemove(condition, [callback])
// Person.findOneAndRemove({name: "Ayush"});

// Model.findByIdAndRemove(id, [callback])
// Person.findByIdAndRemove("507f1f77bcf86cd799439011");

// create a route to delete people from our database.
// To check the output, use the following curl command −
// curl -X DELETE http://localhost:3000/people/507f1f77bcf86cd799439011
app.delete('/people/:id', function(req, res){
   Person.findByIdAndRemove(req.params.id, function(err, response){
      if(err) res.json({message: "Error in deleting record id " + req.params.id});
      else res.json({message: "Person with id " + req.params.id + " removed."});
   });
});

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
