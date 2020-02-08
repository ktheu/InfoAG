## Transformationen

### translate

Mit *translate* verschieben wir den Koordinatenursprung. Innerhalb eines draw-Durchgangs "addieren" sich die
die Transformationen.

```
function setup() {
    createCanvas(300, 200);
}

function draw() {
    background(240);
    fill(220)
    rect(0, 0, 30, 50);

    translate(80, 80);
    fill(180);
    rect(0, 0, 30, 50);

    translate(100, 10);
    fill(140);
    rect(0, 0, 30, 50);
}

```

<iframe src="translate01.html" width="320" height="220"></iframe>

----

Mit *push()* und *pop()* können wir Transformationen nur auf die dazwischenliegenden Zeichnungen beziehen.

```
function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(240);
  fill(220)
  rect(0,0,30,50);
  
  push();
  translate(80,80);
  fill(180);
  rect(0,0,30,50);
  pop();
  
  push();
  translate(100,10);
  fill(140);
  rect(0,0,30,50);
  pop();
}

```


<iframe src="translate02.html" width="320" height="220"></iframe>

----

### rotate

Mit *rotate* drehen wir das Koordinatensystem um den Ursprung. Alle folgenden Koordinatenangaben beziehen sich auf das
gedrehte Koordinatensystem.

```
function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(240);
  circle(80,50,4);
  
  rotate(radians(30));
  rect(0,0,40,20);
  rect(80,50,40,20);
}

``` 

<iframe src="rotateN01.html" width="220" height="220"></iframe>

----

Bei *translate + rotate* kommt es auf die Reihenfolge an. 
Bei den meisten Anwendungen wendet man erst *translate*, dann *rotate* an.

```
function setup() {
    createCanvas(200, 200);
}

function draw() {
    background(240);

    circle(80, 50, 6);

    push();
    translate(80, 50);
    rotate(radians(30))
    fill(180);
    rect(0, 0, 40, 20);
    pop();

    push();
    rotate(radians(30))
    translate(80, 50);
    fill(140);
    rect(0, 0, 40, 20);
    pop();
}
```
<iframe src="rotateN02.html" width="220" height="220"></iframe>

-------

#### Rotierendes Rechteck

Mit *rectMode(CENTER)* und *translate* können wir das Rechteck um seinen Mittelpunkt drehen.

```
let winkel = 0; // aktueller Winkel des Rechtecks

function setup() {
    createCanvas(400, 400);
    rectMode(CENTER);
}

function draw() {
    background('#F0C92E');

    // der Kreis
    noFill();
    stroke(0);
    circle(width / 2, height / 2, 300);

    // das drehende Rechteck
    winkel = winkel + 0.5;

    push();
    translate(width / 2, height / 2);
    rotate(radians(winkel));
    fill('#988433');
    noStroke();
    rect(0, 0, 300, 20);
    pop();
}
```

<iframe src="rotierendesRechteck.html" width="420" height="420"></iframe>

------

#### Lenken mit rotate

Der Ball wird in die Richtung des Geschwindigkeitsvektors gedreht.

```
let pos;
let winkel = 0;
let geschwindigkeit = 0.5;

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

    push();

    translate(pos.x, pos.y)
    rotate(v.heading());
    circle(0, 0, 10);

    strokeWeight(1);
    line(0, 0, 20, 0);

    pop();
}

```
<iframe src="lenkenMitRotate.html" width="420" height="420"></iframe>

-----

### Übungen

#### Haufen

Eine Figur wird mittels *scale* in unterschiedlichen Größen gezeichnet.


<iframe src="haufen.html" width="620" height="420"></iframe>

-----

#### Farbenrad

<iframe src="farbenrad.html" width="320" height="220"></iframe>


------

#### Planeten

<iframe src="planeten01.html" width="420" height="420"></iframe>

-------

#### Planeten 2


<iframe src="planeten02.html" width="420" height="420"></iframe>

-----

#### Dreieck Lenken

Die Geschwindigkeit des Dreiecks wird mit den Tasten *w,s* gesteuert, die Richtung mit den Pfeiltasten.
Mit der *s*-Taste kann man nur bis zu einer gewissen Mindestgeschwindigkeit abbremsen.

<iframe src="dreiecklenken.html" width="420" height="420"></iframe>

----


