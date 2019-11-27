
// Funktioniert, ist aber unschön
let a = new Array(5).fill().map(x => Math.random());
for (let x of a) console.log(x);

// Das ist etwas besser
a = new Array(5).fill(0)
for (i in a) a[i] = Math.random()

for (let x of a) console.log(x);


// Aber das alte ist am verständlichsten
a = []
for (let i=0; i<5; i++) {
    a.push(Math.random());
}





