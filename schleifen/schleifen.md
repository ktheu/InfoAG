## Schleifen


#### Verkürzte Zuweisung und Inkrement
Für manche Zuweisungen gibt es verkürzte Schreibweisen. Sie lohnen sich bei langen Variablennamen.

```
anzahlTrefferInErsterRunde = anzahlTrefferInErsterRunde + 10;
anzahlTrefferInErsterRunde += 10;                              // verkürzte Zuweisung
```

```
x += y;         // statt x = x + y;
x -= y;         // statt x = x - y;
x *= y;         // statt x = x * y; 
x /= y;         // statt x = x / y;
x %= y;         // statt x = x % y;
x++;            // statt x = x + 1;   Increment-Operator
x--;            // statt x = x - 1;   Decrement-Operator
```


#### Die while Schleife
Solange die while-Bedingung wahr ist, wird der Schleifenrumpf durchlaufen.

``` 
function setup() {
  noCanvas();

  let x = 0;
  while (x < 5) {
    print(x);
    x = x + 1;
  }
  print("Ende");
}
```
--- 

Solange x noch nicht die Breite der Leinwand erreicht hat, wird im Abstand von 20 ein neuer Punkt gezeichnet.
Mit dieser Bedingung muss man nicht selbst ausrechnen, wieviele Punkte entstehen.

``` 
let y = 10;

function setup() {
  createCanvas(400, 300); 
  strokeWeight(10);
}

function draw() {
  background(220);
 
  let x = 20;
  while (x < width) {
    point(x, y);
    x = x + 20;
  }
  y = y + 1;
  if (y > height) y = 10;
}
```

<iframe src="while.html" width="420" height="320"></iframe>

--- 

#### Die for Schleife
Diese for-Schleife macht dasselbe wie die while-Schleife oben.

``` 
function setup() {
  noCanvas();

  for (let x = 0; x < 5; x++) {
    print(x);
  }
  print("Ende");
}
```

--- 
Die `while-Schleife` wird häufig benutzt, wenn man nicht so genau weiß, wie oft die Schleife durchlaufen wird.
Wenn die Anzahl der Schleifendurchgänge feststeht, nimmt man meist die `for-Schleife`.
---


``` 
let x = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(220);

  for (let i = 0; i < 20; i++) {
    line(x + 3 * i, 0, x + 3 * i, height);
  }
  x = x + 1;
  if (x > width) x = -60;
}
```
<iframe src="zwanzigLinien.html" width="320" height="220"></iframe>

--- 

#### break und continue

`break` verlässt die aktuelle Schleife, `continue` unterbricht den aktuellen Schleifendurchgang und beginnt den nächsten Durchgang.

``` 
function setup() {
  noCanvas();

  let x = 0;
  while (x < 5) {
    x = x + 1;
    if (x == 3) {
      break;
    }
   
    if (x == 1) {
      continue;
    }
    print(x);
  }
  print("Ende");
}
```
--- 

## Zufall

```
x = random();           // x Dezimalzahl zwischen 0 und 1 (ohne die 1)
x = random(8);          // x Dezimalzahl zwischen 0 und 8 (ohne die 8)
x = random(2,10);       // x Dezimalzahl zwischen 2 und 10 (ohne die 10)
x = int(random(8));     // x ganze Zahl zwischen 0 und 7
x = int(random(5,20));  // x ganze Zahl zwischen 5 und 19
```

Wird ein `randomSeed` gesetzt, so ist die Reihenfolge der Zufallszahlen immer gleich.
Bei Koordinaten oder Farbwerten werden Dezimalzahlen automatisch gerundet.

``` 
let anzahl = 100;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  strokeWeight(1);
  stroke(255);
  for (let i = 0; i < anzahl; i++) {
    circle(mouseX,mouseY,10);
    line(mouseX, mouseY, width,random(80,height-80));
  }
}
```

<iframe src="strahl.html" width="420" height="420"></iframe>

---
Bei jedem Mausklick entstehen 100 bunte Kreise. Ohne `randomSeed` würden beim jedem draw-Durchgang 100 neue Kreise entstehen.

``` 
let anzahl = 100;
let seed = 12;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(0);
  randomSeed(seed);
  for (let i = 0; i < anzahl; i++) {
    fill(random(255), random(255), random(255));
    circle(random(0, width), random(0, height), 30);
  }
}

function mousePressed() {
  seed = random(0, 100);
}
```

<iframe src="bunteKreise.html" width="420" height="420"></iframe>

---
Es entstehen nacheinander bläuliche Quadrate. Ab und zu wird alles gelöscht.

``` 
let anzahl = 100;
let abstand = 40;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
}

function draw() {
  strokeWeight(3);
  if (frameCount % 10 == 0) {
    h = random(180, 220);
    s = random(50, 80);
    b = random(50, 80);
    let x = random(abstand, width - abstand);
    let y = random(abstand, height - abstand);
    fill(h, s, b);
    square(x, y, random(30, 2 * abstand));
  }
  if (frameCount % 1000 == 0) {
    background(255);
  }
}
```
<iframe src="blaueQuadrate.html" width="420" height="420"></iframe>


### Übungen

Ab der x-Position der Maus werden in kurzem Abstand senkrechte Linien bis zur rechten Seite gezeichnet.
<iframe src="vorhang.html" width="620" height="320"></iframe>

---

100 sich überlappende Kreise bewegen sich nach unten.
<iframe src="hundertKreise.html" width="620" height="320"></iframe>

---

Viele Kreise um die Mausposition
<iframe src="mausKreise.html" width="420" height="420"></iframe>

---

Viele Punkte bewegen sich auf und ab.
<iframe src="vielePunkte.html" width="420" height="320"></iframe>

---

Es entstehen zufällig entweder Kreise oder Quadrate in jeweils einer Farbrichtung.

<iframe src="rotUndGelb.html" width="420" height="420"></iframe>

<br><br>
 
Hinweis: wenn man sich zufällig zwischen 2 Möglichkeiten entscheiden soll, kann man so vorgehen:

```
if (random() < 0.5) {
  // 1. Möglichkeit
}
else {
  // 2. Möglichkeit
}

```
---
