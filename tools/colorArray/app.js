
const btnGenerate = document.getElementById('btnGenerate');
const areaCss = document.getElementById('areaCss');



btnGenerate.addEventListener("click", generate);

let colorArray = []

function setup() {
  let canvas = createCanvas(300, 150);
  canvas.parent("canvas_position");
  noStroke();
}


function draw() {
  background(200);
  if (colorArray.length > 0) {
    for (let i = 0; i < 5; i++) {
      fill(colorArray[i]);
      square(i * 60, 0, height);
    }
  }
}

function generate() {
  colorArray = getColorArray();
  tmp = "// " + getPaletteName()
  tmp = tmp + "\nlet colorArray = ["
  for (s of colorArray) {
    tmp += "'" + s + "',";
  }
  tmp = tmp.substring(0, tmp.length - 1);
  tmp += '];'
  areaCss.value = tmp;
  
}

function getColorArray() {
  let tmp = [];
  let subject = areaCss.value;
  let myregexp = /#[0-9A-Z]{6}/g;
  let match = myregexp.exec(subject);
  while (match != null) {
    for (let i = 0; i < match.length; i++) {
      tmp.push(str(match[i]));
    }
    match = myregexp.exec(subject);
  }

  return tmp;
}

function getPaletteName() {
  let subject = areaCss.value;
  let myregexp = /\.[\s\S]+?\{/;
  let match = myregexp.exec(subject);
  let tmp = match[0]
  tmp = tmp.substr(1,tmp.length-9)
  return tmp;
}



