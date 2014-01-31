'use strict';

var express = require('express');
var path = require('path');

var port = process.env.PORT || 3000;
var files = process.env.FILES || 'src';

var server = express(); // better instead

// Define our static file directory, it will be 'public'
var staticFilePath = path.join(__dirname, files);
server.use('/', express.static(staticFilePath));

server.listen(port);
console.log('Formly is rocking on port', port);