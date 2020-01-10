## Text und Zeichen

Mit der Funktion `text` können wir Text auf der Leinwand ausgeben. 


```
function setup() {
  createCanvas(300, 200);
  background(220);

  text("Hallo",40,40);  

  rect(40, 80, 180, 80);
  let s = "The quick brown fox jumps over the lazy dog";
  textSize(20);
  text(s, 40, 80, 180, 80);
}
```

<iframe src="textbox.html" width="320" height="220"></iframe>

----

Mit `textSize`, `textFont` und `textAlign` können wir die Ausgabe gestalten. Die Textfarbe wird mit `fill` gesetzt.

```
function setup() {
  let s = "The quick brown fox jumps over the lazy dog";

  createCanvas(500, 200);
  background(220);

  fill(255,0,0);
  textSize(20);
  textFont('Georgia');
  textAlign(CENTER);
  text(s, 100, 20, 200);
  
  fill(0,0,255);
  textSize(30);
  textFont('Helvetica');
  textAlign(RIGHT);
  text(s, 10, 100, 400);
}
```

<iframe src="textfont.html" width="520" height="220"></iframe>

---

#### Timer und Score

Wir lassen eine Timer runterzählen und zählen die Mausclicks als score hoch. Wenn der Timer auf 0 ist
erfolgt nach `noLoop()` kein weiterer Durchlauf der draw-Funktion.

```
   let count = 20;
    let score = 0;
    let fertig = false;

    function setup() {
      createCanvas(300, 200);
    }

    function draw() {
      background(220);
      if (frameCount % 30 === 0) {
        count -= 1;
      }

      if (count === 0) {
        fertig = true;
        noLoop();
      }

      fill(255, 0, 0);
      textSize(20);
      textAlign(RIGHT);
      text(count, 40, 40);

      fill(0, 0, 255);
      text("Score: " + score, 280, 40)
    }

    function mousePressed() {
      if (!fertig) score += 1;
    }
```

<iframe src="timer.html" width="320" height="220"></iframe>
 

----

#### Text eingeben

Die Funktion `keyTyped` wird einmal durchlaufen, wenn eine Taste gedrückt wird, aber die Action-Keys wie BACKSPACE, ENTER etc. werden ignoriert. `keyPressed` wird bei jeder Taste durchlaufen.

Hier wird ein Name eingeben. Mit BACKSPACE kann das letzte Zeichen gelöscht werden, mit ENTER wird die Eingabe abgeschlossen.

```
let name = "";
let eingabeMoeglich = true;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(220);
  textSize(20);
  if (eingabeMoeglich) {
    text("Dein Name: " + name, 20, 100);
  }
  else {
    text("Hallo " + name, 20, 100);
  }
}

function keyTyped() {
  if (eingabeMoeglich) {
    name += key;
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    name = name.substr(0, name.length - 1);
  }
  else if (keyCode === ENTER) {
    eingabeMoeglich = false;
  }
}
```
<iframe src="namen.html" width="320" height="220"></iframe>

---

### Übungen


#### Fliesender Text

Lasse einen Text deiner Wahl in eine Richtung deiner Wahl fliesen.

<iframe src="starwars.html" width="320" height="420"></iframe>

---


#### SimplePong

Füge einen Zähler zu dem Simple-Pong Spiel aus dem Abschnitt *Tastensteuerung* hinzu.


<iframe src="simplePong.html" width="320" height="320"></iframe>

---

#### Fallende Zeichen

Mit dem Keyboard können 50 Zeichen eingegeben werden, die an zufällige Stellen positioniert werden.
Anschließend sinken sie nach unten.

<iframe src="fallendeZeichen.html" width="620" height="420"></iframe>



