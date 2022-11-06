const http = require("http"),
  express = require("express"),
  app = express(),
  socketIo = require("socket.io");
const fs = require("fs");

const server = http.Server(app).listen(8080);
const io = socketIo(server);
const clients = {};

app.use(express.static(__dirname + "/../build/"));
app.use(express.static(__dirname + "/../node_modules/"));

app.get("/", (req, res) => {
  const stream = fs.createReadStream(__dirname + "/../build/index.html");
  stream.pipe(res);
});

const addClient = socket => {
  console.log("New client connected", socket.id);
  clients[socket.id] = socket;
};

io.sockets.on("connection", socket => {
  let id = socket.id;

  addClient(socket);

  socket.on("move", data => {
    data.socket_id = id;
    console.log("id:", id);
    console.log("data:", data);
    socket.emit("move_done", "done moving");
  });

  socket.on("disconnect", () => {
    delete clients[socket.id];
    socket.emit("client_disconnect", id);
  });
});
