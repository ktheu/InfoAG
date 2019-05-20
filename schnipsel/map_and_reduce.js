a = [1, 2, 3, 4];

let b = a.map((x) => x + 5);
let c = a.map((x) => 7);
console.log(b);
console.log(c);

let d = a.map((x, i) => {
  return {
    feld1: x+4,
    feld2: i
  };
});

console.log(d);

let e = a.map((x,i) => {
  return x % 2 === 0 ? x * 2 : x;
});
console.log(e);

/*
let result = arr.reduce(callback);
let result = arr.reduce(callback, initValue);

Our callback function can take four arguments.
You will recognize three of the arguments from the map() and filter() methods.
The new argument is the accumulator.

accumulator — the accumulator accumulates all of the callbacks returned values.
val — the current value being processed
index — the current index of the value being processed
arr — the original array

You can think of reduce() as a for loop,
that is specifically for using the values of an array to create something new
*/

let x1 = a.reduce((acc, val) => acc + val);
console.log(x1);

let x2 = a.reduce((acc, val) => acc + val, 100);
console.log(x2);

let data = [
  {
    country: 'China',
    pop: 1409517397,
  },
  {
    country: 'India',
    pop: 1339180127,
  },
  {
    country: 'USA',
    pop: 324459463,
  },
  {
    country: 'Indonesia',
    pop: 263991379,
  }
]

// summe aller pop außer China
let x3 = data.reduce((acc, val) => {
  return val.country == 'China' ? acc : acc + val.pop;
}, 0);
console.log(x3);


// Index des größten Elements ermitteln
a = [4,6,2,8,12,7,3];
x = a.reduce((p,c,i,a) => (c > a[p]) ? i : p);
console.log(x);

// Index des Elements mit dem größten Rest bei der Division durch 9 ermitteln
x = a.map((x) => x%9).reduce((p,c,i,a) => (c > a[p]) ? i : p);
console.log(x);

