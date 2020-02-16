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

#### Map Demo 02

Die x-Position der Maus wird auf einen Farbbereich gemappt, die y-Position bestimmt den Durchmesser.

```
function setup() {
    createCanvas(200, 200);
    noStroke();
    colorMode(HSB, 360, 100, 100);
}

function draw() {
    background('#EEEEEE');

    let farbe = map(mouseX, 0, width, 180, 200);
    let durchmesser = map(mouseY, 0, height, 100, 50);

    fill(farbe,100,100);
    circle(100, 100, durchmesser);
}

```

<iframe src="mapDemo02.html" width="220" height="220"></iframe>


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
