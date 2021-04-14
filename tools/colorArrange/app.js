
const btn = document.getElementById('btn');
const area = document.getElementById('area');
let wahl0 = document.getElementById('wahl0');
let wahl1 = document.getElementById('wahl1');
let wahl2 = document.getElementById('wahl2');
let wahl3 = document.getElementById('wahl3');
let wahl4 = document.getElementById('wahl4');

const wahl0color = document.getElementById('wahl0color');
const wahl1color = document.getElementById('wahl1color');
const wahl2color = document.getElementById('wahl2color');
const wahl3color = document.getElementById('wahl3color');
const wahl4color = document.getElementById('wahl4color');

btn.addEventListener("click", resetColString);
area.addEventListener("paste", doPaste);
area.addEventListener("keyup", doKeyup);

wahl0color.addEventListener("input", wahl0color_func)
wahl1color.addEventListener("input", wahl1color_func)
wahl2color.addEventListener("input", wahl2color_func)
wahl3color.addEventListener("input", wahl3color_func)
wahl4color.addEventListener("input", wahl4color_func)

// Col-String
let colstring = "// Happy-Adress\n";
colstring += "let colorArray = ['#010440','#BF9004','#F2C744','#D9D8D7','#8C3B0D']";
area.value = colstring;

let colstring_reset = colstring;

// Col-Variables
let colorArray;
let background_col;
let fill1_col;
let fill2_col;
let stroke_col;
let text_col;
let comment;

function doPaste(e) {
  colstring = (e.clipboardData || window.clipboardData).getData('text');
  colstring_reset = colstring;
}

function resetColString() {
  colstring = colstring_reset;
  area.value = colstring;
  string2var();
  wahl0.value = 0;
  wahl1.value = 1;
  wahl2.value = 2;
  wahl3.value = 3;
  wahl4.value = 4;
}

function string2var() {
  // from colstring to col-variables
  let tmp = [];
  let myregexp = /#[0-9A-Z]{6}/g;
  let match = myregexp.exec(colstring);
  while (match != null) {
    for (let i = 0; i < match.length; i++) {
      tmp.push(str(match[i]));
    }
    match = myregexp.exec(colstring);
  }

  if (tmp.length == 5) {     // if 5 valid colors in area
    colorArray = tmp;
    background_col = tmp[0];
    fill1_col = tmp[1];
    fill2_col = tmp[2];
    stroke_col = tmp[3];
    text_col = tmp[4];

    wahl0color.value = background_col;
    wahl1color.value = fill1_col;
    wahl2color.value = fill2_col;
    wahl3color.value = stroke_col;
    wahl4color.value = text_col;
  }

    comment = "";
    myregexp = /\/\/.*/;
    match = myregexp.exec(colstring);
    if (match != null)
       comment = match[0];
}

function doKeyup() {
  colstring = area.value;
  string2var();
}

function setup() {
  let canvas = createCanvas(400, 300);
  canvas.parent("canvas_position");
  string2var();
}

function wahldo() {

  background_col = colorArray[wahl0.value];
  fill1_col = colorArray[wahl1.value];
  fill2_col = colorArray[wahl2.value];
  stroke_col = colorArray[wahl3.value];
  text_col = colorArray[wahl4.value];
  var2String();

  
}

function wahl0color_func() {
  colorArray[0] = wahl0color.value;
  wahldo();
}

function wahl1color_func() {
  colorArray[1] = wahl1color.value;
  wahldo();
}

function wahl2color_func() {
  colorArray[2] = wahl2color.value;
  wahldo();
}

function wahl3color_func() {
  colorArray[3] = wahl3color.value;
  wahldo();
}

function wahl4color_func() {
  colorArray[4] = wahl4color.value;
  wahldo();
}


function var2String() {
  let tmp = "";
  if (comment.length > 0) tmp += comment + '\n';
  tmp += `let colorArray = ['${background_col}','${fill1_col}','${fill2_col}','${stroke_col}','${text_col}'];`
  area.value = tmp;

}


function draw() {
  background(background_col);
  strokeWeight(4);
  stroke(stroke_col);
  fill(fill1_col);
  rect(50, 50, 160, 120)
  fill(fill2_col);
  noStroke()
  circle(260, 160, 150);
  textSize(20)
  fill(text_col);
  text("the quick brown fox\njumps over the lazy dog", 20, 250);
}






