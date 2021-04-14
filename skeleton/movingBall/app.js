
let x = 50;
let started = false;

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click',e => started = true);

const stopBtn = document.getElementById('stopBtn');
stopBtn.addEventListener('click',e => started = false);

function setup() {
  let canvas = createCanvas(400, 100);
  canvas.parent("canvas_position");
  noStroke();
}

function draw() {
  background(200);
  if (x > width) x = 0;
  if (started)   x+= 1;
  circle(x,50,20);
}

