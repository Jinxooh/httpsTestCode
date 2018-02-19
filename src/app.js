// const Server = require('./server');

// const server = new Server();

// server.httpsListen(8443);

const express = require('express');

const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();
const http_redirect = express();

app.get('/', function(request, response, next) {
  response.send('HTTPS ALL THE THINGS!');
});
 
http_redirect.all('*', function(req, res, next) {
  if (/^http$/.test(req.protocol)) {
    var host = req.headers.host.replace(/:[0-9]+$/g, ""); // strip the port # if any
    return res.redirect(301, "https://" + host + req.url);
  } else {
    return next();
  }
});

const rootDir = '/etc/letsencrypt/live/jadoochat.standard.kr';
const options = {
  ca: fs.readFileSync(`${rootDir}/chain.pem`),
  key: fs.readFileSync(`${rootDir}/privkey.pem`),
  cert: fs.readFileSync(`${rootDir}/cert.pem`),
};

http.createServer(http_redirect).listen(8080, function() { console.log('Http server listening on port', 8080)});
https.createServer(options, app).listen(8443, function() { console.log('Https server listening on port', 8443)});
