## Kräfte

#### Fallen

Die Gravitationskraft modellieren wir als eine Beschleunigung nach unten. In jedem draw-Durchgang ändert die Beschleunigung die Geschwindigkeit, dann ändert die Geschwindigkeit die Position.

```
let pos;
let v;
let a;

function setup() {
    createCanvas(400, 400);

    pos = createVector(200,50);   
    v = createVector(0,0);
    a = createVector(0,0.08);
}

function draw() {
    background(0);
    v.add(a);
    pos.add(v);

    fill(240);
    circle(pos.x,pos.y,20);
}
```

<iframe src="fallen.html" width="420" height="420"></iframe>

------

#### Mehrere Kräfte

Den Ball modellieren wir als ein Objekt der Klasse *Mover*.

Mehrere Kräfte führen wir mit der Methode *applyForce* zu einer Gesamtbeschleunigung.
In jedem draw-Durchgang werden die Kräfte neu addiert, deswegen wird nach der Positionsveränderung in der
Methode *move* die Beschleunigung auf 0 gesetzt.

```
    let m;

    function setup() {
      createCanvas(400, 400);
      m = new Mover();
    }

    function draw() {
      background(0);
      let wind = createVector(0.08, 0);
      let gravity = createVector(0, 0.4);
      m.applyForce(gravity);
      m.applyForce(wind);
      m.act();
    }

    class Mover {

      constructor() {
        this.pos = createVector(30, 30);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
        this.radius = 10;
      }

      applyForce(force) {
        this.a.add(force);
      }

      act() {
        this.check();
        this.move();
        this.display();
      }

      move() {
        this.v.add(this.a);
        this.pos.add(this.v);
        this.a.mult(0);
      }

      display() {
        fill(255);
        ellipseMode(RADIUS);
        circle(this.pos.x, this.pos.y, this.radius);
      }

      check() {
        if (this.pos.x > width - this.radius) {
          this.pos.x = width - this.radius;
          this.v.x *= -1;
        } else if (this.pos.x < this.radius) {
          this.pos.x = this.radius;
          this.v.x *= -1;

        }
        if (this.pos.y > height - this.radius) {
          this.pos.y = height - this.radius;
          this.v.y *= -1;
        } else if (this.pos.y < this.radius) {
          this.pos.y = this.radius;
          this.v.y *= -1;
        }
      }
    }
```

<iframe src="windUndGravitation.html" width="420" height="420"></iframe>


----

#### Reibung

Reibung modellieren wir als eine Kraft, die entgegen der Richtung des Geschwindigkeitsvektors wirkt.
Ihre Stärke setzen wir auf einen festen kleinen Wert.

``` 
    let m;

    function setup() {
      createCanvas(400, 400);
      m = new Mover();
    }

    function draw() {
      background(0);

      let wind = createVector(0.05, 0);
      let gravity = createVector(0, 0.3);

      let friction = m.v.copy();   // der Vektor für 
      friction.setMag(-0.03);      // die Reibung

      m.applyForce(friction);
      m.applyForce(gravity);
      m.applyForce(wind);
      m.act();

    }

    class Mover {

      constructor() {
        this.pos = createVector(30, 30);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
        this.radius = 10;
      }

      applyForce(force) {
        this.a.add(force);
      }

      act() {
        this.check();
        this.move();
        this.display();
      }

      move() {
        this.v.add(this.a);
        this.pos.add(this.v);
        this.a.mult(0);
      }

      display() {
        fill(255);
        ellipseMode(RADIUS);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
      }

      check() {
        if (this.pos.x > width - this.radius) {
          this.pos.x = width - this.radius;
          this.v.x *= -1;
        } else if (this.pos.x < this.radius) {
          this.pos.x = this.radius;
          this.v.x *= -1;

        }
        if (this.pos.y > height - this.radius) {
          this.v.y *= -1;
          this.pos.y = height - this.radius;
        } else if (this.pos.y < this.radius) {
          this.pos.y = this.radius;
          this.v.y *= -1;
        }

      }
    }
```

