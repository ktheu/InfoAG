let express = require('express');
let app = express();
let server = app.listen(3000);
app.use(express.static('public'));

let socket = require('socket.io');
let io = socket(server);

io.on('connection', newConnection);

function newConnection(socket) {
  console.log('Socket-id = ' + socket.id);
  socket.on('mouse',mouseMsg);


  function mouseMsg(data) {
    socket.broadcast.emit('mouse',data);
    //io.sockets.emit(data);
  }
}


