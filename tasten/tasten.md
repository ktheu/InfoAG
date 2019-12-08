## Tastensteuerung

Die Systemvariable `keyIsPressed` ist `true`, wenn irgendeine Taste gedrückt ist.

```
let x = 30;
let vx = 2;
function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(0);
  
  circle(x,100,20);
  if (keyIsPressed) {
     x = x + vx; 
  }
  if (x > width) x = 0;
}
```

<iframe src="irgendeinKey.html" width="320" height="220"></iframe>
 
---

Wenn wir eine bestimmte Taste abfragen wollen, nutzen wir `key` für Tasten mit Zeichen, für die Pfeiltasten nutzen wir
`keyCode`.

Die `keyCode`-Werte der Pfeiltasten sind: `UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW`.


```
let x = 30;
let vx = 1;
function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(0);
  
  circle(x,100,20);
  if (keyIsPressed) {
    if (key == 'd') {
      x = x + vx; 
    }
    else if (keyCode == LEFT_ARROW) {
      x = x - vx;
    }
  }
}
```

<iframe src="keyUndKeyCode.html" width="320" height="220"></iframe>

---

#### Funktionen für die Tastensteuerung

Die Funktion `keyPressed` wird einmal durchlaufen, wenn eine Taste gedrückt wird, die Funktion `keyReleased` wird einmal
durchlaufen, wenn eine Taste losgelassen wird.

Wenn eine Taste gedrückt wird, erscheint an zufälliger Stelle ein weißer Kreis, wenn die Taste losgelassen wird, erscheint darin noch ein kleiner scharzer Kreis.

```
let x;
let y;

function setup() {
  createCanvas(300, 300);
  background(0);
}

function draw() {
}

function keyPressed() {
  fill(255);
  x = random(0, width);
  y = random(0, height);
  circle(x, y, 30);
}

function keyReleased() {
  fill(0);
  circle(x, y, 10);
}
```

<iframe src="augen.html" width="320" height="320"></iframe>

---

#### Steuerung mit mehreren Tasten

Für jede Taste spendieren wir uns eine boolesche Variable, 
die über die Methoden `keyPressed` und `keyReleased` gesetzt wird.

Mit `w, a, s, d` steuern wir die Richtung des Balls. Mit zwei Tasten können wir den Ball auch diagonal bewegen.

```
let x = 30;
let y = 20;
let vx = 2;
let vy = 1;

// Für jede Taste eine boolesche Variable
let tLinks = false;
let tRechts = false;
let tOben = false;
let tUnten = false;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(0);
  if (tLinks) x = x - vx;
  if (tRechts) x = x + vx;
  if (tOben) y = y - vy;
  if (tUnten) y = y + vy;

  circle(x, y, 20);
}

function keyPressed() {
  if (key === 's') tUnten = true;
  else if (key === 'w') tOben = true;
  else if (key === 'a') tLinks = true;
  else if (key === 'd') tRechts = true;
}

function keyReleased() {
  if (key === 's') tUnten = false;
  else if (key === 'w') tOben = false;
  else if (key === 'a') tLinks = false;
  else if (key === 'd') tRechts = false;
}
```

<iframe src="tastensteuerung.html" width="320" height="220"></iframe>

---

Die beiden Balken lassen sich unabhängig voneinander nach oben und unten bewegen. Der linke Balken mit den Tasten `w` und `s`,
der rechte Balken mit den Tasten `o` und `l`.

```
let x1 = 30;
let x2;

let y1 = 100;
let y2;

let vy = 2;

let t1Oben = false;
let t1Unten = false;

let t2Oben = false;
let t2Unten = false;

function setup() {
  createCanvas(300, 200);
  rectMode(CENTER);
  x2 = width - x1;
  y2 = height - y1;
}

function draw() {
  background(0);

  if (t1Oben) y1 = y1 - vy;
  if (t1Unten) y1 = y1 + vy;

  if (t2Oben) y2 = y2 - vy;
  if (t2Unten) y2 = y2 + vy;

  rect(x1, y1, 10, 50);
  rect(x2, y2, 10, 50);
}

function keyPressed() {
  if (key === 's') t1Unten = true;
  else if (key === 'w') t1Oben = true;
  else if (key === 'l') t2Unten = true;
  else if (key === 'o') t2Oben = true;
}

function keyReleased() {
  if (key === 's') t1Unten = false;
  else if (key === 'w') t1Oben = false;
  else if (key === 'l') t2Unten = false;
  else if (key === 'o') t2Oben = false;
}
```

<iframe src="zweiBalken.html" width="320" height="220"></iframe>


---

### Übungen

<small>Hinweis: In manchen Demos unten wird mit den Pfeiltasten oben/unten auch die Seite bewegt. Das passiert
im P5-Webeditor nicht.</small>

Der Durchmesser des Kreises wächst, solange eine Taste gedrückt ist. Ein zu großer Kreis wird auf den Anfangswert zurückgesetzt.


<iframe src="durchmesser.html" width="320" height="220"></iframe>

---

Ein kleiner Kreis bewegt sich mit konstanter Geschwindigkeit. Die zuletzt gedrückte Pfeiltaste bestimmt seine Richtung.
Ein Mausklick setzt auf den Anfangszustand zurück.

<iframe src="kleinerKreis.html" width="320" height="320"></iframe>

---

Hier hinterlässt der kleine Kreis eine Spur.

<iframe src="kleinerKreisMitSpur.html" width="320" height="320"></iframe>
---

Mit den Tasten `r`, `g` und `b` werden die RGB-Werte für die Farbe des Kreises gesetzt, d.h. mit `r+g` wird der Kreis gelb.

<iframe src="rgb.html" width="320" height="220"></iframe>

---




Mit `w, a, s, d` wird der rote Ball gesteuert, mit den Pfeiltasten der blaue Ball. 



<iframe src="zweiKreise.html" width="320" height="220"></iframe>

---