<iframe src="reibung.html" width="420" height="420"></iframe>

-----

#### Würmchen

Solange die Maus geklickt ist beschleunigen die Würmchen Richtung Maus. Ist die Maus nicht geklickt, wird
die Beschleunigung bei jedem draw-Durchgang zufällig neu gesetzt. 


```
    let baelle = new Array(100);

    function setup() {
      createCanvas(700, 700);
      noStroke()

      for (let i = 0; i < baelle.length; i++) {
        baelle[i] = new Ball();
      }
    }

    function draw() {
      background(0, 20);
      for (let b of baelle) b.act();
    }


    class Ball {

      constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.v = createVector(random(-5, 5), random(-5, 5));
        this.a = createVector(0, 0);
        this.radius = 8;
        this.topSpeed = 6;
      }

      act() {
        this.checkRand();
        this.move();
        this.display();
      }

      move() {

        if (mouseIsPressed) {
          let mouse = createVector(mouseX, mouseY);
          this.a = p5.Vector.sub(mouse, this.pos);
          this.a.setMag(0.5);
        } else {
          this.a.set(random(-1, 1), random(-1, 1));
        }
        this.v.add(this.a);
        this.v.limit(this.topSpeed);
        this.pos.add(this.v);
      }

      display() {
        fill(255);
        circle(this.pos.x, this.pos.y, this.radius * 2);
      }

      checkRand() {
        if (this.pos.x - this.radius > width) this.pos.x = -this.radius;
        else if (this.pos.x + this.radius < 0) this.pos.x = width + this.radius;

        if (this.pos.y - this.radius > height) this.pos.y = -this.radius;
        else if (this.pos.y + this.radius < 0) this.pos.y = height + this.radius;
      }
    }
``` 

<iframe src="wuermchen.html" width="720" height="720"></iframe>

-----

#### Navigation 

Bei dieser Navigation ändern wir mit den Pfeiltasten nicht die Richtung der Geschwindigkeit sondern die
Ausrichtung des Objekts durch Rotation. Mit der Taste w können wir den Schub einschalten, der immer in die
Richtung geht, in die das Objekt zeigt. Die Reibung wirkt in Gegenrichtung zur Geschwindigkeit.


```
    let m;

    function setup() {
      createCanvas(400, 400);
      m = new Mover();

    }

    function draw() {
      background(0);

      if (keyIsDown(LEFT_ARROW)) m.winkel -= 0.1;
      if (keyIsDown(RIGHT_ARROW)) m.winkel += 0.1;

      if (keyIsDown(87)) {        // Taste w für Schub
        let schub = p5.Vector.fromAngle(m.winkel, 0.2);
        m.applyForce(schub);
      }

      let friction = m.v.copy();  // Reibung
      friction.setMag(-0.05);
      m.applyForce(friction);

      m.act();

    }

    class Mover {

      constructor() {
        this.pos = createVector(30, 30);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
        this.winkel = 0;   // Die Ausrichtung des Movers
      }

      applyForce(force) {
        this.a.add(force);
      }

      act() {
        this.check();
        this.move();
        this.display();
      }

      move() {
        this.v.add(this.a);
        this.pos.add(this.v);
        this.a.mult(0);
      }

      display() {
        fill(255);
        stroke(255);
        strokeWeight(2);

        push();
        translate(this.pos.x, this.pos.y)
        rotate(this.winkel);

        fill(255);
        circle(0, 0, 10);

        stroke(255);
        strokeWeight(2);
        line(0, 0, 10, 0);
        pop();
      }

      check() {
        if (this.pos.x > width + 5) this.pos.x = -5;
        if (this.pos.y > height + 5) this.pos.y = -5;
        if (this.pos.x < -5) this.pos.x = width + 5;
        if (this.pos.y < -5) this.pos.y = height + 5;
      }
    }
```

<iframe src="navigation.html" width="420" height="420"></iframe>

