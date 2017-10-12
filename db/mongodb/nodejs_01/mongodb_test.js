/**
 *  * Basic test of using mongodb in node.js
 * 
 * Make sure MongoDB is installed and the server instance is running Make sure
 * mongodb driver package is installed by npm
 * 
 * Examples from https://www.w3schools.com/nodejs/nodejs_mongodb.asp
 * 
 */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

// Create database
MongoClient.connect(url, function(err, db) {

	if (err)
		throw err;
	console.log("Database created!");

	db.listCollections("customers", function(err, names) {
		if (names.length > 0) {
			db.collection('customers').drop(function(err, res) {
				if (err)
					throw err;
				console.log("Collection 'customers' is dropped");
			});
		}
	});

	// Create collection
	db.createCollection("customers", function(err, res) {
		if (err)
			throw err;
		console.log("Collection created!");
	});

	// Insert Into Collection
	var myobj = [ {
		name : 'John',
		address : 'Highway 71'
	}, {
		name : 'Peter',
		address : 'Lowstreet 4'
	}, {
		name : 'Amy',
		address : 'Apple st 652'
	}, {
		name : 'Hannah',
		address : 'Mountain 21'
	}, {
		name : 'Michael',
		address : 'Valley 345'
	}, {
		name : 'Sandy',
		address : 'Ocean blvd 2'
	}, {
		name : 'Betty',
		address : 'Green Grass 1'
	}, {
		name : 'Richard',
		address : 'Sky st 331'
	}, {
		name : 'Susan',
		address : 'One way 98'
	}, {
		name : 'Vicky',
		address : 'Yellow Garden 2'
	}, {
		name : 'Ben',
		address : 'Park Lane 38'
	}, {
		name : 'William',
		address : 'Central st 954'
	}, {
		name : 'Chuck',
		address : 'Main Road 989'
	}, {
		name : 'Viola',
		address : 'Sideway 1633'
	} ];
	db.collection("customers").insertMany(myobj, function(err, res) {
		if (err)
			throw err;
		console.log("Number of documents inserted: " + res.insertedCount);
	});

	// Find
	db.collection("customers").find({}, {
		_id : false,
		name : true,
		address : true
	}).toArray(function(err, result) {
		if (err)
			throw err;
		console.log("Find documents: ");
		console.log(result);
	});

	// Query
	var query = {
		address : /^S/
	};
	db.collection("customers").find(query).toArray(function(err, result) {
		if (err)
			throw err;
		console.log("Find documents where the address starts with the letter 'S': ");
		console.log(result);
	});
	
	// Sort
	var mysort = {
		name : -1
	};
	db.collection("customers").find().sort(mysort).toArray(function(err, result) {
		if (err)
			throw err;
		console.log("Sort name by descending: ");
		console.log(result);
	});
	  

	// Delete
	var mydelete = {
		address : 'Mountain 21'
	};
	db.collection("customers").deleteOne(mydelete, function(err, obj) {
		if (err)
			throw err;
		console.log("1 document deleted");
	});
	  

	var mydelete2 = {
		address : /^O/
	};
	db.collection("customers").deleteMany(mydelete2, function(err, obj) {
		if (err)
			throw err;
		console.log(obj.result.n + " document(s) deleted");
	});

	// Update
	var myquery = {
		address : "Valley 345"
	};
	var newvalues = {
		name : "Mickey",
		address : "Canyon 123"
	};
	db.collection("customers").updateOne(myquery, newvalues, function(err, res) {
		if (err)
			throw err;
		console.log("1 document updated");
	});

	var myquery2 = {
		address : /^S/
	};
	var newvalues2 = {
		$set : {
			name : "Minnie"
		}
	};
	db.collection("customers").updateMany(myquery2, newvalues2, function(err, res) {
		if (err)
			throw err;
		console.log(res.result.nModified + " document(s) updated");
	});

	// Limit
	db.collection("customers").find().limit(5).toArray(function(err, result) {
		if (err)
			throw err;
		console.log(result);
	});

	db.close();
});
