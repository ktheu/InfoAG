## Kollisionen

Wir wollen die Kollision eines Balls (Kreis) mit einem Balken (Rechteck) feststellen. Wir gehen in kleinen Schritten vor.
Wir spendieren uns sprechende Variablen, damit wir nicht an konkrete Koordinaten gebunden sind.
Die Position des Balls bestimmen wir zu Testzwecken mit der Maus.

Die Ausgangssituation:

```
let xBalken = 100;
let yBalken = 250;
let balkenBreite = 80;
let balkenHoehe = 10;

let xBall = 20;
let yBall = 50;
let ballRadius = 10;

function setup() {
  createCanvas(300, 300);
  ellipseMode(RADIUS);
  noStroke();
}

function draw() {
  background(0);

  xBall = mouseX;
  yBall = mouseY;

  rect(xBalken, yBalken, balkenBreite, balkenHoehe);
  circle(xBall, yBall, ballRadius);
}
```

<iframe src="kollision01.html" width="320" height="320"></iframe>

---

Wir führen eine Reihe boolescher Variablen ein. Jede Variable prüft ein einfaches Detail und kann unabhängig von den anderen Variablen getestet werden. Die Variable `oberhalbBalken` soll genau dann `true` sein, wenn sich der Ball oberhalb des Balkens befindet.

```
let xBalken = 100;
let yBalken = 250;
let balkenBreite = 80;
let balkenHoehe = 10;

let xBall = 20;
let yBall = 50;
let ballRadius = 10;

function setup() {
  createCanvas(300, 300);
  ellipseMode(RADIUS);
  noStroke();
}

function draw() {
  background(0);

  xBall = mouseX;
  yBall = mouseY;

  let oberhalbBalken = yBall + ballRadius <= yBalken;
  if (oberhalbBalken) circle(0, 0, 20); // Test     

  rect(xBalken, yBalken, balkenBreite, balkenHoehe);
  circle(xBall, yBall, ballRadius);
}
```

<iframe src="kollision02.html" width="320" height="320"></iframe>

---

Auch für die anderen Fälle führen wir boolesche Variablen ein und testen sie getrennt.

```
  let oberhalbBalken = ballY + ballRadius <= balkenY;
  let unterhalbBalken = ballY - ballRadius >= balkenY + balkenHoehe;
  let linksVonBalken = ballX + ballRadius <= balkenX;
  let rechtsVonBalken = balkenX + balkenBreite <= ballX - ballRadius;
```
 
Wenn der Ball weder oberhalb, noch unterhalb, noch links oder rechts vom Balken ist, dann ist er offenbar mit den Balken kollidiert.

```
    let xBalken = 100;
    let yBalken = 250;
    let balkenBreite = 80;
    let balkenHoehe = 10;

    let xBall = 20;
    let yBall = 50;
    let ballRadius = 10;

    function setup() {
      createCanvas(300, 300);
      ellipseMode(RADIUS);
      noStroke();
    }

    function draw() {
      background(0);

      xBall = mouseX;
      yBall = mouseY;

      let oberhalbBalken = yBall + ballRadius <= yBalken;
      let unterhalbBalken = yBall - ballRadius >= yBalken + balkenHoehe;
      let linksVonBalken = xBall + ballRadius <= xBalken;
      let rechtsVonBalken = xBalken + balkenBreite <= xBall - ballRadius;

      let kollision = !(oberhalbBalken || unterhalbBalken || linksVonBalken || rechtsVonBalken);
      if (kollision) circle(0, 0, 20); // Test     

      rect(xBalken, yBalken, balkenBreite, balkenHoehe);
      circle(xBall, yBall, ballRadius);
    }
```

<iframe src="kollision03.html" width="320" height="320"></iframe>

---

Jetzt lassen wir den Ball laufen und übernehmen zum Test mit der Maus die x-Position des Balkens.

```
    let xBalken = 100;
    let yBalken = 250;
    let balkenBreite = 80;
    let balkenHoehe = 10;

    let xBall = 20;
    let yBall = 50;
    let ballRadius = 10;

    let vxBall = 4;
    let vyBall = 4;

    function setup() {
      createCanvas(300, 300);
      ellipseMode(RADIUS);
      noStroke();
    }

    function draw() {
      background(0);

      xBalken = mouseX;

      let oberhalbBalken = yBall + ballRadius <= yBalken;
      let unterhalbBalken = yBall - ballRadius >= yBalken + balkenHoehe;
      let linksVonBalken = xBall + ballRadius <= xBalken;
      let rechtsVonBalken = xBalken + balkenBreite <= xBall - ballRadius;

      let kollision = !(oberhalbBalken || unterhalbBalken || linksVonBalken || rechtsVonBalken);

      if (xBall < 0 || width < xBall) vxBall = -vxBall;
      if (yBall < 0 || kollision) vyBall = -vyBall;

      xBall = xBall + vxBall;
      yBall = yBall + vyBall;

      rect(xBalken, yBalken, balkenBreite, balkenHoehe);
      circle(xBall, yBall, ballRadius);
    }
```

