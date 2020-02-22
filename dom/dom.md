## DOM


Im P5-Webeditor ist ein Sketch mit dem *script*-tag als *sketch.js* in *index.html* eingebunden. Innerhalb des *body* können wir weitere html-tags einfügen.

[W3C Schools HTML Tutorial](https://www.w3schools.com/html/) - 
[W3C Schools CSS Tutorial](https://www.w3schools.com/css/default.asp)

----

#### h1 und p in index.html

In *index.html*:
``` 
<body>
    <h1>Ball</h1>
    <p> Bei Mausklick entsteht ein Ball. Ein Tastendruck löscht alle Bälle. </p>
    <script src="sketch.js"></script>
</body>

``` 

```
function setup() {
  createCanvas(400, 300);
  background(240);
  noStroke()
}

function mousePressed() {
  fill(90);
  circle(mouseX, mouseY, 40);
}

function keyPressed() {
  background(240);
}
```

<iframe src="htmlDemo.html" width="480" height="420"></iframe>

----

#### h1 und p im sketch erstellen

Wir können einen *h1-tag* mit *createElement* und einen *p-tag* mit *createP* im Sketch erstellen.

```
function setup() {
  createElement('h1', 'Ball');
  createP('Bei Mausklick entsteht ein Ball. Ein Tastendruck löscht alle Bälle.')
  createCanvas(400, 400);
  background(240);
  noStroke()
}

function mousePressed() {
  fill(90);
  circle(mouseX, mouseY, 40);
}

function keyPressed() {
  background(240);
}

```

---- 

#### Button

*createButton()* liefert ein Objekt zurück, dem man die Methode *mousePressed* zurufen kann. Als Argument
erhält die Methode eine Funktion, die ausgeführt wird, wenn die Maus auf den Button klickt. Mit der Methode
*html()* lässt sich der Textinhalt des Buttons ändern.


```
  let weiter = false;
  let button;
  let x = 30;

  function setup() {
      createCanvas(400, 200);
      noStroke()
      createP();
      button = createButton("Start")
      button.mousePressed(klick);
  }

  function draw() {
      background(240);
      if (weiter) x = x + 1;
      fill(90);
      circle(x, 100, 40);
  }

  function klick() {
      weiter = !weiter
      if (weiter) {
          button.html("Stop");
      }
      else {
          button.html("Start")
      }
  }
``` 

<iframe src="button.html" width="420" height="260"></iframe>

----

#### Slider

Ein *slider* hat einen Anfangs-, End- und Startwert. Die Methode *value()* ermittelt den aktuellen Wert des Sliders

```
let slider;

function setup() {
    createCanvas(200, 200);
    noStroke()
    createP();
    slider = createSlider(20, 80, 30);
}

function draw() {
    background(240);
    fill(90);
    circle(100, 100, slider.value());
}
``` 

<iframe src="slider.html" width="220" height="270"></iframe>

----

#### Textinput

Mit *createInput* wird ein Texteingabefeld erzeugt. In der Methode *changed* gibt man die Funktion an, die ausgeführt werden
soll, wenn die Eingabe mit Datenfreigabe oder Tab bestätigt wird.

*createSpan* erzeugt einen Bereich, der nicht durch einen Zeilenumbruch abgeschlossen wird.

``` 
let nameInput;
let name = "";

function setup() {
    createCanvas(200, 200);
    noStroke()
    createP();
    createSpan("Name:   ")
    nameInput = createInput();
    nameInput.size(100);
    nameInput.changed(setName);
}

function draw() {
    background(240);

    fill(90);
    if (name.length > 0) {
        textAlign(CENTER,CENTER);
        textSize(20);
        text("Hallo " + name, 100, 100)
    }
}

function setName() {
    name = nameInput.value();
}


``` 

<iframe src="textinput.html" width="220" height="270"></iframe> 

-----

#### CSS

Mit *html* beschreiben wir die Struktur einer Webseite, mit *css* den Stil (Farbe, Abstände etc. ) der einzelnen Elemente.
Ein Sketch im Webeditor sieht die Datei *style.css* für die Eingabe von css-Anweisungen vor. Wir können aber auch direkt im 
Sketch mit der Methode *style* den Elementen einen Stil geben. Mit *select* können wir Elemente des Dokuments auswählen.

Im Beispiel wird der *present*-Modus des Webeditors verschönert.

```
let x = 30

function setup() {
  
  let h1 = createElement("h1","Moving ball");
  h1.style("color","#eeeeee");
  h1.style("text-align","center");
  h1.style("padding-top","100px");
  
  createCanvas(400, 200);

  select("body").style("background-color", "#1a1a1a");
  select("canvas").style("padding-top", "50px");
  select("canvas").style("margin", "auto");
  
}

function draw() {
  background(240);

  if (x > width) x = 0;
  x = x + 2;
  
  noStroke()
  fill(90);
  circle(x, 100, 40);
}

```

[Moving Ball](https://editor.p5js.org/ktheu/present/aP0YPeso)

----- 



#### Der Present-Modus

Unter *File, Share, Present* können wir den Sketch im *present-Modus* anschauen.  Wenn wir die Hintergrundfarbe der Seite
und die Position der Leinwand nicht wie oben im Sketch, sondern in *style.css* ändern wollen, machen wir folgende
Anpassungen:
 

Durch Klick auf `>` neben `sketch.js` sehen wir alle Files des Sketches.

<img src="./bild1.png" width="300px">

Wir ändern `style.css`.

`background-color:` - die Hintergrundfarbe der html-Seite (nicht der Leinwand). <br>
`padding-top:` - Abstand der Leinwand nach oben zum vorherigen Element.   <br>
`margin: auto` - Die Leinwand kommt in die horizontale Mitte 

style.css:
```
html, body {
  margin: 0;
  padding: 0;
  background-color: #1a1a1a;
}
canvas {
  display: block;
  padding-top: 100px; 
  margin: auto;
}
