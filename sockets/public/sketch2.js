let socket;

function setup() {
  createCanvas(400, 400);
  background(0);

  //socket = io.connect('http://192.168.xxx.xx:3000');
  socket = io.connect('localhost:3000');
  socket.on('mouse',
     function(data) {
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
}

function draw() {
  // Nothing
}

function mousePressed() {
  fill(255,0,0);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  var data = {
    x: mouseX,
    y: mouseY
  };

  socket.emit('mouse',data);
}


