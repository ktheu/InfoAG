### Einführung


##### Web-Editor

Wir nutzen den __[P5JS-Webeditor](https://editor.p5js.org/)__. Lege dir einen Account an.
Mit *File/New* erhalten wir die Vorlage für einen neuen Sketch, dem ein zufälliger Name gegeben wird.
Durch Klick auf den kleinen Stift beim Namen können wir den Sketch umbenennen. Wenn wir eingeloggt sind, könnnen wir
den Sketch speichern und dann unter *My Account/My Sketches* wiederfinden.


##### Aufbau eines Sketches

Wir nutzen den Canvas als Zeichenfläche. Der Ursprung (0/0) der Pixelkoordinaten ist die linke obere Ecke des Canvas.
Die positive x-Richtung geht nach rechts, die positive y-Richtung geht nach unten.

```
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  rect(50,100,300,150);
}

```
Anweisungen in *setup* werden zu Beginn einmal durchlaufen. Die Anweisungen in *draw* werden immmer wieder durchlaufen. Alle Anweisungen enden mit einem Semikolon.


##### Reference  

P5JS stellt eine Menge von Funktionen zur Verfügung, die in der __[P5JS-Reference](https://p5js.org/reference)__ beschrieben werden. Im Webeditor können wir unter *help/reference* einen weitere Tab mit
der P5JS-Reference öffnen.

### Einfache Figuren

Die Reference ist in Gruppen gegliedert, die zu Beginn der Seite aufgelistet sind. Klicke auf *Shape*.
Dort gibt es Untergruppen. Wir beschäftigen uns zunächst mit den *2D-Primitives*.

##### Beispiel: Rechtecke _[rect](https://p5js.org/reference/#/p5/rect)_

In der Reference sind neben den Beispielen kleine Fenster mit einem 100x100 Canvas. Mit *edit* und *run* können wir die Beispiele verändern. Mit *copy* können wir sie für unseren Webeditor kopieren.  

 
### Übungen

Nutze weitere Funktionen:

```
background(0-255);    // Hintergrundfarbe, 0 (schwarz) bis 255 (weiss)
stroke(0-255);        // Linienfarbe
noStroke();           // keine Umrandung
fill(0-255);          // Füllfarbe
noFill(0-255);        // keine Füllung
strokeWeight(10);     // Linienstärke 
rectMode(CENTER);     // Position des Rechtecks kennzeichnet seinen Mittelpunkt
```

Bei der Programmentwicklung im Webeditor lohnt es sich, regelmäßig mit *edit/tidy code* den Programmcode übersichtlich zu machen. Ist *Auto-refesh* angeschaltet, sehen wir Änderungen sofort, unvollständige Programmzeilen erzeugen allerdings Fehler.

Während eines draw-Durchgangs bleibt eine Einstellung wie z.B. *stroke(100)* für alle weiteren Anweisungen bestehen, bis
eine neue *stroke*-Anweisung folgt.

Für alle Übungen gilt: Versuche den Abbildungen möglichst nahe zu kommen oder bilde Varianten.

Lösungen: Mit *Strg+Umschalt+i, Strg+p* öffnet sich die Konsole. Durch Klick auf die entsprechende html-Datei sehen wir den Source-Code der Übungen.

---

Linien
<iframe src="linien.html" width="420" height="420"></iframe>

----

Dreieck und Viereck
<iframe src="dreieck.html" width="420" height="420"></iframe>

----
 
Ellipsen
<iframe src="ellipsen.html" width="420" height="420"></iframe>

----

Figuren und Linien
<iframe src="figurenUndLinien.html" width="320" height="320"></iframe>

----

Kreise
<iframe src="kreise.html" width="320" height="220"></iframe>

----

Robot
<iframe src="robot.html" width="420" height="420"></iframe>

----

Spielfigur
<iframe src="spielfigur.html" width="170" height="170"></iframe>

----





