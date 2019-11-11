#### Variablen

Mit einer *Variablen* legen wir einen Wert in den Speicher unseres Computers ab, um später
wieder darauf zurückgreifen zu können. Wir können uns den Speicher als ein riesige Menge
von Schubladen vorstellen, in denen wir Daten aufbewahren können.

Mit `let z = 10;` weisen wir der Variablen z den Wert 10 zu. Wir nennen eine Schublade `z` und in die Schublade kommt die `10.`
Mit der Variablen `z` können wir immer wieder auf den Inhalt dieser Schublade zugreifen, ihn
wieder verwenden oder verändern. 

Variablennamen 
- können Buchstaben, Ziffern, den Unterstrich _ und das Dollarzeichen $ enthalten.  
- dürfen nicht mit einer Ziffer beginnen. 
- sind case-sensitiv (große und kleine Buchstaben sind verschieden). 
- dürfen keine reservierten Worte sein. 
 
Mit sprechenden Variablenname können wir unseren Code lesbarer und leichter veränderbar machen.

Statt
```
circle(100,50,30);
circle(150,50,,30);
```
können wir schreiben
```
let y = 50;
let durchmesser = 30;
circle(100,y,durchmesser);
circle(150,y,durchmesser);
```

Wir beginnen mit einem einfachen Sketch:

```
let x = 100;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
``` 

Variablennamen 
- können Buchstaben, Ziffern, den Unterstrich _ und das Dollarzeichen $ enthalten.  
- dürfen nicht mit einer Ziffer beginnen. 
- sind case-sensitiv (große und kleine Buchstaben sind verschieden). 
- dürfen keine reservierten Worte sein. 

Typisch sind sprechende Variablennamen, die in ihrem Namen ausdrücken, wozu sie
gebraucht werden.

Mit dem Gleichheitszeichen weisen wir der Variablen einen Wert zu (wir stopfen in die Schublade
mit Namen x den Wert 10). Das nennt sich Zuweisung. Wir können die Deklaration einer Variablen und
die Zuweisung eines Wertes auch in getrennt durchführen.

Jede Variable hat einen Typ, aber darum kümmern wir uns später. Im Moment arbeiten wir nur mit Zahlen.

Wir zeichnen einen Kreis und nutzen die Variable noch nicht
```
let x = 100;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  circle(100,200,80);
}
```

Jeden Parameter von `circle` können wir durch eine Variable ersetzen.

```
let x = 100;
let y = 200;
let durchmesser = 80

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  circle(x,y,durchmesser);
}
```

Jetzt nutzen wir aus, das wir den Wert einer Variablen während des Programmablaufs ändern können

```
let x = 100;
let y = 200;
let durchmesser = 80

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  circle(x,y,durchmesser);
  x = x + 1;
}
```
