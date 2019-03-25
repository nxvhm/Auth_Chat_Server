// const http = require('http').Server;
const WebSocketServer = require('ws').Server;
const url = require('url');

class ChattyWebSocketServer {

  /**
   * Provide The express application which will be used to handle http traffic
   *
   * @param   {Object}  app  Express Application
   * @return  {Object} Instance of this object with provided app, http and wss fields
   */
  constructor(app) {

    /**
     * @var {object} app Express Application Instance
     */
    this.app = app;

    /**
     * @var {object} http Node built-in http server
     */
    this.http = require('http').createServer();

    /**
     * Init WebSocket Over our Http Server
     * @var {object} wss WEB Socket Server from ws package
     */
    this.wss = new WebSocketServer({
      server: this.http,
    });

    // Pass all http requests to our express setup
    this.http.on('request', app);

    // Handle New Connection
    this.wss.on('connection', this.newClient);

    console.log('WEBSOCKET STARTED');

  }

  newClient(ws, req) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let request = url.parse(req.url, true);

    ws.uid = request.query.uid;
    console.log('NEW CLIENT', ip, request.query.uid);

    ws.on('message', function incoming(message) {

      console.log(`received: ${message}`);

      ws.send(JSON.stringify({msg: 1111}));
    });

    ws.on('close', function close() {
      console.log('DISCONNECTED', ws.uid);
    });
  }


};


/**
 * Pass the Express App to mount the http server on
 */
module.exports = ChattyWebSocketServer;