#### Jump

Mit der Taste *w* geben wir dem Ball einen Schups nach oben. Der Tastendruck hat nur dann einen Effekt
wenn die Varialbe *onGround* den Wert *true* hat.

```
    let m;
    let onGround = false;

    function setup() {
      createCanvas(400, 400);
      m = new Mover();
    }

    function draw() {
      background(0);

      if (keyIsDown(RIGHT_ARROW) && onGround)
        m.applyForce(createVector(0.2, 0));

      if (keyIsDown(LEFT_ARROW) && onGround)
        m.applyForce(createVector(-0.2, 0));

      let gravity = createVector(0, 0.4);
      m.applyForce(gravity);

      if (onGround) {
        let friction = m.v.copy();  // Reibung
        friction.setMag(-0.1);
        m.applyForce(friction);
      }

      m.act();

    }

    function keyPressed() {
      if (key === 'w' && onGround) {
        let jump = createVector(0, -10);
        m.applyForce(jump);
      }
    }

    class Mover {

      constructor() {
        this.pos = createVector(30, 30);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
      }

      applyForce(force) {
        this.a.add(force);
      }

      act() {
        this.check();
        this.move();
        this.display();
      }

      move() {
        this.v.add(this.a);
        this.pos.add(this.v);
        this.a.mult(0);
      }

      display() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 10, 10);
      }

      check() {
        if (this.pos.y >= height - 5) {
          onGround = true;
          this.v.y = 0;
          this.pos.y = height - 5;  // falls versunken
        }
        else {
          onGround = false;
        }
      }
    }
```

<iframe src="jump.html" width="420" height="420"></iframe>

----

#### Jump and Run

```
    let m;
    let balken0;     // ground
    let balken1;
    let gravity;
    let jump;

    let onGround = false;

    function setup() {
      createCanvas(400, 400);
      m = new Mover();
      balken0 = new Balken(-50, height - 10, width + 100, 10, 0);
      balken1 = new Balken(180, 320, 80, 10, -1);
      gravity = createVector(0, 0.4);
      jump = createVector(0, -8);
    }

    function draw() {
      background(240);

      // check
      if (keyIsDown(RIGHT_ARROW) && onGround)
        m.applyForce(createVector(0.3, 0));

      if (keyIsDown(LEFT_ARROW) && onGround)
        m.applyForce(createVector(-0.3, 0));

      if (!onGround)
        m.applyForce(gravity);

      if (onGround) {
        let friction = m.v.copy();  // Reibung
        friction.setMag(-0.2);
        m.applyForce(friction);
      }

      // move
      m.move();
      balken1.move();
      onGround = m.collide(balken0) || m.collide(balken1);   // darin ist ein move enthalten

      // display
      m.display();
      balken0.display();
      balken1.display();
    }

    function keyPressed() {
      if (key === 'w' && (onGround)) {
         m.applyForce(jump);
      }
    }

    class Mover {

      constructor() {
        this.w = 8;   // width
        this.h = 20;  // height
        this.pos = createVector(80, height - 100);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
      }

      applyForce(force) {
        this.a.add(force);
      }

      move() {
        this.v.add(this.a);
        this.pos.add(this.v);
        this.a.mult(0);
      }

      display() {
        fill(255);
        fill(20);
        rect(this.pos.x, this.pos.y, this.w, this.h);
      }

      collide(b) {
        let linksVonBalken = this.pos.x + this.w < b.x;
        let rechtsVonBalken = this.pos.x > b.x + b.w;
        let ueberBalken = this.pos.y + this.h < b.y;
        let unterBalken = this.pos.y > b.y + b.h;
        let collision = !(linksVonBalken || rechtsVonBalken || ueberBalken || unterBalken);
        if (collision) {
          if (this.v.y < 0) {
            this.v.y = -this.v.y       // Kollision von unten zählt nicht
            return false;
          }
          this.pos.y = b.y - this.h;   // Korrektur der y-Koordinate
          this.pos.x += b.vx;          // Mover wird von Balken mitgenommen.
          this.v.y = 0;
        }
        return collision;
      }
    }

    class Balken {
      constructor(x, y, w, h, vx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = vx;
      }

      move() {
        this.x = this.x + this.vx;
        if (this.x < 30 || this.x + this.w > width - 30) this.vx = -this.vx;
      }

      display() {
        noStroke();
        fill(150);
        rect(this.x, this.y, this.w, this.h);
      }
    }

```


