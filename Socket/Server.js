// const http = require('http').Server;
const WebSocketServer = require('ws').Server;

let ChattyWebSocketServer = {

  /**
   * @var {object} app Express Application Instance
   */
  app: null,

  /**
   * @var {object} http Node built-in http server
   */
  http: null,

  /**
   * @var {object} wss WEB Socket Server from ws package
   */
  wss: null,

  /**
   * Provide The express application which will be used to handle http traffic
   *
   * @param   {Object}  app  Express Application
   * @return  {Object} Instance of this object with provided app, http and wss fields
   */
  configServer: (app) => {

    this.http = require('http').createServer();
    this.app = app;

    // Init WebSocket Over our Http Server
    this.wss = new WebSocketServer({
      server: this.http,
    });

    // Pass all http requests to our express setup
    this.http.on('request', app);
    // Handle New Connection
    this.wss.on('connection', ChattyWebSocketServer.newClient);
    console.log('WEBSOCKET STARTED');

    return this;

  },

  newClient: (ws, req) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('NEW CLIENT', ip);
    ws.on('message', function incoming(message) {

      console.log(`received: ${message}`);

      ws.send(JSON.stringify({msg: 1111}));
    });
  },


};


/**
 * Pass the Express App to mount the http server on
 */
module.exports = ChattyWebSocketServer;
