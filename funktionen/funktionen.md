## Funktionen

Mit Funktionen fassen wir Code-Blöcke zu Einheiten zusammen. Funktionen können Parameter erhalten und 
Werte zurückgeben. Ziel ist es, die Einheiten so zu wählen, dass man sie gut testen kann, dass sie wiederverwendbar sind und durch sprechende Namen den Code lesbarer machen.


#### Haus und Sonne 

```
function setup() {
    createCanvas(300, 300);
    noStroke();
}

function draw() {
    background('#31F0FF');
    zeichneHaus();
    zeichneSonne();
}

function zeichneHaus() {
    fill('#FF3134');
    rect(80, 200, 80, 80);
    triangle(80, 200, 160, 200, 120, 150);
}

function zeichneSonne() {
    fill('#FFF931');
    ellipse(200, 100, 80, 80);
}
```

<iframe src="hausUndSonne.html" width="320" height="320"></iframe>

----

#### Gesicht

Die Funktion zeichneGesicht nimmt Parameter für Position, Augen- und Gesichtsfarbe entgegen.

```
function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(255);
    zeichneGesicht(100, 200, '#B03A3A', '#C06AAA');
    zeichneGesicht(300, 100, '#907A37', '#907AFA');
}

function zeichneGesicht(x, y, augenfarbe, gesichtsfarbe) {
    fill(gesichtsfarbe);
    ellipse(x, y, 80, 80); // Gesicht
    fill(augenfarbe);
    ellipse(x - 15, y - 15, 20, 20); // Auge
    ellipse(x + 15, y - 15, 20, 20); // Auge
}
```

<iframe src="gesicht.html" width="420" height="420"></iframe>


---

Funktionen können mit `return` Werte zurückgeben.

```
function setup() {
    createCanvas(400, 400);
}

function draw() {
    background('#B03A3A');
    let y = mausEntfernungZumMittelpunkt();
    displayEntfernung(y);
}

function mausEntfernungZumMittelpunkt() {
    let d = dist(mouseX, mouseY, width / 2, height / 2);
    return d;
}

function displayEntfernung(x) {
    fill(255);
    textSize(30);
    text(int(x), 40, 40);
}
```

<iframe src="entfernungZumMittelpunkt.html" width="420" height="420"></iframe>

---

### Übungen

#### Augen

Implementiere eine Funktion *auge* und zeichne mehrere Augen.

<iframe src="auge.html" width="420" height="420"></iframe>

---

#### Häuser

Implementiere eine Funktion *haus*, die ein Haus mit ein paar Fenstern zeichnet. Bei jedem Mausklick werden die Häuser neu erzeugt.

<iframe src="haus.html" width="620" height="420"></iframe>

 