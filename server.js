var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');

var router = express();
var server = http.createServer(router);


router.use(express.static(path.resolve(__dirname, 'public')));


// server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = server.address();
//   console.log("Localhost server listening at", addr.address + ":" + addr.port);
// });

server.listen(process.env.PORT || 3000, process.env.IP );
console.log("Localhost listening on port at " + 3000);