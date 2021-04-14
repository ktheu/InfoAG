## Local Storage und HighScore

Mit Javascript können wir nicht direkt auf unser Filesystem zugreifen. 

Mit `getItem` und `storeItem` können wir auf den *local storage* des Browsers zugreifen.  

Die Daten des *local storage* bleiben auch erhalten, wenn man den Browser schließt. 

 
In Chrome können wir den *local storage* mit `Strg+Umsch+i, Application, LocalStorage` anschauen.


```
// speichern
let vorname = 'Malte';
storeItem('name',vorname);      

```
```
// laden
let s  = getItem('name');
        
```

```
removeItem('name')   // Eintrag löschen
clearStorage();      // alle Einträge löschen

```
####  Einen String in Local Storage speichern und laden
Mit Mausclick wird der Name aus dem Local Storage geladen.

```
let name = "";

function setup() {
  createCanvas(300, 200);
  storeItem('name', "Malte")
}

function draw() {
  background(230);
  textSize(20);
  text("Name: " + name, 20, 100);
}

function mousePressed() {
  name = getItem('name');
}
```
<iframe src="saveString.html" width="320" height="220"></iframe>

---- 
####  Ein Array in Local Storage speichern und laden
Wir müssen das Array vor dem speichern in einen String umwandeln. Nach dem Laden wird aus dem String das Array 
rekonstruiert.

Mit Mausclick werden die Daten aus dem Local Storage geladen.

```
let array = "";

function setup() {
  createCanvas(300, 200);
  let a = [12,13,14,15];
  storeItem('daten', JSON.stringify(a))   // Array --> String
}

function draw() {
  background(230);
  textSize(20);
  text("Daten: " + array, 20, 100);
}

function mousePressed() {
  array = JSON.parse(getItem('daten'));   // String --> Array
}
```

----

####  Eine Highscore-Tabelle im Local Storage speichern und laden

Die Highscore-Tabelle wird zunächst mit dummy-Einträgen belegt (N.N. = nomen nescio). Die Tabelle ist eine
Liste von Listen.


<iframe src="saveArray.html" width="320" height="220"></iframe>


---

Wenn wir einen Namen eingeben und die Eingabe mit Enter bestätigen, wird dieser Namen beim nächsten Start des Sketches wieder angezeigt.

```





    let name = '';

    function setup() {
      createCanvas(300, 200);
      s = getItem('name');
      if (s) name = s; 
    }

    function draw() {
      background(230);
      textSize(30);
      text(name, 40, 100);
    }

    function keyTyped() {
        name += key;
    }

    function keyPressed() {
      if (keyCode === BACKSPACE) {
        name = name.substr(0, name.length - 1);
      }
      else if (keyCode === ENTER) {
        storeItem('name',name);
      }
    }
```

<iframe src="localStorage.html" width="320" height="220"></iframe>

----

Den Highscore verwalten wir in einem Array. Jedes Array-Element ist wieder ein Array mit zwei Elementen: dem Namen und dem score.

```
let highscore = [['Malte', 20], ['Thorben', 14], ['Lena', 18]];

function setup() {
    createCanvas(300, 200);
    background(220);
    s = "Highscore:\n\n";
    for (let i=0; i<highscore.length; i++) {
      s = s + highscore[i][0] + '  ' +  highscore[i][1] + '\n';
    }
    textSize(16);
    text(s, 50, 50);
}
```

<iframe src="highscore01.html" width="320" height="220"></iframe>

---
In der Regel wollen wir den Highscore sortiert ausgeben


```
let highscore = [['Malte', 20], ['Thorben', 14], ['Lena', 18]];

function hssort(a, b) {
    if (a[1] > b[1]) return -1;  // das größere kommt vorne hin (nach links = -1)
    if (a[1] < b[1]) return 1;
    return 0;
}

function setup() {
    createCanvas(300, 200);
    background(220);
    highscore.sort(hssort);
    s = "Highscore:\n\n";
    for (let i = 0; i < highscore.length; i++) {
      s = s + highscore[i][0] + '  ' + highscore[i][1] + '\n';
    }
    textSize(16);
    text(s, 50, 50);
}
```

<iframe src="highscore02.html" width="320" height="220"></iframe>
---

Im Spielmodus erzeugt jeder Mausklick eine Zahl. Die drei höchsten Zahlen werden angezeigt. Ist eine Zahl
für den Highscore erreicht, kann man den Namen eingeben und mit Enter wird der Highscore upgedated.

Wir speichern den Highscore im local storage des Browsers. 

```
let highscore = [['N.N.', 0]];
let zahl = 0;
let state = "PLAY";
let name = "";

function hssort(a, b) {
  if (a[1] > b[1]) return -1;
  if (a[1] < b[1]) return 1;
  return 0;
}

function setup() {
  createCanvas(300, 200);
  a = getItem('highscore');
  if (a) highscore = a;
}

function draw() {
  background(220);
  s = "Highscore:\n\n";
  for (let i = 0; i < highscore.length; i++) {
    s = s + highscore[i][0] + '  ' + highscore[i][1] + '\n';
  }
  textSize(16);
  text(s, 50, 30);

  text("Deine Zahl: " + zahl, 50, 140);

  if ((highscore.length < 3 && zahl > 0) || zahl > highscore[highscore.length - 1][1]) {
    state = "EINGABE";
    text("Dein Name: " + name, 50, 165);
  }
}

function keyTyped() {
  if (state === "EINGABE") {
    name += key;
  }
}

function keyPressed() {
  if (state === "EINGABE") {
    if (keyCode === BACKSPACE) name = name.substr(0, name.length - 1);
    if (keyCode === ENTER) {
      if (highscore.length >= 3) {
        highscore.pop();
      }
      highscore.push([name, zahl]);
      highscore.sort(hssort);
      storeItem('highscore', highscore);
      zahl = 0;
      name = "";
      state = "PLAY";
    }
  }
}

function mousePressed() {
  if (state === "PLAY") {
    zahl = int(random(50));
  }
}
```

<iframe src="highscore03.html" width="320" height="220"></iframe>