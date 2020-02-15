### Bedingte Anweisungen

#### if 
Bedingte Anweisungen ermöglichen Verzweigungen im Programmablauf.

``` 
    let x = 0;

    function setup() {
      createCanvas(300, 200);
    }

    function draw() {
      background(220);
      if (x > 100) {
        fill(255,0,0);
      }
      circle(x, 100, 30);
      x = x + 1;
    }
```

<iframe src="farbwechsel.html" width="320" height="220"></iframe>

##### Boolesche Ausdrücke

Wenn wir Zahlen vergleichen, erhalten wir boolesche Ausdrücke, die
sich zu *true* oder *false* auswerten. Mit den boolschen Operatoren && (und) || (oder) und ! (nicht) können wir boolesche Ausdrücke zusammensetzen.

``` 
function setup() {
  noCanvas()
  print(4 >= 5);
  print(5 < 6);
  print(2 == 2.0);
  print(3.14 != 3.15);
  print(10 > 5 && 2 > 7);
  print(5 == 6 || 8 < 10);
  print(7 % 2 == 0);
  print(!(9 > 10));
}
```

##### if - else
``` 
  let x = 0;

  function setup() {
    createCanvas(300, 200);
    strokeWeight(3);
  }

  function draw() {
    background(220);
    if (x > 100) {
      fill(255,0,0);
      stroke(0);
    }
    else {
      fill(0,255,0);
      stroke(255);
    }
    circle(x, 100, 30);
    x = x + 1;
  }
```

<iframe src="zweiFarbwechsel.html" width="320" height="220"></iframe>


##### if - else if - else
```
let x = 0;

function setup() {
  createCanvas(300, 200);
  strokeWeight(3);
}

function draw() {
  background(220);
  if (0 < x && x < 50) {
    fill(255, 0, 0);
  } else if (100 < x && x < 150) {
    fill(0, 255, 0);
  } else if (200 < x && x < 250) {
    fill(0, 0, 255);
  } else {
    noFill()
  }
  ellipse(x,100,40,40);
  x = x + 1;
}
```

<iframe src="dreiFarbwechsel.html" width="320" height="220"></iframe>


##### frameCount

Die Systemvariable `frameCount` zählt die Anzahl der draw-Durchläufe. Zusammen mit dem modulo-Operator können
wir damit periodisch wiederkehrende Ereignisse implementieren.

``` 
    let x = 0

    function setup() {
      createCanvas(400, 200);
      strokeWeight(3);
      background(240);
      noFill();
    }

    function draw() {

      if (frameCount % 100 == 0) {
        x = 0;
        background(240);
      }

      if (frameCount % 3 == 0) {
        stroke(255, 0, 0);
      } else if (frameCount % 3 == 1) {
        stroke(0, 255, 0);
      } else {
        stroke(0, 0, 255);
      }

      x = x + 10;
      line(x, 0, x, height);
    }

```

<iframe src="bunteLinien.html" width="420" height="220"></iframe>


##### Abprallender Ball

Wenn möglich, halten wir uns bei Sketchen mit bewegten Figuren an die Reihenfolge *check - move - display*.

``` 
    let x = 20;
    let y = 50;
    let vx = 1;
    let vy = -2;
    let radius = 16;

    function setup() {
      createCanvas(300, 200);
      ellipseMode(RADIUS);
    }

    function draw() {
      background(230);

      // check
      if (x < radius || x > width - radius) {
        vx = -vx;
      }

      if (y < radius || y > height - radius) {
        vy = -vy;
      }

      // move
      x = x + vx;
      y = y + vy;

      // display
      fill(175);
      circle(x, y, radius);
    }
```

<iframe src="abprallenderBall.html" width="320" height="220"></iframe>

### Übungen

Zwei Seiten

<iframe src="zweiSeiten.html" width="320" height="220"></iframe>

----

Drei Farben

<iframe src="dreiFarben.html" width="320" height="220"></iframe>

---

Quadranten - Nur im 2. und 4. Quadranten erscheint der Kreis

<iframe src="quadranten.html" width="320" height="320"></iframe>

---

Button - wenn die Maus über dem Rechteck ist, ändert sich die Farbe

<iframe src="button.html" width="420" height="270"></iframe>

---

Rollover - abhängig von der Mausposition werden verschiedene Bereiche gefärbt

<iframe src="rollover.html" width="220" height="220"></iframe>

---
Zwei abprallende Bälle mit unterschiedlichen Größen und Geschwindigkeiten

<iframe src="zweiAbprallendeBaelle.html" width="320" height="220"></iframe>

---
Laufende Linien - zwei Linien werden an den Seiten reflektiert

<iframe src="laufendelinien.html" width="320" height="220"></iframe>

---
Farbbereiche - die Bereiche zweier laufender Linien werden unterschiedliche gefärbt

<iframe src="farbbereiche.html" width="520" height="320"></iframe>

---
Schnittpunkte - die Schnittpunkte vier laufender Linien werden verbunden.

<iframe src="schnittpunkte.html" width="320" height="220"></iframe>

---
Wandernde Kreise mit drei unterschiedlichen Farben prallen von den Wänden ab. Ab und zu wird alles gelöscht.

<iframe src="wanderndeKreise.html" width="620" height="420"></iframe>



