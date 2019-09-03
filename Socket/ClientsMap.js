class ClientsMap {

  constructor(clients = []){
    this.clients = clients;
  }

  getClientConnection(clientId) {
    return this.clients[clientId];
  }

  setClientConnection(clientId, connection) {

    if (this.clients[clientId] === undefined) {
      this.clients[clientId] = [];
    }

    this.clients[clientId].push(connection);
  }

  disconnect(client) {
    if (this.clients[client.uid] === undefined) {
      return;
    }

    this.clients[client.uid].map((conn, index) => {
      if (conn.ip == client.ip && conn.userAgent == client.userAgent) {
        this.clients[client.uid].splice(index, 1);
      }
    });

    if (!this.clients[client.uid].length) {
      delete this.clients[client.uid];
    }
  }
}

module.exports = ClientsMap
