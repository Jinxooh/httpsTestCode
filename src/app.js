// const Server = require('./server');

// const server = new Server();

// server.httpsListen(8443);

const express = require('express');

const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();
const redirectHttps = require('express-redirect-https');
let redirectOptions = {
  allowForwardForHeader: true,
  httpsPort: 8443,
};

app.use(redirectHttps(redirectOptions));

app.get('/', function(request, response, next) {
  response.send('HTTPS ALL THE THINGS');
});
 
// Or for a single 
app.get('/', redirectHttps(redirectOptions), function(request, response, next) {
  response.send('HTTPS ALL THE THINGS');
});

const rootDir = '/etc/letsencrypt/live/jadoochat.standard.kr';
const options = {
  ca: fs.readFileSync(`${rootDir}/chain.pem`),
  key: fs.readFileSync(`${rootDir}/privkey.pem`),
  cert: fs.readFileSync(`${rootDir}/cert.pem`),
};

http.createServer(app).listen(8080, function() { console.log('Http server listening on port ', 8080)});
// http.createServer(app).listen(8080, function() { console.log('Http server listening on port ', 8080)});
https.createServer(options, app).listen(8443, function() { console.log('Https server listening on port ', 8443)});
