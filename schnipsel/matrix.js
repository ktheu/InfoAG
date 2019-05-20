let m = Array(6).fill(Array(3).fill(0));
console.log(m);

m[4][2] = 1;
console.log(m);     // Hier sieht man Seiteneffekte

let rows = 3;
let cols = 6;
m = [];
let zaehl = 0;
for (let i = 0; i < rows; i++) {
  m[i] = [];
  for (let j = 0; j < cols; j++) {
    m[i][j] = zaehl;
    zaehl += 1;
  }
}

console.log(m);
