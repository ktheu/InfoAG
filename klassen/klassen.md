## Klassen und Objekte

Klassen sind Baupläne für Objekte. In den Klassen legen wir die Eigenschaften (Attribute) und die Fähigkeiten (Methoden) der Objekte fest.

Ein Objekt erzeugen wir mit dem Schlüsselwort `new`. Bei der Objekterzeugung wird der Code im `Konstruktor` durchlaufen. Der Konstruktor sollte die Attribute des Objekts auf einen vernünftigen Anfangszustand setzen.
Mit der Zuweisung `this.x = ... ` im Konstruktor definieren wir ein Attribut `x`.

### Ball

Die Klasse `Ball` besitzt die Attribute `x, y, radius` und die Methode `display`.
```
class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    display() {
        noStroke();
        fill(255);
        ellipseMode(RADIUS);
        circle(this.x, this.y, this.radius);
    }
}

let b1;
let b2

function setup() {
    createCanvas(400, 400);
    b1 = new Ball(100, 300, 5);
    b2 = new Ball(200, 200, 20);

}

function draw() {
    background(0);
    b1.display();
    b2.display();
}

```

<iframe src="ballwelt_01.html" width="420" height="420"></iframe>

-------

Der Ball bekommt weitere Attribute und Methoden.

```
class Ball {
    constructor(x, y, vx, vy, radius = 15) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    act() {
        this.checkRand();
        this.move();
        this.display();
    }

    checkRand() {
        if (this.x + this.radius > width || this.x - this.radius < 0) this.vx = -this.vx;
        if (this.y + this.radius > height || this.y - this.radius < 0) this.vy = -this.vy;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    display() {
        noStroke();
        fill(255);
        ellipseMode(RADIUS);
        circle(this.x, this.y, this.radius);
    }
}

let b1;
let b2;
let b3;

function setup() {
    createCanvas(400, 400);
    b1 = new Ball(100, 300, 5, 4, 40);
    b2 = new Ball(200, 200, 10, -3, 20);
    b3 = new Ball(150, 350, 3, 7);
}

function draw() {
    background(0);
    b1.act();
    b2.act();
    b3.act();
}

```

<iframe src="ballwelt_02.html" width="420" height="420"></iframe>

----- 



Die Klasse Ball bleibt unverändert. Wir verwalten viele Bälle in einem Array. In der draw-Funktion verwenden wir
eine `for-of`-Schleife.

```
let baelle = [];
const N = 20;    // Anzahl Bälle

function setup() {
    createCanvas(400, 400);
    for (let i = 0; i < N; i++) {
        let x = random(50, width - 50);
        let y = random(50, height - 50);
        let vx = random(3, 8);
        let vy = random(3, 8);
        let d = random(5, 25);
        baelle[i] = new Ball(x, y, vx, vy, d);
    }
}

function draw() {
    background(0);
    for (let b of baelle) {
        b.act();
    }
}

```

<iframe src="ballwelt_03.html" width="420" height="420"></iframe>

---- 

### Übungen



----

#### Hinher

Ein Hinher-Objekt ist ein schwarzes Rechteck, dass sich hin und her bewegt. Der Konstruktor erhält nur den
Wert für die y-Koordinate. Implementiere die Klasse Hinher so, dass sie zu dem Code unten passt.

Die Methode `act` in der Klasse Hinher sieht so aus:

```
act() {
    this.checkRand();
    this.move();
    this.display();
}

```

```
let hinher = [];
let y = [100, 200, 300, 400];

function setup() {
    createCanvas(500, 500);
    for (let i = 0; i < y.length; i++) {
        hinher[i] = new Hinher(y[i]);
    }
}

function draw() {
    background(220);
    for (let h of hinher) {
        h.act();
    }
}
``` 

<iframe src="hinherwelt.html" width="520" height="520"></iframe>

-----

#### Counter

Der Konstruktor der Klasse `Counter` nimmt Argumente die x- und y-Koordinate, und für Farbe, Größe und Endewert des Counters an.
In der Klasse gibt es die Methoden `display` und `add`. Schreibe die Klasse Counter so, dass sie zu dem Code unten passt. Die Methode add soll nur hochzählen, wenn der Endewert noch nicht erreicht ist.

```
let c1;
let c2;

function setup() {
    createCanvas(400, 200);
    c1 = new Counter(150, 100, '#670F0F', 80, 40);
    c2 = new Counter(250, 100, '#FF0F0F', 60, 60);
}

function draw() {
    background(220);
    if (frameCount % 40 === 0) {
        c1.add(1)
        c2.add(3)
    }
    c1.display();
    c2.display();
}
```

<iframe src="counterwelt.html" width="420" height="220"></iframe>


-----
#### FlappyBalken

Der Konstruktor der Klasse `FlappyBalken` nimmt Argumente für die x-Koordinate des Balkens und die y-Position der Lücke entgegen. Implementiere die Klasse FlappyBalken so, dass sie zu dem Code unten passt. 

Die Methode `act` in der Klasse FlappyBalken sieht so aus:

```
act() {
    this.checkRand();
    this.move();
    this.display();
}
```

Die Methode `checkRand()` prüft, ob der Balken nach links rausgelaufen ist. Wenn dies der Fall ist, versetzt sie
ihn mit neuer Lücke nach rechts. 

```
let balken = [];

function setup() {
    createCanvas(500, 500);

    balken[0] = new FlappyBalken(400, 100);
    balken[1] = new FlappyBalken(500, 300);
    balken[2] = new FlappyBalken(600, 200);
}

function draw() {
    background(220);
    for (let b of balken) {
        b.act();
    }
}
``` 

<iframe src="flappyBalkenwelt.html" width="520" height="520"></iframe>