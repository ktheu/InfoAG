## Raster (Grid)

### Koordinaten

Es gibt verschiedene Möglichkeiten, ein 2-dimensionales Feld mit Indizes zu versehen.

- In der Mathematik befindet sich das Element $a_{23}$ 
 in der 2.Zeile und 3.Spalte einer Matrix. Die Zählung beginnt bei 1.

- In der Computergrafik befindet sich die Koordinate (2/3)  in der 2.Spalte und 3.Zeile. Die Zählung beginnt bei 0.

Wenn wir die Indizes unseres Rasters wie die Koordinaten der Computergrafik organisieren wollen, ergibt sich folgendes Muster:


```
let cols = 6;
let rows = 4;
function setup() {
    createCanvas(350, 250);
}

function draw() {
    background(220);
    let zaehl = 0;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            textAlign(CENTER,CENTER);
            text(str(i)+'/'+str(j)+' - '+str(zaehl),i*50+50,j*50+50);
            zaehl++;
        }
    }
}

```
<iframe src="zaehlung.html" width="370" height="270"></iframe>

----


Wir merken uns: **Äußere Schleife cols mit Index i , innere Schleife rows mit Index j. Dann ist (i/j) die Koordinate des Rasters nach Art der Computergrafik und wir durchlaufen das Raster spaltenweise.**

----

#### Schachbrett

Wir berechnen die Größe des Canvas aus den gegebenen Werten.

```
let rows = 15;
let cols = 30;
let groesse = 15;

function setup() {
    createCanvas(cols * groesse + 4, rows * groesse + 4);
    background(255);
}

function draw() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            fill(255);
            if ((i + j) % 2 == 0) {
              fill(0);
            }
            rect(i * groesse, j * groesse, groesse, groesse);
        }
    }
}


```

<iframe src="schachbrett.html" width="474" height="249"></iframe>

----

### Tiles

Wenn wir die Kacheln (Tiles) des Rasters als Objekte organisieren wollen, benötigen wir ein zweidimensionales Array.

```
    let rows = 10;
    let cols = 10;
    let groesse = 20;
    let grid = [];          // Dies wird zweidimensionales Array

    function setup() {
      createCanvas(cols * groesse + 4, rows * groesse + 4);
      for (let i = 0; i < cols; i++) {
        grid[i] = [];                     // Jede Spalte ein Array
        for (let j = 0; j < rows; j++) {
          grid[i][j] = new Tile(i, j, groesse);
        }
      }
    }


    function draw() {
      background(255);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].display();
        }
      }
    }

    class Tile {
      constructor(i, j, groesse) {
        this.i = i;
        this.j = j;
        this.groesse = groesse;
      }

      display() {
        strokeWeight(3);
        stroke('#FFB03B')
        fill('#FFF0A5')
        rect(2 + this.i * this.groesse, 2 + this.j * this.groesse, this.groesse, this.groesse);
      }
    }

```

<iframe src="kacheln01.html" width="224" height="224"></iframe>


#### Tictactoe

Wir erweitern die Klasse Tile um Attribute für Farben und Zeichen. Aus den Mauskoordinaten können wir die Koordinaten
der Kachel berechnen.

```
    let rows = 3;
    let cols = 3;
    let grid = [];
    let groesse = 100;
    let playerX = true;       // X ist an der Reihe
    let gewinn = '#FFB03B';   // Farbe für die Gewinnfelder

    function setup() {
      createCanvas(cols * groesse + 4, rows * groesse + 4);
      for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
          grid[i][j] = new Tile(i, j, groesse);
          grid[i][j].farbe = '#FFF0A5';
        }
      }
    }

    function draw() {

      check();

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].display();
        }
      }
    }

    // berechnet aus mouseX den i-Index der Kachel
    function I(x) {
      return Math.floor((x - 2) / groesse);
    }

    // berechnet aus mouseY den j-Index der Kachel
    function J(y) {
      return Math.floor((y - 2) / groesse);
    }

    function mousePressed() {
      let i = I(mouseX);
      let j = J(mouseY);
      if (!grid[i][j].zeichen) {    // wenn Feld frei
        grid[i][j].zeichen = playerX ? 'X' : 'O';
        playerX = !playerX;
      }
    }

    function check() {

      for (let k = 0; k < 3; k++) {
        let zeile = grid[0][k].zeichen + grid[1][k].zeichen + grid[2][k].zeichen;
        if (zeile === 'XXX' || zeile === 'OOO') {
          grid[0][k].farbe = gewinn;
          grid[1][k].farbe = gewinn;
          grid[2][k].farbe = gewinn;
          noLoop();
        }
        let spalte = grid[k][0].zeichen + grid[k][1].zeichen + grid[k][2].zeichen;
        if (spalte === 'XXX' || spalte === 'OOO') {
          grid[k][0].farbe = gewinn;
          grid[k][1].farbe = gewinn;
          grid[k][2].farbe = gewinn;
          noLoop();
        }
      }
      let diagonale1 = grid[0][0].zeichen + grid[1][1].zeichen + grid[2][2].zeichen;
      if (diagonale1 === 'XXX' || diagonale1 === 'OOO') {
        grid[0][0].farbe = gewinn;
        grid[1][1].farbe = gewinn;
        grid[2][2].farbe = gewinn;
        noLoop();
      }

      let diagonale2 = grid[0][2].zeichen + grid[1][1].zeichen + grid[2][0].zeichen;
      if (diagonale2 === 'XXX' || diagonale2 === 'OOO') {
        grid[0][2].farbe = gewinn;
        grid[1][1].farbe = gewinn;
        grid[2][0].farbe = gewinn;
        noLoop();
      }
    }

    class Tile {

      constructor(i, j, groesse) {
        this.i = i;
        this.j = j;
        this.groesse = groesse;
        this.farbe = null;        
        this.zeichen = null;
      }

      display() {
        strokeWeight(2);
        if (this.farbe !== null) {
          fill(this.farbe);
        } else {
          noFill();
        }

        stroke('#8E2800')    // Farbe für den Kachel-Rand
        rect(2 + this.i * this.groesse, 2 + this.j * this.groesse, this.groesse, this.groesse);

        if (this.zeichen !== null) {
          fill('#468966');   // Farbe für das Zeichen
          noStroke();
          textAlign(CENTER, CENTER);
          textSize(this.groesse * 0.7);
          text(this.zeichen, (this.i + 0.5) * this.groesse, (this.j + 0.6) * this.groesse);
        }
      }
    }


```

<iframe src="tictactoe.html" width="324" height="324"></iframe>

---