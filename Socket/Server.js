// const http = require('http').Server;
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const url = require('url');
const ClientsMap = require('./ClientsMap');
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

  clientMap: new ClientsMap(),

  start: (http) => {

    ChattyWSS.http = http;

    ChattyWSS.wss = new WebSocketServer({
      server: http,
    });
    // Handle New Connection
    ChattyWSS.wss.on('connection', ChattyWSS.newClient);
  },

  newClient: (ws, req) => {

    // Parse GET params
    let request = url.parse(req.url, true);

    // Assign user id to the client connection object
    ws.uid        = request.query.uid;
    ws.userAgent  = req.headers['user-agent'];
    ws.ip         = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // On New Message Handler
    ws.on('message', ChattyWSS.incomingMessage);

    // On Close connection
    ws.on('close', function(){

      // Remove connection from clients map
      ChattyWSS.clientMap.disconnect(ws);
      // Broadcast new user event to clients to refresh list
      ChattyWSS.broadcast({
        type: 'event',
        name: 'new-user-online'
      }, ws.uid);

      console.log('DISCONNECTED', ws.uid);
    });

    ChattyWSS.clientMap.setClientConnection(ws.uid, ws);

    // Broadcast new user event to clients
    ChattyWSS.broadcast({
      type: 'event',
      name: 'new-user-online'
    }, ws.uid);


    console.log('NEW CLIENT', ws.ip, ws.uid);
  },

  incomingMessage: (message) => {
    message = JSON.parse(message);
    console.log(`RECEIVED: ${message}`);
    console.log(message.type);
    // Send new Private Message
    if (message.type && message.type == 'new-pm') {
      ChattyWSS.sendMsgToReceiver({
        type: 'event',
        name: 'new-pm',
        body: message.body,
      }, message.receiver_id);
    }
  },

  /**
   * Get list of currently connected user id
   * @return  {Array} array with user ids
   */
  getConnectedUserIds(e) {

    return Object.keys(this.clientMap.clients);
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
  },

  sendMsgToReceiver(msg, uid) {
    if (!msg || !uid) {
      return false;
    }

    console.log(uid, msg);
    let connections = this.clientMap.getClientConnection(uid);
    console.log(ChattyWSS.clientMap);

    if (connections === undefined || !connections.length) {
      return false;
    }
    connections.forEach((connection, index) => {
      connection.send(JSON.stringify(msg));
      return "msg send";
    });
  }

};


/**
 * Pass the Express App to mount the http server on
 */
module.exports = ChattyWSS;
