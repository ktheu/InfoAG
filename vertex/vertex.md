## Vertex

Zwischen *beginshape* und *endshape* werden Knotenpunkte mit *vertex* definiert.

```
    function setup() {
      createCanvas(400, 400);
      noStroke();
    }

    function draw() {
      background(220);

      fill('#233259')
      beginShape();
      vertex(50, 50);
      vertex(250, 25);
      vertex(300, 320);
      vertex(mouseX, mouseY);
      endShape(CLOSE);
    }

```

<iframe src="vertex.html" width="420" height="420"></iframe>


---- 

#### Vertex mit Noise

Jeder Knoten erhält ein eigenes *t* für die Änderung mit *noise*. Mit der Funktion *constrain* bleiben die
Koordinaten in dem gewünschten Bereich.

```
    let anzahl = 10;
    let t = [];
    let x = [];
    let y = [];

    function setup() {
      createCanvas(400, 400);
      for (let i = 0; i < anzahl; i++) {
        t[i] = random(1000);
        x[i] = int(random(width));
        y[i] = int(random(height));
      }
    }

    function draw() {
      background(220);

      fill('#233259')
      noStroke();

      beginShape();
      for (let i = 0; i < anzahl; i++) {
        vertex(x[i], y[i]);

        x[i] += map(noise(t[i]), 0, 1, -2, 2);
        y[i] += map(noise(t[i] + 500), 0, 1, -2, 2);
        t[i] += 0.01;
        x[i] = constrain(x[i], 0, width);
        y[i] = constrain(y[i], 0, height);
      }
      endShape(CLOSE);
    }

```

<iframe src="vertex_noise.html" width="420" height="420"></iframe>


#### Hügellandschaft 

Die geschlossenen Shapes können unterschiedlich eingefärbt werden.

```
    let y = [];
    let t;
    let incr = 0.007;

    function setup() {
      createCanvas(600, 200);
      noFill();
      stroke(0);
      strokeWeight(2);

      t = random(0, 1000);
      for (let x = 0; x < width; x++) {
        y[x] = map(noise(t), 0, 1, 0, height);
        t += incr;
      }
    }

    function draw() {
      background(255);

      y.splice(0, 1);
      t += incr;
      y[width - 1] = map(noise(t), 0, 1, 0, height);

      display();
    }


    function display() {
      fill('#7784F5');

      // Bereich oben
      beginShape();
      vertex(0, 0);
      for (let x = 0; x < y.length; x++) {
        vertex(x, y[x]);
      }
      vertex(width, 0);
      endShape(CLOSE);

      // Bereich unten
      fill('#F0CC55');
      beginShape();
      for (let x = 0; x < y.length; x++) {
        vertex(x, y[x]);
      }
      vertex(width, height);
      vertex(0, height);
      endShape(CLOSE);
    }

```

<iframe src="huegellandschaft.html" width="620" height="220"></iframe>

---

#### Rotation von Shapes

Wir konstruieren unser shape so, dass der gewünschte Rotationsmittelpunkt bei (0/0) liegt. Dann können
wir mit *translate + rotate* die Gestalt bewegen und dabei rotieren lassen.

```
    let i = 30;

    function setup() {
      createCanvas(400, 400);
      noStroke();
    }

    function draw() {
      background(220);
      push()
      translate(i, 200)
      rotate(i / 20);
      gestalt();
      pop();
      i += 1;
      if (i > width) {
        i = 0;
      }
    }

    function gestalt() {
      beginShape();
      vertex(-30, -10);
      vertex(30, -10);
      vertex(20, 10);
      vertex(-20, 10);
      fill('#233259')
      ellipse(-20, 10, 10, 10);
      ellipse(20, 10, 10, 10);
      fill('#227a92');
      endShape(CLOSE);
      stroke(255, 0, 0);
      strokeWeight(5);
    }


```

<iframe src="vertex_rotate.html" width="420" height="420"></iframe>

----

#### CurveVertex

Eine Gestalt mit *curveVertex* hat mindestens vier Knoten. Die (unsichtbaren) ersten und letzten Knoten bestimmen wie
  die Kurve beginnt und endet. Die Kurve im Beispiel hat 5 Knoten, die beiden Kontrollknoten sind durch Punkte sichtbar gemacht und können mit Mausbewegungen verändert werden.

```
    function setup() {
      createCanvas(400, 400);
    }

    function draw() {
      background(220);
      let y1 = map(mouseX, 0, width, 0, height);
      let y2 = mouseY;

      noFill();
      stroke(0);
      strokeWeight(10);
      // Kontrollpunkte
      point(50, y1);
      point(100, 150);
      point(200, 300);
      point(300, 200);
      point(350, y2);

      // Shape
      strokeWeight(2);
      beginShape();
      curveVertex(50, y1);
      curveVertex(100, 150);
      curveVertex(200, 300);
      curveVertex(300, 200);
      curveVertex(350, y2);
      endShape();
    }

```

<iframe src="vertexCurve.html" width="420" height="420"></iframe>

----

#### CurveVertex Noise 

100 curveVertex Punkte sind ohne Füllung miteinander verbunden und bewegen sich mit Perlin-Noise. 