<iframe src="kollision04.html" width="320" height="320"></iframe>

----

Bei den Kollisionen können seltsame Effekte auftreten, die schwierig zu beheben sind, weil sie nur manchmal auftreten.
Man kann versuchen, die Situation mit geeigneten Anfangswerten nachzustellen.

Beispiel:  Die Positionen und Geschwindigkeiten von Ball und Balken sind nach etlichen Versuchen
voreingestellt, damit der Effekt sicher auftritt.

<iframe src="kollision05.html" width="320" height="320"></iframe>

---

Mit `noLoop()` stoppt der Programmablauf nach dem aktuellen draw-Durchgang, mit `loop()` gehts wieder weiter. Mit Mausklick können wir die draw-Durchgänge einzeln beobachten und den Grund für den seltsamen Effekt herausfinden.

```
    let xBalken = 300;
    let yBalken = 250;
    let balkenBreite = 80;
    let balkenHoehe = 10;
    let vxBalken = -4;

    let xBall = 20;
    let yBall = 150;
    let ballRadius = 10;

    let vxBall = 4;
    let vyBall = 3;

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

      if (xBall < 0 || width < xBall) vxBall = -vxBall;
      if (yBall < 0 || kollision) vyBall = -vyBall

      xBall = xBall + vxBall;
      yBall = yBall + vyBall;

      xBalken = xBalken + vxBalken;

      rect(xBalken, yBalken, balkenBreite, balkenHoehe);
      circle(xBall, yBall, ballRadius);

      if (frameCount > 30) noLoop();
    }

    function mousePressed() {
      loop();
    }
```

<iframe src="kollision06.html" width="320" height="320"></iframe>

---
Eine einfache Lösung für das Problem: Bei einer Kollision mit dem Balken 
setzen wir für den Ball immer eine negative y-Geschwindigkeit. Wir ersetzen dazu die Zeile:

```
if (yBall < 0 || kollision) vyBall = -vyBall

```
durch

```
if (yBall < 0) vyBall = -vyBall
if (kollision) vyBall = - abs(vyBall)

```
Wenn wir die Kollision an der linken Seite anders behandeln wollen als eine Kollision von oben, gehen
wir wie folgt vor: 
In  `pLinksVonBalken` merken wir uns, ob der Ball im letzten draw-Durchgang links vom Balken war. Damit können wir bei einer Kollision entscheiden, welcher Geschwindigkeitsanteil sein Vorzeichen ändern muss.


```
    let xBalken = 300;
    let yBalken = 250;
    let vxBalken = -4;
    
    let balkenBreite = 80;
    let balkenHoehe = 10;

    let xBall = 20;
    let yBall = 150;
    let ballRadius = 10;

    let vxBall = 4;
    let vyBall = 3;

    let pLinksVonBalken;   // true wenn beim letzten Durchgang links vom Balken

    function setup() {
      createCanvas(300, 300);
      ellipseMode(RADIUS);
    }

    function draw() {
      background(0);

      let oberhalbBalken = yBall + ballRadius <= yBalken;
      let unterhalbBalken = yBall - ballRadius >= yBalken + balkenHoehe;
      let linksVonBalken = xBall + ballRadius <= xBalken;
      let rechtsVonBalken = xBalken + balkenBreite <= xBall - ballRadius;

      let kollision = !(oberhalbBalken || unterhalbBalken || linksVonBalken || rechtsVonBalken);

      if (xBall < 0 || width < xBall) vxBall = -vxBall;
      if (yBall < 0)  vyBall = -vyBall

      if (kollision) {
        if (pLinksVonBalken) {
          vxBall = -vxBall;
        }
        else {
          vyBall = -vyBall;
        }
      }

      xBall = xBall + vxBall;
      yBall = yBall + vyBall;

      xBalken = xBalken + vxBalken;

      rect(xBalken, yBalken, balkenBreite, balkenHoehe);
      circle(xBall, yBall, ballRadius);

      pLinksVonBalken = linksVonBalken;

      if (frameCount > 30) noLoop();
    }

    function mousePressed() {
      loop();
    }
```

<iframe src="kollision07.html" width="320" height="320"></iframe>

---

Wir müssen noch dafür sorgen, dass sich der Ball nach der Reflexion sicher vom Balken entfernt. Dazu erhöhen wir die Geschwindigkeit
des Balls in x-Richtung um die des Balkens.

```
      if (kollision) {
        if (pLinksVonBalken) {
          vxBall = -vxBall + vxBalken;
        }
        else {
          vyBall = -vyBall;
        }
      }
```

<iframe src="kollision08.html" width="320" height="320"></iframe>

--- 
### Übungen

Klotz - Der Ball prallt an allen Seiten des Klotzes ab.

<iframe src="klotz.html" width="420" height="420"></iframe>

---

Klotz2 -Viele Bälle prallen an den Seiten des Klotzes ab.

<iframe src="klotzArray.html" width="420" height="420"></iframe>
