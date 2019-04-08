// const http = require('http').Server;
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const url = require('url');
var ChattyWSS = {

  /**
   * @var {object} http Node built-in http server
   */
  http: null,

  /**
   * Init WebSocket Over our Http Server
   * @var {object} wss WEB Socket Server from ws package
   */
  wss: null,

  start: (http) => {

    ChattyWSS.http = http;

    ChattyWSS.wss = new WebSocketServer({
      server: http,
    });
    // Handle New Connection
    ChattyWSS.wss.on('connection', ChattyWSS.newClient);
  },

  newClient: (ws, req) => {
    // Get user ip
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // Parse GET params
    let request = url.parse(req.url, true);
    // Assign user id to the client connection object
    ws.uid = request.query.uid;
    console.log('NEW CLIENT', ip, request.query.uid);
    // On New Message Handler
    ws.on('message', ChattyWSS.incomingMessage);
    // Close connection
    ws.on('close', function closeConnection() {
      console.log('DISCONNECTED', ws.uid);
      // Broadcast new user event to clients to refresh list
      ChattyWSS.broadcast({
        type: 'event',
        name: 'new-user-online'
      }, ws.uid);
    });

    // Broadcast new user event to clients
    ChattyWSS.broadcast({
      type: 'event',
      name: 'new-user-online'
    }, ws.uid);

  },

  incomingMessage: (msg) => {
    console.log(`received: ${msg}`);
  },



  /**
   * Get list of currently connected user id
   * @return  {Array} array with user ids
   */
  getConnectedUserIds(e) {
    let users = [];

    this.wss.clients.forEach(client => {
      users.push(client.uid);
    });

    return users;
  },
  /**
   * Broadcast data to all connection clients
   * @param   {object} data Object containing data to send to client. This will be serialized to json
   * @param   {string} uid  The client to skipp
   * @return  {void}
   */
  broadcast: (data, uid = null) => {
    ChattyWSS.wss.clients.forEach(function each(client) {

      if (uid !== null && client.uid == uid) {
        return;
      }

      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }

    });
  }

};


/**
 * Pass the Express App to mount the http server on
 */
module.exports = ChattyWSS;
