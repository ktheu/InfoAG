let rows = 3;
let cols = 3;
let grid = [];
let groesse = 100;
let schalter = true;
let gruen = '#00FF00';
let socket;

function setup() {
  createCanvas(303, 303);
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Tile(i, j, groesse);
    }
  }

  //socket = io.connect('http://192.168.123.45:3000');
  socket = io.connect('localhost:3000');
  socket.on('mouse',
    function(data) {
      let i = I(data.x);
      let j = J(data.y);
      grid[i][j].zeichen = schalter ? 'X' : 'O';
      schalter = !schalter;
    }
  );
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].display();
    }
  }
  check();
}

// berechnet aus mouseX den i-Index der Kachel
function I(x) {
  return Math.floor((x - 2) / groesse);
}

// berechnet aus mouseY den j-Index der Kachel
function J(y) {
  return Math.floor((y - 2) / groesse);
}

function mousePressed() {
  let i = I(mouseX);
  let j = J(mouseY);

  grid[i][j].zeichen = schalter ? 'X' : 'O';
  schalter = !schalter;

  var data = {
    x: mouseX,
    y: mouseY
  };

  socket.emit('mouse',data);
}

function check() {

  for (let k = 0; k < 3; k++) {
    let zeile = grid[0][k].zeichen + grid[1][k].zeichen + grid[2][k].zeichen;
    if (zeile === 'XXX' || zeile === 'OOO') {
      grid[0][k].farbe = gruen;
      grid[1][k].farbe = gruen;
      grid[2][k].farbe = gruen;
    }
    let spalte = grid[k][0].zeichen + grid[k][1].zeichen + grid[k][2].zeichen;
    if (spalte === 'XXX' || spalte === 'OOO') {
      grid[k][0].farbe = gruen;
      grid[k][1].farbe = gruen;
      grid[k][2].farbe = gruen;
    }
  }
  let diagonale1 = grid[0][0].zeichen + grid[1][1].zeichen + grid[2][2].zeichen;
  if (diagonale1 === 'XXX' || diagonale1 === 'OOO') {
    grid[0][0].farbe = gruen;
    grid[1][1].farbe = gruen;
    grid[2][2].farbe = gruen;
  }

  let diagonale2 = grid[0][2].zeichen + grid[1][1].zeichen + grid[2][0].zeichen;
  if (diagonale2 === 'XXX' || diagonale2 === 'OOO') {
    grid[0][2].farbe = gruen;
    grid[1][1].farbe = gruen;
    grid[2][0].farbe = gruen;
  }
}

class Tile {

  constructor(i, j, groesse) {
    this.i = i;
    this.j = j;
    this.groesse = groesse;
    this.farbe = null;
    this.zeichen = null;
  }

  display() {
    strokeWeight(2);
    if (this.farbe !== null) {
      fill(this.farbe);
    } else {
      noFill();
    }

    rect(2 + this.i * this.groesse, 2 + this.j * this.groesse, this.groesse, this.groesse);

    if (this.zeichen !== null) {
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(this.groesse * 0.7);
      text(this.zeichen, (this.i + 0.5) * this.groesse, (this.j + 0.6) * this.groesse);
    }
  }
}
