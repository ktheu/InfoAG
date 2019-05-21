var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

let socket = require('socket.io');
let io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log("We have a new client: " + socket.id);

  socket.on('mouse',
    function (data) {
      socket.broadcast.emit('mouse', data);
    }
  );

  socket.on('disconnect',
    function () {
      console.log("Client has disconnected");
    }
  );
}


