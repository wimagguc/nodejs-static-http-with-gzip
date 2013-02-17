//
// Simple static HTTP server that uses gzip compression (if client accepts gzip encoding)
// by Richard Dancsi, www.wimagguc.com
//

var DOCUMENT_ROOT = './app';
var DIRECTORY_INDEX = '/index.html';

var port = process.env.PORT || 8080;

var zlib = require('zlib');
var http = require('http');
var path = require('path');
var fs = require('fs');

http.createServer(function(request, response) {

	// Remove query strings from uri
	if (request.url.indexOf('?')>-1) {
		request.url = request.url.substr(0, request.url.indexOf('?'));
	}

	// Remove query strings from uri
	if (request.url == '/') {
		request.url = DIRECTORY_INDEX;
	}
	var filePath = DOCUMENT_ROOT + request.url;

	var extname = path.extname(filePath);

	var acceptEncoding = request.headers['accept-encoding'];
	if (!acceptEncoding) {
		acceptEncoding = '';
	}

	path.exists(filePath, function(exists) {

		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					var raw = fs.createReadStream(filePath);

					if (acceptEncoding.match(/\bdeflate\b/)) {
						response.writeHead(200, { 'content-encoding': 'deflate' });
						raw.pipe(zlib.createDeflate()).pipe(response);
					} else if (acceptEncoding.match(/\bgzip\b/)) {
						response.writeHead(200, { 'content-encoding': 'gzip' });
						raw.pipe(zlib.createGzip()).pipe(response);
					} else {
						response.writeHead(200, {});
						raw.pipe(response);
					}
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});

}).listen(port);

console.log('Serving files on http://localhost:' + port);
