## Tastensteuerung

Jeder Taste ist eine Zahl zugeordnet, der `keyCode`. Auf [keyCode.info](https://keycode.info/) können wir diese Zahl abfragen.
Für Buchstaben, Ziffern und weitere [ASCII](https://de.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange)-Zeichen können wir auch die Variable `key` benutzen.

Für einige Tasten gibt es Systemvariablen, die den keyCode enthalten:
`UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, RETURN, SHIFT, CONTROL, BACKSPACE, DELETE, TAB, ESCAPE, ALT`
 
```
if (keyCode === 39)             # prüft ob 
if (keyCode === RIGHT_ARROW)    # rechte Pfeiltaste gedrückt

if (keyCode === 65)             # prüft ob  
if (key === 'a')                # Taste A gedrückt
 
```
#### Prüfen, ob irgendeine Taste gedrückt ist

Die Systemvariable `keyIsPressed` ist `true`, wenn irgendeine Taste gedrückt ist.

```
let x = 30;
let vx = 2;
function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(0);

  if (keyIsPressed) {
     x = x + vx; 
  }
  circle(x,100,20);
}
```

<iframe src="irgendeinKey.html" width="320" height="220"></iframe>
 
---
#### Die zuletzt gedrückte Taste

Wenn wir abfragen wollen, welche Taste zuletzt gedrückt wurde, nutzen wir `key` für Tasten mit Zeichen, ansonsten
`keyCode`.

```
let x = 30;
let vx = 1;
function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(0);

  if (keyIsPressed) {
    if (key == 'd') {
      x = x + vx; 
    }
    if (keyCode == LEFT_ARROW) {
      x = x - vx;
    }
  }
  circle(x,100,20);
}
```

<iframe src="keyUndKeyCode.html" width="320" height="220"></iframe>

---

#### Die Funktionen keyPressed und keyReleased

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

#### Prüfen, ob bestimmte Tasten gerade gedrückt sind 

Die `keyIsDown`-Methode bekommt den keyCode als Argument. Den keyCode können wir
auch mit der String-Methode `charCodeAt` ermitteln.

```
keyIsDown('A'.charCodeAt(0))   true, wenn Taste `A` 
keyIsDown(65)                  gedrückt ist.

```


Mit `w, a, s, d` steuern die Richtung des Balls. Mit zwei Tasten können wir den Ball auch diagonal bewegen.

```
let x = 30;
let y = 20;
let vx = 2;
let vy = 1;

let tasteA = 'A'.charCodeAt(0); 
let tasteD = 'D'.charCodeAt(0); 
let tasteW = 'W'.charCodeAt(0);
let tasteS = 'S'.charCodeAt(0);

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(0);
  if (keyIsDown(tasteA)) x = x - vx;
  if (keyIsDown(tasteD)) x = x + vx;
  if (keyIsDown(tasteW)) y = y - vy;
  if (keyIsDown(tasteS)) y = y + vy;

  circle(x, y, 20);
}
```

<iframe src="tastensteuerung.html" width="320" height="220"></iframe>

---

Die beiden Balken lassen sich unabhängig voneinander nach oben und unten bewegen. Der linke Balken mit den Tasten `w` und `s`,
der rechte Balken mit den Tasten `o` und `l`.

```
let x1 = 30;   // Abstand Balken zum Rand

let y1 = 100;  // y-Koordinaten
let y2 = 100;  // der beiden Balken

let vy = 2;    // Geschwindigkeit Balken

function setup() {
  createCanvas(300, 200);
  rectMode(CENTER);
}

function draw() {
  background(0);

  if (keyIsDown(87)) y1 = y1 - vy;   // W
  if (keyIsDown(83)) y1 = y1 + vy;   // S

  if (keyIsDown(79)) y2 = y2 - vy;   // O
  if (keyIsDown(76)) y2 = y2 + vy;   // L

  rect(x1, y1, 10, 50);
  rect(width-x1, y2, 10, 50);
}
```

<iframe src="zweiBalken.html" width="320" height="220"></iframe>

---

#### SimplePong

```
    let xBalken = 150;
    let yBalken = 270;
    let balkenBreite = 80;
    let balkenHoehe = 10;
    let vxBalken = 4;

    let xBall = 20;
    let yBall = 50;
    let ballRadius = 10;

    let vxBall = 4;
    let vyBall = 3;
    let vfactor = 1.0001;  // Zunahme der Ball-Geschwindigkeit

    let pLinksVonBalken;
    let pRechtsVonBalken;

    function setup() {
      createCanvas(300, 300);
      ellipseMode(RADIUS);
      noStroke();
    }

    function draw() {
      background(0);

      let oberhalbBalken = yBall + ballRadius <= yBalken;
      let unterhalbBalken = yBall - ballRadius >= yBalken + balkenHoehe;
      let linksVonBalken = xBall + ballRadius <= xBalken;
      let rechtsVonBalken = xBalken + balkenBreite <= xBall - ballRadius;

      let kollision = !(oberhalbBalken || unterhalbBalken || linksVonBalken || rechtsVonBalken);

      let amRandLinksRechts = (xBall - ballRadius < 0 || xBall + ballRadius > width);
      let amRandOben = yBall - ballRadius < 0;


      if (xBall < 0 || width < xBall) vxBall = -vxBall;
      if (yBall < 0) vyBall = -vyBall

      if (kollision) {
        if (pLinksVonBalken || pRechtsVonBalken) {
          vxBall = -vxBall;
        }
        else {
          vyBall = -abs(vyBall);
        }
      }

      if (keyIsDown(LEFT_ARROW)) xBalken = xBalken - vxBalken;
      if (keyIsDown(RIGHT_ARROW)) xBalken = xBalken + vxBalken;

      vxBall *= vfactor;   // die Geschwindigkeit 
      vyBall *= vfactor;   // nimmt langsam zu

      xBall = xBall + vxBall;
      yBall = yBall + vyBall;

      rect(xBalken, yBalken, balkenBreite, balkenHoehe);
      circle(xBall, yBall, ballRadius);

      pLinksVonBalken = linksVonBalken;
      pRechtsVonBalken = rechtsVonBalken;

    }

    function mousePressed() {
      xBall = random(20, width - 20);
      yBall = 50;
      vxBall = 4;
      vyBall = 3;
    }
```

<iframe src="simplePong.html" width="320" height="320"></iframe>

---

- Wenn wir die zuletzt gedrückte Taste benötigen, dann fragen wir die Variable `key` (für ASCII-Zeichen) und
  `keyCode` für sonstige Tasten ab.
- Wenn wir abfragen wollen, ob eine bestimmte Taste gerade gedrückt ist, dann fragen wir das Ergebnis der
  Funktion `keyIsDown()` ab.

---

### Übungen

<small>Hinweis: In manchen Demos unten wird mit den Pfeiltasten oben/unten auch die Seite bewegt. Das passiert
im P5-Webeditor nicht.</small>

Der Durchmesser des Kreises wächst, solange eine Taste gedrückt ist. Ein zu großer Kreis wird auf den Anfangswert zurückgesetzt.


<iframe src="durchmesser.html" width="320" height="220"></iframe>

---
Wenn die Maus gedrückt ist, wird beim Drücken der Tasten `w a s d` ab Mausposition eine Linie in 
die entsprechende Richtung gezeichnet. Solange die Maus gedrückt bleibt, schließen sich die verschiedenen Richtungen hintereinander an.

<iframe src="tastenLinie.html" width="420" height="420"></iframe>



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