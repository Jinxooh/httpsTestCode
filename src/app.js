// const Server = require('./server');

// const server = new Server();

// server.httpsListen(8443);

const express = require('express');
 
const bodyParser = require('body-parser');

const https = require('https');
const fs = require('fs');

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

const rootDir = '/etc/letsencrypt/live/jadoochat.standard.kr';
const options = {
  ca: fs.readFileSync(`${rootDir}/chain.pem`),
  key: fs.readFileSync(`${rootDir}/privkey.pem`),
  cert: fs.readFileSync(`${rootDir}/cert.pem`),
};

https.createServer(options, app).listen(port, () => console.log('Https server listening on port ', port));
