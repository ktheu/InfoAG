## Vektoren

Ein Objekt der P5JS-Klasse [Vector](https://p5js.org/reference/#/p5.Vector) hat die Attribute x und y. Mit den Methoden der Vektorklasse können viele
Bewegungsprobleme vereinfacht programmiert werden. 

Für einige Vektormethoden gibt in zwei Varianten, z.B:
 

```
# Variante 1
let v = createVector(1, 2);
v.add(4, 5);                   // v ist (5,7)

# Variante 2 (statische Methode)
let v1 = createVector(1, 2);
let v2 = createVector(2, 3);

let v3 = p5.Vector.add(v1,v2)  // v3 ist (3,5), v1, v2 unverändert
``` 

Die gleichmäßig Bewegung ist gekennzeichnet durch den Code:

```
pos.add(v);
```
Die Position des Objekts wird bei jedem draw-Durchgang um den konstanten Vektor _v_ verändert.

#### Gleichmäßige Bewegung


```
let pos;     // Position
let v;       // Geschwindigkeit

function setup() {
    createCanvas(400, 400);
    strokeWeight(10);
    stroke(255);
    pos = createVector(50,200);
    v = createVector(1.5,0.5);
}

function draw() {
    background(0);
    pos.add(v);
    if (pos.x > width + 5) pos.x = -5;
    if (pos.y > height + 5) pos.y = -5;
    circle(pos.x,pos.y,10);
}
```

<iframe src="gleichmaessig.html" width="420" height="420"></iframe>

----

#### Beschleunigte Bewegung

Die beschleunigte Bewegung ist gekennzeichnet durch den Code:

```
v.add(a);
pos.add(v);
```

Bei jedem draw-Durchgang wird die Geschwindigkeit um den konstanten Vektor _a_ verändert.
Mit  _v.limit(15)_ sorgen wir dafür, dass des eine Höchstgeschwindigkeit gibt.

```
let pos;     // Position
let v;       // Geschwindigkeit
let a;       // Beschleunigung

function setup() {
    createCanvas(400, 400);
    strokeWeight(10);
    stroke(255);
    pos = createVector(50,200);
    v = createVector(0,0);
    a = createVector(0.015,0.005);

}

function draw() {
    background(0);
    v.add(a);
    pos.add(v);
    v.limit(15);
    if (pos.x > width + 5) pos.x = -5;
    if (pos.y > height + 5) pos.y = -5;
    circle(pos.x,pos.y,10);
}
```


<iframe src="beschleunigt.html" width="420" height="420"></iframe>

#### Bewegung zwischen zwei Punkten

Mit der *lerp*-Funktion der Klasse *p5.Vector* können wir uns auf einfache Weise von Punkt zu Punkt bewegen.

```
let von;
let bis;
let t = 0;

function setup() {
    createCanvas(400, 300);
    von = createVector(50, 50);
    bis = createVector(350, 250);
}

function draw() {
    background(220);
    if (t > 1) t = 0;

    let v = p5.Vector.lerp(von, bis, t);
    t += 0.01;

    fill(180);
    circle(von.x, von.x, 12);
    circle(bis.x, bis.y, 12);

    fill(60);
    circle(v.x, v.y, 10);
}
```
<iframe src="entlang.html" width="420" height="320"></iframe>

-----


#### Bewegung zwischen vielen Punkten

Um uns mit konstanter Geschwindigkeit von Punkt zu Punkt zu bewegen, addieren wir zu dem Positionsvektor einen Geschwindigkeitsvektor mit konstanter Länge. Die Richtung des Geschwindigkeitsvektors orientiert sich an dem *state* der Bewegung. Immer wenn wir einem Zielpunkt nahe genug sind, wechseln wir den *state*.


Einen Vektor der Länge k, der von v1 nach v2 zeigt, erhalten wir durch folgenden Code:

```
let v = p5.Vector.sub(v2,v1).setMag(k);

```

```
let points = []
let anzahl;
let speed = 5;
let pos;
let state;

function setup() {
    createCanvas(400, 400);
    init0();
}

function init0() {
    state = 0;
    anzahl = floor(random(5, 20));
    points = []
    for (let i = 0; i < anzahl; i++) {
        points.push(createVector(random(10, width - 10), random(10, height - 10)));
    }
    pos = points[0].copy();
}

function draw() {
    background(240);
    for (let i = 0; i < anzahl - 1; i++) {
        if ((state === i) && pos.dist(points[i + 1]) <= speed) {
            state = state + 1;
        }
    }

    if ((state + 1) < anzahl) {
        let v = p5.Vector.sub(points[state+1],pos).setMag(speed)
        pos.add(v);
    }

    stroke(170);
    strokeWeight(1);
    fill(200);

    for (let i = 0; i < anzahl - 1; i++) {
        line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        circle(points[i + 1].x, points[i + 1].y, 4)
    }
    circle(points[0].x, points[0].y, 4);

    fill(50);
    circle(pos.x, pos.y, 10);
}

function mousePressed() {
    init0();
}

```
<iframe src="entlangViele.html" width="420" height="420"></iframe>

------

#### Lerp Linien

```
let v1, v2, v3;   // Punkt für die linke und rechte Linien
let anzahl = 15;  // Anzahl dünner Linien      
let a = [];       // prozentuale Aufteilung der dünnen Linien
let geschwindigkeit = 0.01;

function setup() {
  createCanvas(200, 250);
  v0 = createVector(100, 50);  // oben
  v1 = createVector(50, 200);  // links unten
  v2 = createVector(150, 200); // rechts unten
  w = createVector(100, 170);  // mitte nicht ganz unten (unsichtbar)
  for (let i = 0; i < anzahl; i++) {
    a[i] = i / anzahl;  
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

    let p1 = p5.Vector.lerp(v1, v0, a[i]);
    let p2 = p5.Vector.lerp(v2, v0, a[i]);
    let p3 = p5.Vector.lerp(w, v0, a[i]);

    line(p1.x, p1.y, p3.x, p3.y);
    line(p2.x, p2.y, p3.x, p3.y);
  }
}

```
<iframe src="lerpLinien.html" width="220" height="270"></iframe>

-----

#### Steuerung 1

Der Winkel des Geschwindigkeitvektors wird durch die Pfeiltasten geändert, der Betrag der Geschwindigkeit
 durch die Tasten *w* und *s*. Mit `let v = p5.Vector.fromAngle(winkel, geschwindigkeit)` erzeugen wir aus
 den beiden Werten den Geschwindigkeitsvektor.

```
let pos;
let winkel = 0;
let geschwindigkeit = 0;

function setup() {
    createCanvas(400, 400);
    strokeWeight(10);
    stroke(255);
    pos = createVector(50, 200);
}

function draw() {
    background(0);
    if (keyIsDown(LEFT_ARROW)) winkel -= 0.06;
    if (keyIsDown(RIGHT_ARROW)) winkel += 0.06;
    if (keyIsDown(87)) geschwindigkeit += 0.1;
    if (keyIsDown(83)) geschwindigkeit -= 0.1;

    let v = p5.Vector.fromAngle(winkel, geschwindigkeit)
    v.limit(5);
    pos.add(v);

    if (pos.x > width + 5) pos.x = -5;
    if (pos.y > height + 5) pos.y = -5;
    if (pos.x < -5) pos.x = width + 5;
    if (pos.y < -5) pos.y = height + 5;
    circle(pos.x, pos.y, 10);
}
```

<iframe src="lenken.html" width="420" height="420"></iframe>

---


### Übungen

#### Umdrehen

Eine beschleunigte Bewegung. Bei Mausclick multiplizieren wir den Beschleunigungsvektor mit -1.

``` 
function mousePressed() {
    a = a.mult(-1);
}
``` 

<iframe src="umdrehen.html" width="420" height="420"></iframe>


#### Halber Weg

Von der Mausposition wird eine Linie Richtung Mittelpunkt gezeichnet, die halb so lang ist wie die Entfernung zum Mittelpunkt.

<iframe src="halberWeg.html" width="420" height="420"></iframe>

-----


#### Nach oben rechts

Bei jedem Mausklick entsteht ein neuer Ball, der nach oben rechts fliegt. Es fliegt aber immer nur ein Ball.

<iframe src="nachobenrechts.html" width="420" height="420"></iframe>

----

#### Nach oben rechts viele

Bei jedem Mausklick entsteht ein neuer Ball, der nach oben rechts fliegt. Es können auch viele unterwegs sein. Die Bälle werden in einem Array verwaltet.

<iframe src="nachobenrechtsViele.html" width="420" height="420"></iframe>

---- 

#### Ablenkung

Bei jedem Klick entsteht ein Ball, der zunächst nach oben rechts fliegt. Überschreitet seine Entfernung zum Mittelpunkt eine gewissen Wert, wird seine Flugbahn abgelenkt.

<iframe src="ablenkung.html" width="420" height="420"></iframe>


