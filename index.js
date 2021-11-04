const express = require("express");
const app = express();
const router = require("./routes/index");

let msn = [];

//Archivos estáticos
app.use(express.static(__dirname + "/public"));

//Server
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3003;

//Socket
const { Server } = require("socket.io");
const io = new Server(server);

//Conexión Socket
io.on("connection", (socket) => {
  console.log("Cliete conectado");

  socket.on("message_client", (data) => {
    console.log(data);
  });

  //Escuchar chat cliente
  socket.on("dataMsn", (data) => {
    msn.push(data);
    console.log(msn);
    io.sockets.emit("message_back", msn);
  });
});

//Router
app.use("/api", router);

server.listen(port, () => {
  console.log("Server running on " + port);
});
