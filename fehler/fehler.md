### Fehler

Es gibt drei Arten von Fehlern
- Syntaxfehler, die werden uns angezeigt, ohne das wir das Programm laufen lassen.
- Laufzeitfehler, die werden erst beim  Programmablauf angezeigt.
- logische Fehler, die müssen wir selbst bemerken, z.B: der Kreis ist blau, sollte aber rot sein.

---

#### Syntaxfehler

Syntaxfehler: Ein Komma fehlt

<img src="fehler04.png" width="700"/>

--- 

Syntaxfehler:  eine geschweifte Klammer fehlt

<img src="fehler05.png" width="600"/>

---

#### Laufzeitfehler

Laufzeitfehler: Eine P5JS-Anweisung wurde falsch geschrieben

<img src="fehler02.png" width="700"/>

--- 


Laufzeitfehler: Eine P5JS-Anweisung wurde außerhalb der Funktionen draw und setup geschrieben.

<img src="fehler01.png" width="750"/>

---

### Hilfe bei Fehler

Wenn du Hilfe bei der Fehlersuche benötigst, benötige ich (oder jemand anders, der dir helfen möchte) den
Programmcode und eine möglichst genaue Beschreibung dessen, was du beim Ablauf erwartest und was stattdessen
passiert.

Beispiel:

```
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // 1. Kreis
  stroke(0)
  circle(200,200,50);
  
  // 2.Kreis
  strokeWeight(0);
  circle(300,300,50);
}
```

>Fehlerbeschreibung: <br>
>Bei dem Programm soll der 1.Kreis mit schwarzer Umrandung und der 2. Kreis ohne Umrandung gezeichnet werden.
>Stattdessen werden beide Kreise ohne Umrandung gezeichnet. Woran liegt das?

Bei kleineren Programmen kannst du den Code  in den Teams-Kanal *Hilfe bei Fehlern* kopieren (mit der Formatierung Codeausschnitt `</>`).

Bei größeren Programmen (z.B. wenn das Programm noch weitere Dateien benötigt) kopiere den Link, der
im Webeditor unter `File-Share-Edit` steht, in den Teams-Kanal. Dann solltest du diesen Sketch in deinem Webeditor 
nicht mehr verändern. Du kannst mit `File-Duplicate` eine Kopie erstellen, um daran weiter zu arbeiten.


