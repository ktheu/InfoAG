## Perlin Noise

Die *random*-Funktion liefert sprunghaft zufällige Werte. *Perlin Noise* liefert zufällige Werte, bei denen die gerade vergangenen Werte mitberücksichtigt werden. Dadurch können zu große Sprünge vermieden werden.


#### Random

```
    let y = [];

    function setup() {
      createCanvas(600, 200);
      for (let x = 0; x < width; x++) {
        y[x] = random(height);
      }
    }

    function draw() {
      background(255);

      y.splice(0, 1);                // nimm y[0] aus dem Array heraus
      y[width - 1] = random(height);  // ermittle neuen Wert für ganz rechts.

      for (let x = 0; x < width - 1; x++) {
        line(x, y[x], x + 1, y[x + 1]);
      }
    }

```

<iframe src="randomnoise.html" width="620" height="220"></iframe>

----

#### Perlin Noise

*noise* erhält ein Argument *t*, das wir uns als Zeit vorstellen können. Je geringer die Differenz zum nächsten *t* ist, desto weniger sprunghaft ist der nächste zufällige Wert. *noise* liefert Werte zwischen 0 und 1.


```
    let y = []
    let t;             // t als float-Argument für das Perlin-Rauschen
    let incr = 0.01;   // increment (Erhöhung) für t

    function setup() {
      createCanvas(600, 200);
      strokeWeight(2);
      t = random(0, 1000);                       // t wird anfänglich zufällig gesetzt
      for (let x = 0; x < width; x++) {          // y-Elemente nacheinander mit noise gesetzt
        y[x] = map(noise(t), 0, 1, 0, height);    
        t += incr;                                  
      }
    }

    function draw() {
      background(255);

      y.splice(0, 1);                               // linken Wert entfernen

      t += incr;
      y[width - 1] = map(noise(t), 0, 1, 0, height); // neuer Wert für ganz rechts

      for (let x = 0; x < width - 1; x++) {
        line(x, y[x], x + 1, y[x + 1]);
      }
    }
```

<iframe src="perlinnoise.html" width="620" height="220"></iframe>

---- 


#### Bewegung mit Noise

Wir verändern die Koordinaten der beiden Punkte mit *noise*. Für jede Koordinate starten wir an einem
anderen Zeitpunkt *t*.

```
    let x1 = 30;
    let y1 = 80;
    let x2 = 250;
    let y2 = 200;
    let incr = 0.01;
    let t = 100;

    function setup() {
      createCanvas(400, 400);
    }

    function draw() {
      background(80);
      x1 = map(noise(t), 0, 1, 0, width);
      y1 = map(noise(t + 100), 0, 1, 0, height);
      x2 = map(noise(t + 200), 0, 1, 0, width);
      y2 = map(noise(t + 300), 0, 1, 0, height);

      stroke(200);
      strokeWeight(5);
      line(x1, y1, x2, y2)
      t += incr;
    }

```

<iframe src="posNoise.html" width="420" height="420"></iframe>
