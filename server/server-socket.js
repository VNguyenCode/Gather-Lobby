const { v4: uuidv4 } = require("uuid");

let wss;
let clients = {};
let rooms = {}; // object mapping room to dict of players

const WebSocket = require("ws");

const broadcastToRoom = (room, msg) => {
  Object.keys(rooms[room]).forEach((clientId) => {
    clients[clientId].send(JSON.stringify(msg));
  });
};

const handleJoin = (client, info) => {
  client.room = info.room;
  if (!(client.room in rooms)) {
    rooms[client.room] = {};
  }
  rooms[client.room][client.uuid] = {
    name: "Anonymous",
    characterId: 1,
    bio: "",
  };
  broadcastToRoom(client.room, {
    event: "roomUpdate",
    info: rooms[client.room],
  });
};

const handleClientUpdate = (client, info) => {
  if (!client.room) return;
  rooms[client.room][client.uuid] = {
    ...rooms[client.room][client.uuid],
    ...info,
  };
  broadcastToRoom(client.room, {
    event: "roomUpdate",
    info: rooms[client.room],
  });
};

const handleMessage = (client, payload) => {
  if (!payload.info) return;
  if (payload.event === "join") {
    handleJoin(client, payload.info);
  } else if (payload.event === "clientUpdate") {
    handleClientUpdate(client, payload.info);
  }
};

module.exports = {
  init: (server) => {
    const wss = new WebSocket.Server({ server });
    wss.on("connection", (client) => {
      client.uuid = uuidv4();
      clients[client.uuid] = client;
      client.send(
        JSON.stringify({
          event: "connection",
          info: client.uuid,
        })
      );
      client.on("message", (payload) => {
        handleMessage(client, JSON.parse(payload));
      });
      client.on("close", () => {
        delete clients[client.uuid];
        if (client.room && rooms[client.room]) {
          delete rooms[client.room][client.uuid];
          if (rooms[client.room]) {
            broadcastToRoom(client.room, {
              event: "roomUpdate",
              info: rooms[client.room],
            });
          }
        }
      });
    });
  },
  clients: clients,
  getWS: () => wss,
};
