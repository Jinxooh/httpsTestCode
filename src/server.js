const express = require('express');
 
const bodyParser = require('body-parser');

const https = require('https');
const fs = require('fs');

const routes = require('./routes');

class Server {
  constructor() {
    this.app = express();
    this.middleware();
  }

  middleware() {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/', routes);
  }

  httpsListen(port) {
    const { app } = this;
    const rootDir = '/etc/letsencrypt/live/jadoochat.standard.kr';
    const options = {
      ca: fs.readFileSync(`${rootDir}/chain.pem`),
      key: fs.readFileSync(`${rootDir}/privkey.pem`),
      cert: fs.readFileSync(`${rootDir}/cert.pem`),
    };

    https.createServer(options, app).listen(port, () => console.log('Https server listening on port ', port));
  }
}

module.exports = Server;