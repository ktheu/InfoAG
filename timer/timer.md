## Timer

#### setTimeout

*setTimeout* ist eine Browser-Funktion, die zwei Argumente erhält. Eine Funktion, die ausgeführt werden soll und
eine Zeit in Millisekunden, die gewartet wird, bevor die Funktion aufgerufen wird.

```
let farbe = 80;

function setup() {
    createCanvas(200, 200);
    setTimeout(setRot,1000)
}

function draw() {
    background(240);
    fill(farbe);
    noStroke();
    circle(100,100,50);
}

function setRot() {
    farbe = color(255,0,0);
}

```

<iframe src="timeoutDemo.html" width="220" height="220"></iframe>

-----

Die Funktion kann auch *anonym* sein. Dazu wird sie ohne Namen an der ersten Argumentstelle von *setTimeout* definiert.

```
let farbe = 80;

function setup() {
    createCanvas(200, 200);
    setTimeout(() => { farbe = color(255, 0, 0); }, 1000);
    setTimeout(() => { farbe = color(0, 255, 0); }, 2000);
    setTimeout(() => { farbe = color(0, 0, 255); }, 3000);
}

function draw() {
    background(240);
    fill(farbe);
    noStroke();
    circle(100, 100, 50);
}

```

<iframe src="timeoutDemo02.html" width="220" height="220"></iframe>


#### setIntervall

-----
Wenn wir eine Funktion in einem gegebenen zeitlichen Abstand immer wieder ausführen möchten, nutzen wir
*setInterval*

```
let counter = 0;

function setup() {
    createCanvas(200, 200);
    setInterval(count,1000)
}

function draw() {
    background(240);
    textSize(60);
    textAlign(CENTER,CENTER);
    text(counter,100,100);
}

function count() {
    counter += 1;
}

```

<iframe src="setintervalDemo.html" width="220" height="220"></iframe>


#### Nacheinander Buchstaben anzeigen

Die Funktion *setinterval* liefert ein Objekt zurück, das wir der Funktion *clearInterval* übergeben könnnen, der Timer wird dann gestoppt.

Bei Mausklick wird schrittweise ein Text angezeigt.

```
let msg = "--- last call - Mr.Anderson ---";
let dauer = 1000;
let iv;
let i;

function setup() {
    createCanvas(600, 200);
    background(80);
}

function zeigeZeichen() {
    background(80);
    textSize(80);
    fill(240);
    textAlign(RIGHT, CENTER);
    if (i < msg.length) {
        text(msg.substr(0, i + 1), 500, 100);
        i += 1
    }
    else {
        clearInterval(iv);
    }
}

function mousePressed() {
    i = 0;
    iv = setInterval(zeigeZeichen, 500);
}

```

<iframe src="anderson.html" width="620" height="220"></iframe>

----

#### Timer stoppen und starten

Mit Mausklick beginnt der Timer, jeder weitere Mausklick schaltet den Timer aus bzw wieder an.

```
var counter = 0;
var timerOn = false;

function setup() {
    createCanvas(200, 200);
}

function draw() {
    background(240);
    textSize(60);
    textAlign(CENTER, CENTER);
    text(counter, 100, 100);
}

function mousePressed() {
    if (!timerOn) {
        timerOn = true;
        iv = setInterval(() => counter++, 500);
    }
    else {
        timerOn = false;
        clearInterval(iv);
    }
}
```

<iframe src="startStop.html" width="220" height="220"></iframe>

----

#### Dauer eines Zustands 

Bei Mausklick wird die Linie rot, nach 3 Sekunden verschwindet das rot wieder.

```
let rot = false;

function setup() {
    createCanvas(200, 200);
}

function draw() {
    background(240);
    if (rot) {
        strokeWeight(10);
        stroke(255,0,0);
    }
    else {
        strokeWeight(5);
        stroke(80);
    }
    line(50,100,150,100);
}

function mousePressed() {
    rot = true;
    setTimeout(() => {rot = false;}, 3000)
}

```

<iframe src="linie.html" width="220" height="220"></iframe>
