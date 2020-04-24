## Vererbung

Aus bestehenden Klassen kann man neue Klassen ableiten (Unterklassen). Eine abgeleitete Klasse erbt von der Oberklasse ihre Attribute und Methoden, fügt ggf. eigene hinzu und kann ihnen durch Überschreiben eine neue Bedeutung geben.



#### Kreis und Quadrat als unabhängige Klassen 

Die Klassen unterscheiden sich nur in der Methode *display*.
```
    class Kreis {

      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.groesse = 30;
      }

      move() {
        this.x = this.x + random(-3, +3);
        this.y = this.y + random(-3, +3);
      }

      display() {
        circle(this.x, this.y, this.groesse);
      }
    }

    class Quadrat {

      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.groesse = 30;
      }

      move() {
        this.x = this.x + random(-3, +3);
        this.y = this.y + random(-3, +3);
      }

      display() {
        square(this.x, this.y, this.groesse);
      }
    }

    let k;
    let q;

    function setup() {
      createCanvas(400, 400);
      k = new Kreis(100, 200);
      q = new Quadrat(200, 300);
    }

    function draw() {
      background(220);
      k.move();
      q.move();

      k.display();
      q.display();
    }
``` 

<iframe src="ohneVererbung.html" width="420" height="420"></iframe>

#### Kreis und Quadrat als Unterklasse  

Die Unterklassen erben alle Attribute und Methoden der Oberklasse *Partikel*. Hier fügt jede Unterklasse eine eigene display-Methode hinzu. Unterklassen werden mit dem Schlüsselwort *extends* gebildet.

```
    class Particle {

      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.groesse = 30;
      }

      move() {
        this.x = this.x + random(-3, +3);
        this.y = this.y + random(-3, +3);
      }
    }

    class Kreis extends Particle {

      display() {
        circle(this.x, this.y, this.groesse);
      }
    }

    class Quadrat extends Particle {

      display() {
        square(this.x, this.y, this.groesse);
      }
    }

    let k;
    let q;

    function setup() {
      createCanvas(400, 400);
      k = new Kreis(100, 200);
      q = new Quadrat(200, 300);
    }

    function draw() {
      background(220);
      k.move();
      q.move();

      k.display();
      q.display();
    }
```

#### Erweitern und Überschreiben

In den Unterklassen können neue Attribute hinzugefügt und bestehende Methode überschrieben werden.

```
    class Particle {

      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.groesse = 30;
      }

      move() {
        this.x = this.x + random(-3, +3);
        this.y = this.y + random(-3, +3);
      }
    }

    class Kreis extends Particle {

      display() {
         circle(this.x, this.y, this.groesse);
      }
    }

    class Quadrat extends Particle {

      display() {
         square(this.x, this.y, this.groesse);
      }
    }

    class Pulsquadrat extends Quadrat {

       constructor(x, y, maxDurchmesser) {
         super(x,y);                                // ruft Konstruktor der Oberklasse auf
         this.maxDurchmesser = maxDurchmesser;      // und setzt zusätzliches Attribut  
       }

       move() {                                     // überschreibt die move-Methode der Oberklasse
         this.groesse = random(30,this.maxDurchmesser);
         super.move();                              // ruft move-Methode der Oberklasse auf
       }
    }

    let k;
    let q;
    let pq;

    function setup() {
      createCanvas(400, 400);
      k = new Kreis(100, 200);
      q = new Quadrat(200, 300);
      pq = new Pulsquadrat(300,100,40);
    }

    function draw() {
      background(220);
      k.move();
      q.move();
      pq.move();

      k.display();
      q.display();
      pq.display();
    }
```

<iframe src="ueberSchreiben.html" width="420" height="420"></iframe>
