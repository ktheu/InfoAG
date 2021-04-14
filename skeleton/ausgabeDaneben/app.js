
let x = [];
let y = [];
let nr = 0;

const ausgabe = document.getElementById('ausgabe_position');
const tbody = document.getElementById('tbody')

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas_position");
  noStroke();

}

function draw() {
  background(200);
  for (let i = 0; i < x.length; i++) {
    circle(x[i], y[i], 10);
    text(i, x[i] + 5, y[i]);
  }
}

function mousePressed() {
  if (0 <= mouseX && mouseX <= width
    && 0 <= mouseY && mouseY <= height) {
    x.push(mouseX);
    y.push(mouseY);
    nr++;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${nr}</td>
      <td>${mouseX.toFixed(2)}</td>
      <td>${mouseY.toFixed(2)}</td>
   `;

    tbody.appendChild(row);
  }


}

