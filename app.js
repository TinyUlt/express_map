// const express = require('express')
// const app = express()
// app.use(express.static('public'))
// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(3000, () => console.log('Example app listening on port 3000!'))

// var https = require('https');
// var fs = require('fs');
// var express = require('express');

// var host = 'xxx.compute.amazonaws.com'; // Input you domain name here.
// var options = {
//     key: fs.readFileSync( './' + host + '.key' ),
//     cert: fs.readFileSync( './' + host + '.cert' ),
//     requestCert: false,
//     rejectUnauthorized: false
// };

// var httpApp = express();
// var app = express();
// app.get('/', function (req, res) {
//   res.send('hi HTTPS');
// });
// httpApp.get('/', function (req, res) {
//   res.send('hi HTTP');
// });
// httpApp.listen(3001, function () {
//   console.log('http on 3001');
// });
// var server = https.createServer( options, app );

// server.listen( 3000, function () {
//     console.log( 'https on 3000' );
// } );
var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('private.pem', 'utf8');
var certificate = fs.readFileSync('file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
 
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 80;
var SSLPORT = 443;
app.use(express.static('public'))
httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
 
// Welcome
app.get('/', function(req, res) {
    if(req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }
});
