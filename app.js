const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (coords) {
    io.emit(
      "location-message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
  });
  console.log("New user connected");
});

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(3000);
