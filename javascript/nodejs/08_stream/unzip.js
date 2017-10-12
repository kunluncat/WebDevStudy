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
rl.setPrompt('Filename to unzip > ');
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
	var decryptStream = crypto.createDecipher('aes-256-cbc', password);

	var gzip = zlib.createGunzip();
	var readStream = fs.createReadStream('./' + file);

	readStream   // reads current file
	  .pipe(gzip)  // uncompresses
	  .pipe(decryptStream) // decrypts
	  .pipe(process.stdout)  // writes to terminal
	  .on('finish', function () {  // finished
	    console.log('done');
	  });
	
});

