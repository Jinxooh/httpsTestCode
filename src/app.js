// const Server = require('./server');

// const server = new Server();

// server.httpsListen(8443);

const express = require('express');

const https = require('https');
const http = require('http');
const fs = require('fs');

const lex = require('greenlock-express').create({
  // set to https://acme-v01.api.letsencrypt.org/directory in production
  // configDir: '/etc/letsencrypt/live/jadoochat.standard.kr',
  server: 'production'

// If you wish to replace the default plugins, you may do so here
//
, challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }
, store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' })

// You probably wouldn't need to replace the default sni handler
// See https://git.daplie.com/Daplie/le-sni-auto if you think you do
// , sni: require('le-sni-auto').create({})

, approveDomains: approveDomains
});

function approveDomains(opts, certs, cb) {
  // This is where you check your database and associated
  // email addresses with domains and agreements and such

  console.log(certs);
  // The domains being approved for the first time are listed in opts.domains
  // Certs being renewed are listed in certs.altnames
  if (certs) {
    opts.domains = ['jadoochat.standard.kr'];
  }
  else {
    opts.email = 'cjswp122@gmail.com';
    opts.agreeTos = true;
  }

  // NOTE: you can also change other options such as `challengeType` and `challenge`
  opts.challengeType = 'http-01';
  opts.challenge = require('le-challenge-fs').create({});

  cb(null, { options: opts, certs: certs });
}

// handles acme-challenge and redirects to https
require('http').createServer(lex.middleware(require('redirect-https')())).listen(8080, function () {
  console.log("Listening for ACME http-01 challenges on", this.address());
});

var app = require('express')();
app.use('/', function (req, res) {
  res.end('Hello, World!');
});

// handles your app
require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(8443, function () {
  console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
});




// const redirectHttps = require('express-redirect-https');
// let redirectOptions = {
//   httpsPort: 8443,
// };

// app.use(redirectHttps(redirectOptions));

// app.get('/', function(request, response, next) {
//   response.send('HTTPS ALL THE THINGS');
// });
 
// // Or for a single 
// app.get('/', redirectHttps(redirectOptions), function(request, response, next) {
//   response.send('HTTPS ALL THE THINGS');
// });

// const rootDir = '/etc/letsencrypt/live/jadoochat.standard.kr';
// const options = {
//   ca: fs.readFileSync(`${rootDir}/chain.pem`),
//   key: fs.readFileSync(`${rootDir}/privkey.pem`),
//   cert: fs.readFileSync(`${rootDir}/cert.pem`),
// };

// http.createServer(app).listen(8080, function() { console.log('Http server listening on port ', 8080)});
// // http.createServer(app).listen(8080, function() { console.log('Http server listening on port ', 8080)});
// https.createServer(options, app).listen(8443, function() { console.log('Https server listening on port ', 8443)});
