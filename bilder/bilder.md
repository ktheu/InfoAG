## Bilder

Für Hintergrundbilder eignet sich das *jpg*-Format, für Bilder von Spielfiguren (Sprites) mit transparentem
Hintergrund eignet sich das *png*-Format.
 

-----

Lizenzfreie Bilder können von  [Pexels](https://www.pexels.com/) oder [Unsplash](https://unsplash.com/)  heruntergeladen und dann in den P5-WebEditor geladen werden.


#### Upload in den P5 Webeditor

Die maximale Bildgröße für den Upload in den Webeditor ist **5 MB**. Bei [Pexels] haben wir die
Möglichkeit, beim Download zwischen verschiedenen Größen zu wählen. 

Nach dem Login im P5-Webeditor und dem Klick auf *Sketch, AddFile* haben wir die Möglichkeit, ein Bild in den markierten Bereich zu ziehen oder durch Klick auf den freien Bereich (unterhalb des *OR*) ein File zu wählen.

Wenn wir dann den linken Bereich mit der Fileübersicht aufklappen, sehen wir dort das
hochgeladene Bild und können es ggf umbenennen.

<img src="upload2.png" width="801">

-----

#### Preload

Medien werden in der preload-Funktion geladen. Im Beispiel orientiert sich die Leinwandgröße an der Bildgröße.
Die Koordinaten der *img*-Funktion sind die obere Ecke des Bildes

#### Wall

```
let img;

function preload() {
    img = loadImage("wall.jpg");

}

function setup() {
    createCanvas(img.width, img.height);
}

function draw() {
    image(img, 0, 0);
}
```

<iframe src="wall.html" width="660" height="320"></iframe>

-----

#### Bildgröße in unterschiedlichen Größe anzeigen.

Der *img*-Funktion können wir weitere Koordinaten für die Breite und Höhe des Bildes mitgeben. Wenn 
wir keine Verzerrungen wollen, berechnen wir das Seitenverhältnis aus dem Originalbild.

``` 
let img;

function preload() {
    img = loadImage("wall.jpg");
}

function setup() {
    createCanvas(640, 300);
}

function draw() {
    background(255);

    let sv = img.height / img.width    // Seitenverhältnis
    let bildbreite = 200;
    let bildhoehe = bildbreite * sv;
    image(img, 50, 50, bildbreite, bildhoehe);

    bildbreite = 150;
    bildhoehe = bildbreite * sv;
    image(img, 300, 50, bildbreite, bildhoehe);
}
```

<iframe src="wall02.html" width="660" height="320"></iframe>

---- 

#### Bildgröße ändern

Mit der *resize*-Funktion können wir die Größe des Bildes, das wir in der Variablen gespeichert haben, dauerhaft verändern.

```
let img;

function preload() {
    img = loadImage("wall.jpg");
}

function setup() {
    createCanvas(640, 300);
    let bildbreite = 100;
    img.resize(bildbreite, 0)
}

function draw() {
    background(255);
    image(img, 50, 50);
    image(img, 300, 50);
}

```

<iframe src="wall03.html" width="660" height="320"></iframe>

#### Sprites

Spielfiguren benötigen einen transparenten Hintergrund. Beispiele finden sich [hier](https://ktheu.github.io/InfoAG/medien.html)


```
let img;
let bugImg;
let bugPos;
let bugV;

function preload() {
    img = loadImage("wall.jpg");
    bugImg = loadImage("ladybug_02.png");
}

function setup() {
    createCanvas(img.width, img.height);
    bugPos = createVector(40, height / 2);
    bugV = createVector(2.0, 0);
}

function draw() {
    // check
    if (bugPos.x > width) bugPos.x = -bugImg.width;

    // move
    bugPos.add(bugV);

    // display
    image(img, 0, 0);
    image(bugImg, bugPos.x, bugPos.y)
}
```

<iframe src="bug.html" width="660" height="446"></iframe>

-----


#### Sprites steuern

Das Beispiel zeigt die Übertragung der Navigation aus dem Abschnitt *Kräfte*. Statt mit *circle* einen Ball zu zeichnen, zeigen wir mit *image* ein Bild. Damit sich die Position des Käfers und damit die Rotation auf das Zentrum des Bildes bezieht, schreiben wir *imageMode(CENTER)*. Da die Position des Hintergrundbilds über die linke obere Ecke bestimmt wird, schreiben wir dort *imageMode(CORNER)*.

```
    let img;
    let bugImg;
    let m;

    function preload() {
      img = loadImage("wall.jpg");
      bugImg = loadImage("ladybug_02.png");
    }

    function setup() {
      createCanvas(img.width, img.height);
      m = new Mover();
    }

    function draw() {
      imageMode(CORNER);
      image(img, 0, 0);

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
        imageMode(CENTER);
        image(bugImg, 0, 0);
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

<iframe src="bugLenken.html" width="660" height="446"></iframe>


#### Kachelbilder

Mit Kachel-Bildern können wir kleinen Bildern ein beliebig großen Hintergrund erzeugen.
Beispiele für Kacheln gibt es [hier](https://ktheu.github.io/InfoAG/Medien/Greenfoot/backgrounds/backgrounds.html);

Eine Kachel:

<img src="bricks2.jpg>

```
let kachel;
let fliege;

function preload() {
    kachel = loadImage("bricks2.jpg");
    fliege = loadImage("fly.png");
}

function setup() {
    createCanvas(800, 400);
    console.log(kachel.width)
}

function draw() {
    // Kacheln für den Hintergrund  
    for (let i = 0; i < width + kachel.width; i = i + kachel.width) {
    for (let j = 0; j < height + kachel.height; j = j + kachel.height)
        image(kachel, i, j);
    }

    image(fliege, 400, 200);
}
```

<iframe src="kachel.html" width="820" height="420"></iframe>

#### Bilder umdrehen

Der Hintergrund wird mit Kacheln erzeugt. Das rechte Cliff wird mit *translate* verschoben und mit
*scale(-1.0,1.0)* umgedreht.

```
let clouds;
let cliff;

function preload() {
    cliff = loadImage("cliff.png");
    clouds = loadImage("clouds.jpg");
}

function setup() {
    createCanvas(800, 600);
}

function draw() {
    displayBackground();
    displayCliffs();
}

function displayBackground() {
    for (let i = 0; i < width + clouds.width; i = i + clouds.width) {
        for (let j = 0; j < height + clouds.width; j = j + clouds.width)
            image(clouds, i, j);
    }
}

function displayCliffs() {
    push();
    translate(0, height - cliff.height);   // translate für linkes Cliff
    image(cliff, 0, 0);                    
    pop();

    push();
    translate(width, height - cliff.height);  // translate für rechtes Cliff
    scale(-1.0, 1.0);                         // rechtes Cliff umdrehen
    image(cliff, 0, 0);                     
    pop();
}

```

<iframe src="cliff.html" width="820" height="620"></iframe>

#### Animation

Eine Animation besteht aus einer Folge von Bildern. Im Beispiel werden immer wieder drei Bilder hintereinander gezeigt:

<img src="snapR0.png"> &nbsp; snapR0.png<br>

<img src="snapR1.png">  &nbsp; snapR1.png<br>

<img src="snapR2.png">  &nbsp; snapR2.png


In der Zeile `i = (i + 0.2) % 3`  bestimmt der Wert `0.2` wie schnell die Bilder aufeinander folgen. 

```
let snapImg = []; // Array mit den Snap-Bildern
let i = 0;        // Bildindex
let x = 10;       // Position

function preload() {
    snapImg[0] = loadImage("snapR0.png");
    snapImg[1] = loadImage("snapR1.png");
    snapImg[2] = loadImage("snapR2.png");
}

function setup() {
    createCanvas(500, 200);
}

function draw() {
    background(220);

    i = (i + 0.2) % 3
    x = (x + 2) % width

    image(snapImg[int(i)], x, 100);
}


```

### Übungen


#### Fliegen

Auf einem Kachelbild laufen viele Fliegen. Die Pfeiltasten drehen die Geschwindigkeitsvektoren.


<iframe src="fliege.html" width="520" height="520"></iframe>







