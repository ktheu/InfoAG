### Interaktion mit der Maus

##### mouseX, mouseY

Die Systemvariablen *mouseX* und *mouseY* liefern die aktuelle Position der Maus.

```
function setup() {
  createCanvas(300, 300);
  background(100);
}

function draw() {
  circle(mouseX, mouseY, 20);
}
```

<iframe src="mausKreise.html" width="320" height="320"></iframe>

##### pmouseX, pmouseY

Die Systemvariablen *pmouseX* und *pmouseY* liefern die Position der Maus im vorherigen draw-Durchgang.
```
function setup() {
  createCanvas(300, 300);
  background(200);
}

function draw() {
  line(pmouseX, pmouseY, mouseX,mouseY);
}
```

<iframe src="linie.html" width="320" height="320"></iframe>

##### frameRate _[doc](https://p5js.org/reference/#/p5/frameRate)_

Die draw-Funktion wird normalerweise 60 mal pro Sekunde durchlaufen. Am Ende jedes Durchlaufs wird das Bild neu aufgebaut. Mit der Anweisung *frameRate* können wir die Anzahl der Durchläufe ändern. Der maximale Wert ist
durch die Computerhardware begrenzt.

```
function setup() {
  createCanvas(300, 300);
  background(200);
  frameRate(5);
}

function draw() {
  line(pmouseX, pmouseY, mouseX,mouseY);
}
```

<iframe src="linieMitFramerate.html" width="320" height="320"></iframe>

##### mousePressed()

Die Funktion mousePressed() wird einmal durchlaufen, sobald die Maus gedrückt wurde. 
 
```
function setup() {
  createCanvas(300, 300);
  background(50);
  noStroke();
}

function mousePressed() {
  circle(mouseX, mouseY, 30);
}

```
<iframe src="mauspressed.html" width="320" height="320"></iframe>

### Übungen

Mauslinie
<iframe src="mauslinie.html" width="320" height="320"></iframe>

---

Mauslinien
<iframe src="mauslinien.html" width="620" height="420"></iframe>

---

Ecklinien
<iframe src="ecklinien.html" width="620" height="420"></iframe>

---
Ecklinien mit transparentem Hintergrund

<iframe src="ecklinienMitTransparenz.html" width="620" height="420"></iframe>

---
Kleine Quadrate bei Mausklick

<iframe src="kleineQuadrate.html" width="320" height="320"></iframe>

---
Kette mit niedriger frameRate, nach Mausklick beginnt die Kette neu


<iframe src="kette.html" width="620" height="420"></iframe>