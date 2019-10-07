### Variablen

Variablen sind Behälter (Schubladen, container) um Daten zu speichern. Jede
Variable sollte vor oder bei ihrem ersten Gebrauch deklariert werden. 


##### var, let, const

Die alte Art:
```
var x;              // Deklaration
x = 12;             // Zuweisung
x = 20.5;           // erneute Zuweisung
var y = 17;         // Deklaration und Zuweisung
```

Ab Javascript ES6 empfohlen: 
```
let x;                 // Deklaration
x = 12;                // Zuweisung
x = 20.5;              // erneute Zuweisung
let y = 17;            // Deklaration und Zuweisung

const pi = 3.1415;     // Deklaration und Zuweisung eines konstanten Werts,
                       // erneute Zuweisung nicht möglich
```

Variablennamen
- können Buchstaben, Ziffern, den Unterstrich _ und das Dollarzeichen $ enthalten.  
- dürfen nicht mit einer Ziffer beginnen. 
- sind case-sensitiv (große und kleine Buchstaben sind verschieden). 
- dürfen keine reservierten Worte sein. 

##### console.log und print

In Chrome können wir nach *Ctrl+Umsch+i/Console* auf der Konsole Javascript-Anweisungen eingeben, die sofort ausgeführt werden. Mit *console.log(x)* geben wir den Wert der Variablen x auf der Konsole aus.

Im P5-Webeditor können wir mit *print* die Werte im unteren Konsolbereich ausgeben. Wenn wir kein Grafikfenster
benötigen, nutzen wir *noCanvas()* und schreiben alle Anweisungen in die setup-Funktion.

```
function setup() {
  noCanvas();
  let z = 12;
  print(z);
}

```

##### Typen
Jede Variable hat einen Typ, der von der letzten Zuweisung abhängt. Mit *typeof* können wir den Typ
einer Variablen abfragen. Ganze Zahlen und Dezimalzahlen sind vom Typ *number*.

```
function setup() {
  noCanvas();
  let k = 12;
  let x = 3.14;
  print(typeof k, typeof x);
}

Ausgabe:
number number  
```
 
##### Arithmetische Ausdrücke
Mit Zahlen können wir rechnen wie auf einem Taschenrechner und mit den üblichen arithmetischen Operatoren und Klammern arithmetische Ausdrücke bilden. 

```
function setup() {
  noCanvas();
  let x = 2;
  let y = 4;
  let z = x * x + (20 - y)/2;
  print(z);
}

Ausgabe: 12
``` 

##### Der Modulo-Operator
Der Modulo-Operator *%* liefert den Rest der ganzzahligen Division.

``` 
function setup() {
  noCanvas();
  print(0 % 3, 1 % 3, 2 % 3, 3 % 3, 4 % 3, 5 % 3)
}
``` 
Ausgabe: 0 1 2 0 1 2


##### Bewegter Kreis

```
let x = 30;

function setup() {
  createCanvas(300, 200);
  rectMode(CENTER);
}

function draw() {
  background(240);
  circle(x, 100, 20);
  x = x + 1;
}
```
<iframe src="bewegterKreis.html" width="320" height="220"></iframe>

##### Bewegter Kreis mit modulo

```
let x = 30;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(240);
  circle(x, 100, 20);
  x = (x + 1) % 300;
}
```
<iframe src="bewegterKreisMitModulo.html" width="320" height="220"></iframe>


##### Kreisdurchmesser ändert sich

```
let durchmesser = 200;

function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(240);
  circle(150, 150, durchmesser);
  durchmesser = durchmesser - 1;
}
```
<iframe src="kreisDurchmesser.html" width="320" height="320"></iframe>

##### Kreisfarbe ändert sich

```
let farbe = 0;

function setup() {
  createCanvas(300, 300);
  colorMode(HSB,360,100,100);
}

function draw() {
  background(240);
  noStroke();
  fill(farbe,100,100);
  circle(150, 150, 200);
  farbe = (farbe + 1) % 360;
}
```
<iframe src="kreisFarbe.html" width="320" height="320"></iframe>

### Übungen

Bewegte Linie - eine Linie bewegt sich von rechts nach links
<iframe src="bewegteLinie.html" width="320" height="320"></iframe>

---

Zwei Quadrate
<iframe src="zweiQuadrate.html" width="320" height="320"></iframe>

---

Diagonale Kreise - zwei Kreise bewegen sich auf den Diagonalen, Mausklick startet die Bewegung neu.
<iframe src="diagonaleKreise.html" width="320" height="320"></iframe>

---
Vier Kreise bewegen sich auf den Diagonalen und werden immer größer.
<iframe src="vierKreise.html" width="420" height="420"></iframe>

---
Drei dicke farbige Linien wachsen mit unterschiedlicher Geschwindigkeit nach unten.
<iframe src="dreiLinien.html" width="320" height="320"></iframe>


---
Farblinie - eine Linie läuft von links nach rechts und wechselt dabei die Farbe.
Mausklick startet den Lauf neu.

<iframe src="farbLinie.html" width="320" height="320"></iframe>

 
