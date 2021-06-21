const PORT = 8080;

// Express setup
const express = require("express");
const app = express();
const server = require("http").createServer(app);

//WS setup
const ws = require("ws");
const wss = new ws.Server({ server: server });

const Rooms = [];

/**A WebSocket room identified with a unique id */
class Room {
  /**Initialize the Room with an Id */
  constructor(id) {
    this.id = id;
    this.clients = [];
    this.currentData = {
      roomId: id,
      currentData: "",
      isConnected: true,
    };
    console.log(`Created room ${id}`);
    return this;
  }

  /**Takes a client and adds it to the Room's clients. Updates the client with most
   * recent data and set's up an event listener */
  addClient(client) {
    this.clients.push(client);
    this.sendUpdate(client);
    client.on("message", (data) => {
      this.broadcast(JSON.parse(data));
    });
    client.on("close", () => {
      client.removeAllListeners();
    });
    console.log(`Added client to room ${this.id}`);
    return this;
  }

  /**Takes a client and sends the current Room Data to it as a string */
  sendUpdate(client) {
    client.send(JSON.stringify(this.currentData));
    return this;
  }

  /** Takes parsed JSON, sets it as current Room Data and sends it to all clients */
  broadcast(data) {
    this.currentData = data;
    this.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(this.currentData));
      }
    });
    return this;
  }
}

//WS handler
wss.on("connection", (client) => {
  client.on("message", (data) => {
    const parsedData = JSON.parse(data);
    // New client
    if (!parsedData.isConnected) {
      if (Rooms.length === 0) {
        Rooms.push(new Room(parsedData.roomId).addClient(client));
      } else {
        Rooms.forEach((r) => {
          if (r.id === parsedData.roomId) {
            r.addClient(client);
          } else {
            Rooms.push(new Room(parsedData.roomId).addClient(client));
          }
        });
      }
    }
  });
});

// Test routes
app.get("/api/customers", (req, res) => {
  const customers = [
    { name: "Axel Padilla", id: 1 },
    { name: "John Doe", id: 2 },
  ];
  res.json(customers);
});

server.listen(PORT);
