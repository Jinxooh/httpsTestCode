// const Server = require('./server');

// const server = new Server();

// server.httpsListen(8443);

const express = require('express');
 
const bodyParser = require('body-parser');

const https = require('https');
const fs = require('fs');

const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.get('/', function(req, res) {
  res.send('hello get world');
});

app.post('/', function(req, res) {
  res.send('hello post world');
});

const rootDir = '/etc/letsencrypt/live/jadoochat.standard.kr';
const options = {
  ca: fs.readFileSync(`${rootDir}/chain.pem`),
  key: fs.readFileSync(`${rootDir}/privkey.pem`),
  cert: fs.readFileSync(`${rootDir}/cert.pem`),
};

https.createServer(options, app).listen(8443, () => console.log('Https server listening on port ', 8443));