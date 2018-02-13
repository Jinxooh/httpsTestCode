const Server = require('./server');

const server = new Server();

server.httpsListen(8443);