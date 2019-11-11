#### Variablen

Mit einer *Variablen* speichern wir einen Wert an einer Speicherstelle unseres Computers ab. Wir können den
Wert später wiederverwenden oder ändern.

```
let x;        // Deklaration einer Variablen
x = 10;       // Zuweisung eines Wertes

let y = 12;   // Deklaration und Zuweisung
y = 13;       // erneute Zuweisung
```


Variablennamen 
- können Buchstaben, Ziffern, den Unterstrich _ und das Dollarzeichen $ enthalten.  
- dürfen nicht mit einer Ziffer beginnen. 
- sind case-sensitiv (große und kleine Buchstaben sind verschieden). 
- dürfen keine reservierten Worte sein. 

---------------------------------------

Mit sprechenden Variablenname können wir unseren Code lesbarer und leichter veränderbar machen.

```
let x = 0;
let y = 100;
let durchmesser = 50

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(220);
  circle(x,y,durchmesser);
  x = x + 1;
}
```
<p>
<iframe src="bewegterKreis.html" width="320" height="220"></iframe>
</p>

-----------------------------

Systemvariablen werden vom System gesetzt, wir können ihren Inhalt nutzen.
```
mouseX, mouseY - Koordinaten der Maus
width, height  - Breite und Höhe wie in createCanvas gesetzt.
```
 
```
let x = 0
function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(220);
  line(x,0,x,height)
  x = x + 1;
}
```

<p>
<iframe src="laufendeLinie.html" width="320" height="220"></iframe>
</p>


-------------------------------

Mit Variablen können wir rechnen wie mit einem Taschenrechner. Mit `print` können wir den Wert auf der Konsole ausgeben.
Der Modulo-Operator `%` liefert den Rest der ganzzahligen Division. Mit `noCanvas` wird keine Leinwand erzeugt.

```
 function setup() {
   noCanvas();
   let x = 5;
   let y = 10;
   print((2 * x + 0.5 * y) / 4);
   print(0 % 3, 1 % 3, 2 % 3, 3 % 3, 4 % 3, 5 % 3)
 }

Ausgabe:
3.75
0 1 2 0 1 2
```
-------------------------------

Der modulo-Operator eignet sich für periodische Vorgänge.

```
let x = 0;
let y = 100;
let durchmesser = 50;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(0);
  circle(x,y,durchmesser);
  x = (x + 2) % width
}
```
<p>
<iframe src="moduloKreis.html" width="320" height="220"></iframe>
</p>

-------------------------------

Eine sich ändernde Variable können wir auch für Farben und Form nutzen.

```
let x = 0;
let y = 100;
let durchmesser = 50;

function setup() {
  createCanvas(300, 200);
  colorMode(HSB,width,100,100);
}

function draw() {
  fill(x,100,100);
  circle(x,y,x % durchmesser);
  x = (x + 2) % width
}

function mousePressed() {
  x = 0;
  background(255);
}
```

<p>
<iframe src="moduloDurchmesser.html" width="320" height="220"></iframe>
</p>

### Übungen

Eine Linie bewegt sich von rechts nach links, restart mit Mausklick.
<iframe src="linieVonRechts.html" width="320" height="220"></iframe>

---

Zwei Quadrate bewegen sich, restart mit Mausklick.
<iframe src="zweiQuadrate.html" width="320" height="320"></iframe>

---

Zwei Kreise bewegen sich auf den Diagonalen und verändern dabei langsam ihre Farbe, restart mit Mausklick.  

<iframe src="diagonaleKreise.html" width="320" height="320"></iframe>

---

Zwei Kreise bewegen sich auf den Diagonalen und verändern dabei langsam ihre Farbe und Durchmesser. Der Durchmesser wird periodisch auf Null gesetzt, restart mit Mausklick.  

<iframe src="diagonaleKreiseModulo.html" width="420" height="420"></iframe>

---
Drei dicke farbige Linien wachsen mit unterschiedlicher Geschwindigkeit nach unten, restart mit Mausklick.
<iframe src="dreiLinien.html" width="320" height="320"></iframe>

---
Farblinie - eine Linie läuft von links nach rechts und wechselt dabei die Farbe, restart mit Mausklick.

<iframe src="farbLinie.html" width="320" height="320"></iframe>