<iframe src="jumpRun.html" width="420" height="420"></iframe>


-------

Mehrere Balken verwalten wir in einem Array

```
    let m;
    let balken = [];
    let gravity;
    let jump;

    let onGround = false;

    function setup() {
      createCanvas(400, 400);
      m = new Mover();
      balken.push(new Balken(-50, height - 10, width + 100, 10, 0));   // ground
      balken.push(new Balken(180, 320, 80, 10, -1));
      balken.push(new Balken(50, 260, 80, 10, 1.2));
      balken.push(new Balken(250, 200, 80, 10, -1.6));
      balken.push(new Balken(100, 140, 80, 10, +0.8));
      balken.push(new Balken(200, 80, 80, 10, -2));
      gravity = createVector(0, 0.4);
      jump = createVector(0, -8);
    }

    function draw() {
      background(240);

      // check 
      // der erste check ist, ob der Mover onGround ist. Davon hängen die weiteren Dinge ab.
      onGround = false;
      for (let b of balken) {
        if (m.collide(b)) onGround = true;
      }

      if (keyIsDown(RIGHT_ARROW) && onGround)
        m.applyForce(createVector(0.3, 0));

      if (keyIsDown(LEFT_ARROW) && onGround)
        m.applyForce(createVector(-0.3, 0));

      if (!onGround)
        m.applyForce(gravity);

      if (onGround) {
       if (m.v.mag() > 0.05) {  
          let friction = m.v.copy();  // Reibung
          friction.setMag(-0.2);
          m.applyForce(friction);
        }
        else {  
          m.v.x = 0;
        }
      }

      // move
      m.move();
      for (let b of balken) {
        b.move();
      }

      // display
      m.display();
      for (let b of balken) {
        b.display();
      }
    }

    function keyPressed() {
      if (key === 'w' && (onGround)) {
        m.applyForce(jump);
      }
    }

    class Mover {

      constructor() {
        this.w = 8;   // width
        this.h = 20;  // height
        this.pos = createVector(80, height - 100);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
      }

      applyForce(force) {
        this.a.add(force);
      }

      move() {
        this.v.add(this.a);
        this.pos.add(this.v);
        this.a.mult(0);
      }

      display() {
        fill(255);
        fill(20);
        rect(this.pos.x, this.pos.y, this.w, this.h);
      }

      collide(b) {
        let linksVonBalken = this.pos.x + this.w < b.x;
        let rechtsVonBalken = this.pos.x > b.x + b.w;
        let ueberBalken = this.pos.y + this.h < b.y;
        let unterBalken = this.pos.y > b.y + b.h;
        let collision = !(linksVonBalken || rechtsVonBalken || ueberBalken || unterBalken);
        if (collision) {
          if (this.v.y < 0) {
            this.v.y = -this.v.y       // Kollision von unten zählt nicht
            return false;
          }
          this.pos.y = b.y - this.h;   // Korrektur der y-Koordinate
          this.pos.x += b.vx;          // Mover wird von Balken mitgenommen.
          this.v.y = 0;
        }
        return collision;
      }
    }

    class Balken {
      constructor(x, y, w, h, vx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = vx;
      }

      move() {
        this.x = this.x + this.vx;
        if (this.x < 30 || this.x + this.w > width - 30) this.vx = -this.vx;
      }

      display() {
        noStroke();
        fill(150);
        rect(this.x, this.y, this.w, this.h);
      }
    }
```


<iframe src="jumpRunViele.html" width="420" height="420"></iframe>


----