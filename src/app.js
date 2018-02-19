// const Server = require('./server');

// const server = new Server();

// server.httpsListen(8443);

const express = require('express');

const https = require('https');
const fs = require('fs');

// const lex = require('greenlock-express').create({
//   // set to https://acme-v01.api.letsencrypt.org/directory in production
//   configDir: '/etc/letsencrypt',
//   // server: 'https://acme-v01.api.letsencrypt.org/directory'
//   server: 'staging'

// // If you wish to replace the default plugins, you may do so here
// //
// // , challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }
// // , store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' })

// // You probably wouldn't need to replace the default sni handler
// // See https://git.daplie.com/Daplie/le-sni-auto if you think you do
// // , sni: require('le-sni-auto').create({})

// , approveDomains: approveDomains
// , renewWithin: 81 * 24 * 60 * 60 * 1000,
// renewBy: 80 * 24 * 60 * 60 * 1000,
// });

// function approveDomains(opts, certs, cb) {
//   // This is where you check your database and associated
//   // email addresses with domains and agreements and such

//   // console.log(certs);
//   // The domains being approved for the first time are listed in opts.domains
//   // Certs being renewed are listed in certs.altnames
//   if (certs) {
//     opts.domains = ['jadoochat.standard.kr'];
//   }
//   else {
//     opts.email = 'support@standard.kr';
//     opts.agreeTos = true;
//   }

//   // NOTE: you can also change other options such as `challengeType` and `challenge`
//   // opts.challengeType = 'http-01';
//   // opts.challenge = require('le-challenge-fs').create({});

//   cb(null, { options: opts, certs: certs });
// }

// // handles acme-challenge and redirects to https
// require('http').createServer(lex.middleware(require('redirect-https')())).listen(8080, function () {
//   console.log("Listening for ACME http-01 challenges on", this.address());
// });

// const app = require('express')();
// app.use('/', function (req, res) {
//   res.end('Hello, World!');
// });

// // handles your app
// require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(8443, function () {
//   console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
// });




// const redirectHttps = require('express-redirect-https');
// let redirectOptions = {
//   httpsPort: 8443,
// };

const app = require('express')();
// app.use(redirectHttps(redirectOptions));

const http = express.createServer();
http.get('*', function(req, res) {
  res.redirect('https://'+req.headers.host + req.url);
})

app.get('/', function(request, response, next) {
  response.send('HTTPS ALL THE THINGS!');
});

const rootDir = '/etc/letsencrypt/live/jadoochat.standard.kr';
const options = {
  ca: fs.readFileSync(`${rootDir}/chain.pem`),
  key: fs.readFileSync(`${rootDir}/privkey.pem`),
  cert: fs.readFileSync(`${rootDir}/cert.pem`),
};

http.listen(8080, function() { console.log('Http server listening on port ', 8080)});
// http.createServer(app).listen(8080, function() { console.log('Http server listening on port ', 8080)});
https.createServer(options, app).listen(8443, function() { console.log('Https server listening on port ', 8443)});
