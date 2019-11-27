## Arrays

Mit einem Array können wir mehrere Werte in einer Variablen speichern. Auf die einzelnen Werte greifen wir mit
einem Index zu.

```javascript
function setup() {
  noCanvas();
  a = [5, 4, 17, 22];
  print(a[0]);
  print(a[2]);
  print(a.length);
}

Ausgabe: 
5
17
4
```

Die typische for-Schleife durch ein Array

```
function setup() {
  noCanvas();
  a = [5, 4, 17, 22];
  for (let i = 0; i < a.length; i++) {
    print(a[i]);
  }
}
```

#### Zwei Bälle ohne Array

Für jeden Ball benötigen wir drei Variablen, zwei für die Position und eine für die Geschwindigkeit in y-Richtung.

<iframe src="zweiBaelleOhneArray.html" width="420" height="420"></iframe>

```javascript
let x0 = 100;
let x1 = 300;
let y0 = 40;
let y1 = 140;
let dy0 = 3;
let dy1 = 6;

function setup() {
  createCanvas(400, 400);
  fill(255);
}

function draw() {
  background(0);

  // 1.Ball
  if (y0 < 0 || height < y0) {
    dy0 = -dy0
  }
  y0 = y0 + dy0;
  ellipse(x0, y0, 10, 10);
  
  // 2.Ball
  if (y1 < 0 || height < y1) {
    dy1 = -dy1
  }
  y1 = y1 + dy1;
  ellipse(x1, y1, 10, 10);

}
```

---

#### Mehrere Bälle mit Arrays

Mit drei Arrays können wir die Daten von vielen Bällen verwalten.

<iframe src="baelleMitArray.html" width="420" height="420"></iframe>



```javascript
let x = [100, 300, 200, 350]
let y = [40, 140, 20, 300];
let dy = [3, 6, 1, -7];

function setup() {
  createCanvas(400, 400);
  fill(255);
}

function draw() {
  background(0);
  for (let i = 0; i < x.length; i++) {
    if (y[i] < 0 || height < y[i]) {
      dy[i] = -dy[i]
    }
    y[i] = y[i] + dy[i];
    ellipse(x[i], y[i], 10, 10);
  }
}
```
---

Auch 100 Bälle sind jetzt kein Problem mehr. Für jede weitere Eigenschaft spendieren wir uns ein weiteres Array.

<iframe src="hundertBaelle.html" width="420" height="420"></iframe>

```javascript
let x = []
let y = []
let dy = [];
let farbe = [];
let anzahl = 100;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100);
  for (let i=0; i<anzahl; i++) {
    x[i] = random(20,width-20)
    y[i] = random(20,height-20)
    dy[i] = random(-8,8);
    farbe[i] = random(0,360);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < x.length; i++) {
    if (y[i] < 0 || height < y[i]) {
      dy[i] = -dy[i]
    }
    y[i] = y[i] + dy[i];
    fill(farbe[i],100,100);
    ellipse(x[i], y[i], 10, 10);
  }
}

```
---

Die x,y-Koordinaten der Bälle und ihre Geschwindigkeiten in x und y-Richtung werden in Arrays verwaltet.
Solange die Maustaste gedrückt ist, entstehen neue Bälle. Der Hintergrund ist nicht völlig deckend.
Mit `a.push(x)` fügen wir das Element `x` an das Ende des Arrays `a` ein.

Die Systemvariable `mouseIsPressed` ist `true` solange die Maus gedrückt ist.

<iframe src="ballMitMaus.html" width="620" height="620"></iframe>

```
let x = [100, 300]
let y = [30, 80]

let dy = [5, -3];
let dx = [2, -1];

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  background(0, 20);
 
  fill(255);
  for (let i = 0; i < x.length; i++) {
    ellipse(x[i], y[i], 10, 10);
    y[i] = y[i] + dy[i];
    x[i] = x[i] + dx[i];

    if (y[i] < 0 || height < y[i]) {
      dy[i] = -dy[i]
    }
    if (x[i] < 0 || width < x[i]) {
      dx[i] = -dx[i]
    }
  }

  if (mouseIsPressed) {
    x.push(mouseX)
    y.push(mouseY)
    ydiff = int(random(1, 5))
    if (random() < 0.5) {
      ydiff = -ydiff
    }
    dy.push(ydiff)
    xdiff = int(random(2, 5))
    if (random() < 0.5) {
      xdiff = -xdiff
    }
    dx.push(xdiff)
  }
}
```

### Übungen

20 Punkte werden mit Linien verbunden. Bei Mausklick sind es 20 andere Punkte.

<iframe src="zwanzigPunkte.html" width="420" height="420"></iframe>

--- 

Hinher

<iframe src="hinher.html" width="420" height="420"></iframe>

--- 

Quadrate fallen mit unterschiedlicher Geschwindigkeit zu Boden. Mit Mausklick beginnt das Spiel von vorne mit neuen
unterschiedlichen Geschwindigkeiten.

<iframe src="fallendeQuadrate.html" width="520" height="520"></iframe>

---

Linienschlange

Fünf zufällig gesetzte Punkte werden mit Linien zu einer Schlange verbunden. Der erste Punkt wird als
Kopf der Schlange markiert. Mit Mausklick entsteht an der Mausposition eine neuer Kopf und die anderen
Punkte rücken nach. Die Koordinaten der Punkte werden mit zwei Arrays verwaltet.

<iframe src="linienschlange.html" width="420" height="420"></iframe>

---  



