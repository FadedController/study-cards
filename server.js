const PORT = 8080;

// Express setup
const express = require("express");
const app = express();
const server = require("http").createServer(app);

//WS setup
const ws = require("ws");
const wss = new ws.Server({ server: server });

//WS handler
wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.on("close", (idx) => {
    console.log(`Client ${idx} disconnected`);
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
