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

-----

#### Steuerung 1

Der Winkel des Geschwindigkeitvektors wird durch die Pfeiltasten geändert, der Betrag der Geschwindigkeit
 durch die Tasten *w* und *s*. Mit let `v = p5.Vector.fromAngle(winkel, geschwindigkeit)` erzeugen wir aus
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


#### Entlang

Bei Mausklick entstehen zufällige Punkte, die miteinander verbunden werden. Ein Punkt fährt die Linien entlang

<iframe src="entlangViele.html" width="420" height="420"></iframe>