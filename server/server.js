var express = require('express');
var app = express();
var open = require('open');
var serverPort = (4443);
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var sockets = {};
var users = {};
function sendTo(connection, message) {
  connection.send(message);
}

app.get('/', function(req, res){
  console.log('get /');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("User connected");

  socket.on('disconnect', function () {
    console.log("User disconnected");
    if(socket.name){
      socket.broadcast.to("chatroom").emit('notification', {type: "disconnection", username: socket.name})
      delete sockets[socket.name];
      delete users[socket.name];
    }
  });

  socket.on('message', function(data){

    switch (data.type) {

      case "login":
      console.log(data.name + " has joined the room.");

      if(sockets[data.name]) {
        sendTo(socket, {
          type: "login",
          success: false
        });
      } else {
        var templist = users;
        sockets[data.name] = socket;
        socket.name = data.name;
        socket.join("chatroom");
        socket.broadcast.to("chatroom").emit('notification',{ type: "connection", username: data.name})
        users[data.name] = socket.id

        sendTo(socket, {
          type: "login",
          success: true,
          username: data.name,
          userlist: templist
        });
      }
      break;
      case "text":
        console.log(data.sender + " says " + data.text);
        socket.broadcast.to("chatroom").emit('userMessage',{ type: "text", message: data})
      break;
      default:
      sendTo(socket, {
        type: "error",
        message: "Command not found: " + data.type
      });
      break;
    }
  });
});

server.listen(serverPort, function(){
  console.log('server up and running at %s port', serverPort);
});
