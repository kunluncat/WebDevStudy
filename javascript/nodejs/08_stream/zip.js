/**
 * 
 * https://www.airpair.com/javascript/node-js-tutorial
 * 
 */

var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');
var readline = require('readline');

var file;

var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('Filename to zip > ');
rl.prompt();
rl.on('line', function(line) {
	fs.stat(line, function(err, stat) {
	    if(err == null) {
	        console.log('File exists');
	        file = line;
			rl.close();
	    } else if(err.code == 'ENOENT') {
	    		console.log('File does not exist');
	    		rl.prompt();
	    } else {
	        console.log('Some other error: ', err.code);
	        rl.prompt();
	    }
	});
}).on('close',function(){

	var password = new Buffer(process.env.PASS || 'password');
	var encryptStream = crypto.createCipher('aes-256-cbc', password);
	
	var gzip = zlib.createGzip();
	var readStream = fs.createReadStream('./' + file); // current file
	var writeStream = fs.createWriteStream('./' + file + '.gz');
	
	readStream   // reads current file
	  .pipe(encryptStream) // encrypts
	  .pipe(gzip)  // compresses
	  .pipe(writeStream)  // writes to out file
	  .on('finish', function () {  // all done
	    console.log('done');
	  });

});