```
    let anzahl = 100;
    let t = [];
    let x = [];
    let y = [];

    function setup() {
      createCanvas(400, 400);
      for (let i = 0; i < anzahl; i++) {
        t[i] = random(1000);
        x[i] = int(random(width));
        y[i] = int(random(height));
      }
    }

    function draw() {
      background(220);

      noFill();
      stroke('#233259');

      beginShape();
      for (let i = 0; i < anzahl; i++) {
        curveVertex(x[i], y[i]);
        x[i] += map(noise(t[i]), 0, 1, -2, 2);
        y[i] += map(noise(t[i] + 500), 0, 1, -2, 2);
        t[i] += 0.01;
        x[i] = constrain(x[i], 50, width - 50);
        y[i] = constrain(y[i], 50, height - 50);
      }
      endShape(CLOSE);
    }
```

<iframe src="vertexCurve_noise.html" width="420" height="420"></iframe>

----

#### Smiley

Der Mund ist ein CurveVertex-Shape.

```
    function setup() {
      createCanvas(400, 400);
    }

    function draw() {

      let y = map(mouseY, 0, height, 230, 270);
      let augedx = map(mouseY, 0, height, 0, 20);

      background(230);

      fill(255, 255, 0);
      strokeWeight(5);
      ellipse(200, 200, 200, 200)
      fill(255);
      ellipse(160, 175, 30, 30);
      ellipse(240, 175, 30, 30);
      triangle(200, 180, 220, 220, 180, 220);
      stroke(0);

      noFill();
      beginShape()
      curveVertex(150, y)
      curveVertex(150, y)
      curveVertex(180, 250)
      curveVertex(220, 250)
      curveVertex(250, y)
      curveVertex(250, y)
      endShape()

      auge(170 - augedx, 175);
      auge(230 + augedx, 175);
    }

    function auge(x, y) {
      fill(0);
      ellipse(x, y, 10, 10);
    }
```

<iframe src="smiley.html" width="420" height="420"></iframe>

----

#### Bezier

Bei einer Bezier-Kurve gibt es zwischen zwei (sichtbaren) Ankerpunkten zwei (unsichtbare) Kontrollpunkte.
Im Beispiel folgt der eine Kontrollpunkt der Maus, der andere bewegt sich mit *Perlin Noise*.

```
    let t = 0;

    let x1 = 300;
    let y1 = 300;

    function setup() {
      createCanvas(400, 400);
      noStroke();
    }

    function draw() {
      background(220);
      stroke(0);
      strokeWeight(2);
      noFill()

      bezier(100, 100, mouseX, mouseY, x1, y1, 350,350);
      x1 += map(noise(t+100),0,1,-2,2);
      y1 += map(noise(t+1000),0,1,-2,2);

      x1 = constrain(x1,200,400);
      y1 = constrain(y1,200,400);

      strokeWeight(0.1);
      line(100,100,mouseX,mouseY);
      line(x1,y1,350,350);

      strokeWeight(10);
      point(x1,y1);
      point(mouseX,mouseY);
      point(100,100);
      point(350,350);

      t+=0.01

    }
```

<iframe src="bezier.html" width="420" height="420"></iframe>

----


#### BezierVertex

Ein Shape mit bezierVertex besteht aus einem Anfangsvertex als Ankerpunkt, dann jeweils drei Punkten
in der Funktion bezierVertex, die beiden ersten Punkte sind Kontrollpunkte, der dritte wieder ein Ankerpunkt.
Im Beispiel bewegen sich die (unsichtbaren) Kontrollpunkte mit Perlin-Noise.

```
    let x = [80, 180, 50, 200];   // Koordinaten der Kontrollpunkte
    let y = [20, 200, 120, 250];
    let t = 0;                 // time for perlin-noise

    function setup() {
      createCanvas(400, 400);
      noFill();
      stroke(0);
    }

    function draw() {
      background(220);

      strokeWeight(1);

      beginShape();
      vertex(20, 50);
      bezierVertex(x[0], y[0], x[1], y[1], 220, 100);
      bezierVertex(x[2], y[2], x[3], y[3], 330, 320);
      endShape();

      strokeWeight(5);
      point(20, 50);
      point(220, 100);
      point(330, 320);

      for (let i = 1; i < x.length; i++) {
        x[i] += map(noise(t + i * 100), 0, 1, -2, 2);
        y[i] += map(noise(t + i * 200), 0, 1, -2, 2);

        x[i] = constrain(x[i], 50, width - 50);
        y[i] = constrain(y[i], 50, height - 50);
      }
      t = t + 0.01;

    }
```

<iframe src="bezierVertex.html" width="420" height="420"></iframe>

---- 


#### BezierVertex Linien
 
Eine Menge sehr dünner BezierVertex Linien.


```
    let x = [80, 180, 50, 200];
    let y = [20, 200, 120, 250];

    let t = 0;

    function setup() {
      createCanvas(400, 400);
      stroke('#342454')
      strokeWeight(0.1);
      noFill();
    }

    function draw() {

      if (frameCount % 1000 === 0) {
        background(255);
      }

      beginShape();
      vertex(20, 50);
      bezierVertex(x[0], y[0], x[1], y[1], 220, 100);
      bezierVertex(x[2], y[2], x[3], y[3], 330, 320);
      endShape();

      for (let i = 1; i < x.length; i++) {
        x[i] += map(noise(t + i * 100), 0, 1, -5, 5);
        y[i] += map(noise(t + i * 200), 0, 1, 5, -5);

        x[i] = constrain(x[i], 50, width - 50);
        y[i] = constrain(y[i], 50, height - 50);
      }
      t = t + 0.01;
    }

```

<iframe src="bezierVertex_noise_lines.html" width="420" height="420"></iframe>