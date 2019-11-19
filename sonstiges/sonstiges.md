#### Einen Punkt entlang einer Linie laufen lassen.

```javascript
let v, w;
let i = 0;
let geschwindigkeit = 0.01

function setup() {
  createCanvas(300, 300);
  v = createVector(50, 250);
  w = createVector(150, 50);
}

function draw() {
  background(220);
  if (i > 1) i = 0;
  i = i + geschwindigkeit;
  
  strokeWeight(1);
  line(v.x,v.y, w.x, w.y);
  
  let p = kpoint(v,w,i);
  strokeWeight(4);
  point(p.x, p.y);
}

function kpoint(v,w,k) {
  // returns point at v + k * (w-v)
  let tmp = p5.Vector.sub(w,v);
  tmp.mult(k);
  tmp = p5.Vector.add(v,tmp);
  return tmp;
}
```

<p>
<iframe src="punktAufLinie.html" width="320" height="320"></iframe>
</p>

```javascript
let v1, v2, v3; // Punkt für die linke und rechte Linien
let anzahl = 15; // Anzahl dünner Linien      
let a = new Array(anzahl); // Parameter für dünne Linien
let geschwindigkeit = 0.01;

function setup() {
    createCanvas(200, 250);
    v0 = createVector(100, 50); // oben
    v1 = createVector(50, 200); // links unten
    v2 = createVector(150, 200); // rechts unten
    w = createVector(100, 170); // mitte nicht ganz unten (unsichtbar)
    for (let i = 0; i < anzahl; i++) {
    a[i] = i / anzahl; // prozentuale Aufteilung
    }
}

function draw() {
    background(220);
    // linke und rechte Linie
    stroke(0);
    strokeWeight(1);
    line(v0.x, v0.y, v1.x, v1.y);
    line(v0.x, v0.y, v2.x, v2.y);

    // die dünnen Linien
    strokeWeight(0.2);
    for (let i = 0; i < anzahl; i++) {
    a[i] = a[i] + geschwindigkeit;
    if (a[i] > 1) a[i] = 0;

    let p1 = kpoint(v1, v0, a[i]);
    let p2 = kpoint(v2, v0, a[i]);
    let p3 = kpoint(w, v0, a[i]);

    line(p1.x, p1.y, p3.x, p3.y);
    line(p2.x, p2.y, p3.x, p3.y);
    }
}

function kpoint(v, w, k) {
    // returns v + k * (w-v)
    let tmp = p5.Vector.sub(w, v);
    tmp.mult(k);
    tmp = p5.Vector.add(v, tmp);
    return tmp;
}
```

<p>
<iframe src="entlangZweiLinien.html" width="220" height="270"></iframe>
</p>