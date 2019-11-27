n = 5

let matrix = [];

for (let i=0; i<n; i++) {
    zeile = new Array(n)
    matrix.push(zeile.fill(0));
}

matrix[1][2] = 3
matrix[3][4] = 5;
console.log(matrix)


