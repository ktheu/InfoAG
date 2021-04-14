
let x = [];
let y = [];
let ausgabe = "beginShape(LINES);\r\nendShape();";
let closed = false;

let filled = false;
let fill_value = '#FFFFFF';

let stroked = true;
let stroke_value = '#000000';
let strokeWeight_value = 2;

// beginShape();&#13;&#10;endShape();

const textarea = document.getElementById('textarea');
const btnUndo = document.getElementById('undo');
const btnClose = document.getElementById('close');
const btnUnfill = document.getElementById('unfill');
const btnNostroke = document.getElementById('no_Stroke')

const selColor = document.getElementById("fill_color");

selColor.addEventListener("input", fillShape);
selColor.addEventListener('click', fillShape);

const selStroke = document.getElementById("stroke_color");

selStroke.addEventListener("input", strokeShape);
selStroke.addEventListener('click', strokeShape);

btnClose.addEventListener('click', closeShape);
btnUndo.addEventListener('click', undo);
btnUnfill.addEventListener('click', unfillShape);
btnNostroke.addEventListener('click', unstrokeShape)

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas_position");
}

function getResult() {
  let result = "";
  let lf = ";\r\n"
  if (stroked) {
    result += `stroke('${stroke_value}')` + lf;
    result += `strokeWeight(${strokeWeight_value})` + lf;
  }
  else {
    result += "noStroke()" + lf;
  }

  result += filled ? `fill('${fill_value}')` + lf : "noFill()" + lf;

  if (x.length === 1) {
    result += `point(${int(x[0])}, ${int(y[0])})` + lf
    return result;
  }

  else if (x.length > 1) {

    result += "beginShape();\r\n";
    for (let i = 0; i < x.length; i++) {
      result += `vertex(${int(x[i])}, ${int(y[i])});\r\n`;
    }

    result += closed ? "endShape(CLOSE);\r\n" : "endShape();\r\n"
  }
  textarea.value = result;
  return result;

}

function draw() {
  background(200);
  eval(ausgabe);
}

function mousePressed() {
  if (0 <= mouseX && mouseX <= width
    && 0 <= mouseY && mouseY <= height && !closed) {
    x.push(mouseX);
    y.push(mouseY);
  }
  ausgabe = getResult();
}


function unstrokeShape() {
  ausgabe = "noStroke();\r\n";
  ausgabe += `fill('${selColor.value}');\r\n`;
  ausgabe += innerShape();
  ausgabe += "endShape(CLOSE);\r\n";
  textarea.value = ausgabe;

}

function undo() {
  if (closed) closed = false;
  else {
    x.pop();
    y.pop();
  }
  ausgabe = getResult();
}

function closeShape() {
  closed = true;
  ausgabe = getResult();
}

function fillShape() {
  filled = true;
  fill_value = selColor.value;
  ausgabe = getResult();
}

function strokeShape() {
  stroked = true;
  stroke_value = selStroke.value;
  ausgabe = getResult();

}

function unfillShape() {
  ausgabe = "beginShape();\r\n";
  for (let i = 0; i < x.length; i++) {
    ausgabe += `vertex(${int(x[i])}, ${int(y[i])});\r\n`;
  }
  ausgabe += "endShape(CLOSE);\r\n";
  textarea.value = ausgabe;
  console.log(ausgabe);
}

