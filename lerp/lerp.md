## Map and Lerp

### Map

Die *map*-Funktion bildet einen Bereich auf einen anderen Bereich ab. Damit können wir auf einfache Weise
die Maus-Bewegung zur Veränderung von Parametern nutzen.

#### Map Demo

Die x-Position der Maus wird auf einen anderen Bereich für die x-Koordinate des Kreises gemappt, 
die y-Position der Maus wird auf einen Bereich für einen Grauwert gemappt.

```
    function setup() {
      createCanvas(200, 200);
    }

    function draw() {
      background(240);

      let x = map(mouseX, 0, width, 50, width - 50);
      let farbe = map(mouseY, 0, height, 50, 200);

      fill(farbe);
      circle(x, 100, 50);
    }

```

<iframe src="map.html" width="220" height="220"></iframe>

----

#### Wandernde Kreise

Der Farbton wird über *mouseX*, der Radius der Kreise über *mouseY* gesteuert.

```
let hue = int(map(mouseX, 0, width, 0, 360));
let durchmesser = int(map(mouseY, 0, height, 5, 250));
```

```
let pos;
let v;

function setup() {
    createCanvas(800, 600);
    pos = createVector(50, 50);
    v = createVector(10, 15);

    noFill();
    strokeWeight(2);
    background(0);
    colorMode(HSB, 360, 100, 100);
}

function draw() {

    if (frameCount % 300 == 0) {
    background(0);
    pos = createVector(400 + random(-300, 300), 300 + random(-200, 200));
    v = createVector(random(5, 20), random(5, 20));
    }

    let hue = int(map(mouseX, 0, width, 0, 360));
    let sat = int(random(0, 100));
    let bright = int(random(50, 100));

    stroke(hue, sat, bright);

    pos.add(v);

    if (pos.y > height || pos.y < 0)
    v.y = -v.y
    if (pos.x > width || pos.x < 0)
    v.x = -v.x

    let durchmesser = int(map(mouseY, 0, height, 5, 250));
    circle(pos.x, pos.y, durchmesser);
}

```

<iframe src="wanderndeKreise.html" width="820" height="620"></iframe>

----- 

### Lerp

Lerp steht für *linear interpolation*. Die Funktion berechnet den Zwischenwert zwischen einem Anfangs- und Endwert.


#### Lerp Demo
```
let von = 50;
let bis = 350;

function setup() {
    createCanvas(400, 100);
}

function draw() {
    background(220);
    x1 = lerp(von, bis, 0.25);
    x2 = lerp(von, bis, 0.5);
    x3 = lerp(von, bis, 0.9);

    fill(180);
    circle(von, 50, 12);
    circle(bis, 50, 12);

    fill(60);
    circle(x1, 50, 10);
    circle(x2, 50, 10);
    circle(x3, 50, 10);
}
```
 

<iframe src="lerpdemo.html" width="420" height="120"></iframe>

----

 

#### Von Punkt zu Punkt

Ein Punkt bewegt sich von einem Anfangspunkt zu einem Endpunkt.

```
let von = 50;
let bis = 350;
let t = 0;

function setup() {
    createCanvas(400, 100);
}

function draw() {
    background(220);
    if (t > 1) t = 0;

    x1 = lerp(von, bis, t);
    t += 0.01;


    fill(180);
    circle(von, 50, 12);
    circle(bis, 50, 12);

    fill(60);
    circle(x1, 50, 10);
}

```
<iframe src="zwischenPunkten.html" width="420" height="120"></iframe>

----

Sind x und y-Koordinate von Anfangspunkt und Endpunkt verschieden, nutzen wir zwei lerp-Funktionen

```
let vonX = 50;
let vonY = 50;
let bisX = 350;
let bisY = 250;
let t = 0;

function setup() {
    createCanvas(400, 300);
}

function draw() {
    background(220);
    if (t > 1) t = 0;

    x1 = lerp(vonX, bisX, t);
    y1 = lerp(vonY, bisY, t);
    t += 0.01;


    fill(180);
    circle(vonX, vonY, 12);
    circle(bisX, bisY, 12);

    fill(60);
    circle(x1, y1, 10);
}
```

<iframe src="zwischenPunkten02.html" width="420" height="320"></iframe>

----

Der Sketch oben wird einfacher, wenn wir die *lerp*-Funktion der *P5.Vector*-Klasse nutzen.

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

<iframe src="zwischenVektoren.html" width="420" height="320"></iframe>

-----

#### Easing

Eine Easing-Bewegung wird um so langsamer, je näher sie dem Ziel kommt. Mit der *lerp*-Funktion
ist dies einfach zu implementieren.


```
let x1 = 50;
let x2 = 350;

function setup() {
    createCanvas(400, 100);
}

function draw() {
    background(220);
    x1 = lerp(x1, x2, 0.03);
    fill(160);
    circle(x2, 50, 50);
    fill(60);
    circle(x1, 50, 30);
}

function mousePressed() {
    x1 = 50;
}

```
<iframe src="easing.html" width="420" height="120"></iframe>
