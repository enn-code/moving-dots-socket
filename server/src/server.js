import express from "express";
import http from "http";
import socketIo from "socket.io";

const app = express();
const server = http.Server(app);
const io = socketIo(server);

server.listen(80);

app.get("/", (req, res) => {
  res.send("placeholder!");
});

io.on("connection", socket => {
  console.log("player connected with ID:", socket.id);
  socket.emit("playerUpdate", { greetings: "player has entered" });

  socket.on("movement", data => {
    io.emit("broadcast", data);
  });
});
