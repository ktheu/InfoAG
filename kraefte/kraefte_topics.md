## Kräfte - weitere Beispiele

Unsere Implementationen bilden die physikalischen Zusammenhänge nur ungefähr ab.
Manche Unzulänglichkeiten lassen sich durch lokale Manipulationen beheben.


### Energieerhaltung

In dem Sketch verliert der Ball langsam an Höhe. Wenn keine Reibung vorhanden ist und beim Aufprall keine Energie
verloren geht, müsste der Ball wieder an seine Ausgangsposition gelangen.

```
    let pos;
    let v;
    let a;
    let radius = 10;
    let gravitation;

    function setup() {
      fill(250);
      createCanvas(400, 400);
      ellipseMode(RADIUS);

      pos = createVector(200, 50);
      v = createVector(0, 0);
      a = createVector(0, 0);
      gravitation = createVector(0, 0.7);
    }

    function draw() {
      // check
      let unterBoden = pos.y + radius > height;
      if (unterBoden) {
        v.y = -abs(v.y);
      }

      // move
      a.mult(0);
      a.add(gravitation);
      v.add(a);
      pos.add(v);

      //display
      background(0);
      stroke(255);
      line(0,50,width,50);
      circle(pos.x, pos.y, radius)
      stroke(255);
      ellipseMode(RADIUS);
    }
```

<iframe src="kraefte01_problem.html" width="420" height="420"></iframe>

#### Lösung:

Beim Wechsel des Vorzeichens wird von der neuen Geschwindigkeit der Gravitationsvektor wieder
abgezogen. Dadurch ist der erste Durchgang nach oben nicht so groß wie der letzte Durchgang nach unten.

```
// move
a.mult(0);
a.add(gravitation);
if (!unterBoden) {
    v.add(a);
}
pos.add(v);
```

<iframe src="kraefte01_Loesung.html" width="420" height="420"></iframe>


### Schubs

Warum fliegt der Ball bei einem Schubs von 20 viel höher als 20?

```
    let pos;
    let v;
    let a;
    let radius = 10;
    let gravitation;
    let schubs;
    let gibSchubs = false;

    function setup() {

      fill(250);
      createCanvas(400, 400);
      background(0);
      pos = createVector(200, 300);
      v = createVector(0, 0);
      a = createVector(0, 0);
      gravitation = createVector(0, 0.7);
      schubs = createVector(0, -20);

      ellipseMode(RADIUS);
    }

    function draw() {
      // check
      let unterBoden = pos.y + radius > height;
 
      if (unterBoden) {
        v.y = -abs(v.y);
      }

      // move
      a.mult(0);
      a.add(gravitation);
      if (gibSchubs) {
        a.add(schubs);
        gibSchubs = false;
      }
      v.add(a);
      pos.add(v);
       
      if (unterBoden) {    //positionskorrektur
        pos.y = height - radius;
      }

      //display
      background(0);
      stroke(0);
      circle(pos.x, pos.y, radius)
    }

    function mousePressed() {
      gibSchubs = true;
    }
```

<iframe src="kraefte02_problem.html" width="420" height="420"></iframe>

<br><br>
In dem Schubs-Durchgang wird auf den Geschwindigkeitsvektor ein Vektor von 20 nach oben addiert.
Dann wird der Gravitationsvektor addiert. Wenn der Ball vor dem Schubs in Ruhe war, bleibt während mehrerer Durchgänge eine
Geschwindigkeit nach oben bestehen, der Ball erreicht so eine Höhe, die über 20 liegt.

Wenn der Schubs mit Mausklick gegeben wird, schalten wir in einen debug-Modus. Mit der Taste 'd' können wir uns dann die
einzelnen frames nacheinander ansehen.

```
    let pos;
    let v;
    let a;
    let radius = 10;
    let gravitation;
    let schubs;
    let gibSchubs = false;
    let debug = false;
      
    function setup() {

      fill(250);
      createCanvas(400, 400);
      background(0);
      pos = createVector(200, 300);
      v = createVector(0, 0);
      a = createVector(0, 0);
      gravitation = createVector(0, 0.7);
      schubs = createVector(0, -20);

      ellipseMode(RADIUS);
    }

    function draw() {
      // check

      let unterBoden = pos.y + radius > height;
 
      if (unterBoden) {
        v.y = -abs(v.y);
      }

      // move
      a.mult(0);
      a.add(gravitation);
      if (gibSchubs) {
        a.add(schubs);
        gibSchubs = false;
        debug = true;
      }
      v.add(a);
      pos.add(v);
       
      if (unterBoden) {    //positionskorrektur
        pos.y = height - radius;
      }

      //display
      background(0);
      stroke(0);
      circle(pos.x, pos.y, radius)

      if (debug) noLoop();
    
    }

    function mousePressed() {
      gibSchubs = true;
    }

    function keyPressed() {
      if (key === 'd' && debug ) {
        loop();
      }
    }
```

<iframe src="kraefte02_Loesung.html" width="420" height="420"></iframe>