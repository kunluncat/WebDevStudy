/**
 *  http://localhost:8080
 */
var http = require("http"), fs = require("fs");
http.createServer(function (request, response) {
	// Check if user requests 
	if (request.url == '/') {
		fs.readFile('test.txt', 'utf-8', function (error, data) {
			response.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			// Increment the number obtained from file.
			data = parseInt(data) + 1;
			fs.writeFile('test.txt', data);
			response.end('This page was refreshed ' + data + ' times');
		});
	}
	else {
		// Indicate that requested file was not found.
		response.writeHead(404);
		// And end request without sending any data.
		response.end();
	}
}).listen(8080);
