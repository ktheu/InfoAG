## Das Coding ändern. 

Code lesbarer und besser wartbar machen.

---

#### Paint

```
function setup() {
  createCanvas(400, 400);
  background(255);
  textSize(13);
  textAlign(RIGHT);
  text('Space = Delete', 102, 30);
  textSize(13);
  textAlign(RIGHT);
  text('4 = Blue', 62, 110);
  textSize(13);
  textAlign(RIGHT);
  text('1 = Black', 66, 50);
  textSize(13);
  textAlign(RIGHT);
  text('2 = Red', 60, 70);
  textSize(13);
  textAlign(RIGHT);
  text('3 = Green', 72, 90);
}

function draw() {

  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

}

function keyTyped() {

  if (key === '2') {
    stroke(255, 0, 0);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  if (key === '3') {
    stroke(0, 255, 0);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  if (key === '4') {
    stroke(0, 0, 255);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  if (key === '1') {
    stroke(0, 0, 0);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  if (key === ' ') {
    background(255);
    noStroke();
    textSize(13);
    textAlign(RIGHT);
    text('Space = Delete', 102, 30);
    textSize(13);
    textAlign(RIGHT);
    text('4 = Blue', 62, 110);
    textSize(13);
    textAlign(RIGHT);
    text('1 = Black', 66, 50);
    textSize(13);
    textAlign(RIGHT);
    text('2 = Red', 60, 70);
    textSize(13);
    textAlign(RIGHT);
    text('3 = Green', 72, 90);
  }
}
```

<iframe src="paintVor.html" width="420" height="420"></iframe>
<br>
<br>
<br>

<details><summary><strong>Code Änderung</strong></summary>

```
/*
Die function info() vermeidet Code-Wiederholung.
Der Text soll mit noStroke() gezeichnet werden, deswegen merken
wir uns die aktuelle Farbe in einer Variablen.
Die line-Funktion rufen wir nur in der draw-Methode auf.
*/

let farbe = [0, 0, 0];

function setup() {
  createCanvas(400, 400);
  info();
}


function info() {
  background(255);
  noStroke();
  textSize(13);
  textAlign(LEFT);
  text('1 = Black', 10, 50);
  text('2 = Red', 10, 70);
  text('3 = Green', 10, 90)
  text('4 = Blue', 10, 110);
  text('Space = Delete', 10, 30);
}

function draw() {
  stroke(farbe);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function keyTyped() {
  if (key === '1') farbe = [0, 0, 0];
  else if (key === '2') farbe = [255, 0, 0];
  else if (key === '3') farbe = [0, 255, 0];
  else if (key === '4') farbe = [0, 0, 255];
  else if (key === ' ') info();
}
```
<iframe src="paintNach.html" width="420" height="420"></iframe>

</details>

---

#### Pong

```
 let x = 150;
 let y = 100;
 let vx = 1.5;
 let vy = -3;
 let radius = 10;
 let t = 80;
 let z = 80;
 let l = 0;
 let r = 0;
 let rechtecke = [];

 function setup() {
   createCanvas(300, 200);
   ellipseMode(RADIUS);
 }

 function draw() {
   background(0);
   for (let r of rechtecke) r.act();

   noStroke();
   fill(155);
   rect(149, 5, 2, 190);

   if (x < radius || x > width - radius) {
     vx = -vx;
     if (x >= 290) {
       l += 1;
       x = 150;
       y = 100;
       vx = -1.5;
       vy = -3;
     }
     if (x <= 10) {
       r += 1;
       x = 150;
       y = 100;
       vx = 1.5;
       vy = -3;
     }
   }

   if (y < radius || y > height - radius) {
     vy = -vy;
   }

   if (keyIsDown(UP_ARROW)) {
     z -= 2;
   }
   if (keyIsDown(DOWN_ARROW)) {
     z += 2;
   }

   if (keyIsDown(SHIFT)) {
     t -= 2;
   }

   if (keyIsDown(CONTROL)) {
     t += 2;
   }

   if (z >= 160) {
     z = 160;
   }

   if (z <= 0) {
     z = 0;
   }

   if (t >= 160) {
     t = 160;
   }

   if (t <= 0) {
     t = 0;
   }

   if (l === 0) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('0', 120, 40);
   }

   if (l === 1) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('1', 120, 40);
   }

   if (l === 2) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('2', 120, 40);
   }

   if (l === 3) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('3', 120, 40);
   }

   if (l === 4) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('4', 120, 40);
   }

   if (l === 5) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('5', 120, 40);
   }

   if (l === 6) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('6', 120, 40);
   }

   if (l === 7) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('7', 120, 40);
   }

   if (l === 8) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('8', 120, 40);
   }

   if (l === 9) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('9', 120, 40);
   }

   if (l === 10) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('10', 120, 40);
     textSize(18);
     fill(255);
     text('Der linke Spieler hat gewonnen', 280, 60);
     vx = 0;
     vy = 0;
   }

   if (r === 0) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('0', 195, 40);
   }

   if (r === 1) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('1', 195, 40);
   }

   if (r === 2) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('2', 195, 40);
   }

   if (r === 3) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('3', 195, 40);
   }

   if (r === 4) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('4', 195, 40);
   }

   if (r === 5) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('5', 195, 40);
   }

   if (r === 6) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('6', 195, 40);
   }

   if (r === 7) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('7', 195, 40);
   }

   if (r === 8) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('8', 195, 40);
   }

   if (r === 9) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('9', 195, 40);
   }

   if (r === 10) {
     textSize(30);
     textAlign(RIGHT);
     fill(255);
     text('10', 210, 40);
     textSize(18);
     fill(255);
     text('Der rechte Spieler hat gewonnen', 280, 60);
     vx = 0;
     vy = 0;
   }

   x = x + vx;
   y = y + vy;

   fill(255);
   circle(x, y, radius);
   rect(10, t, 5, 40);
   rect(285, z, 5, 40);

   let hit = collideRectCircle(10, t, 5, 40, x, y, radius);
   if (hit) vx = -vx;

   let hitt = collideRectCircle(285, z, 5, 40, x, y, radius);
   if (hitt) vx = -vx;
 }
```

<iframe src="pongVor.html" width="320" height="220"></iframe>

<br><br><br>

<details><summary><strong>Code Änderung</strong></summary>

```
/*

Die Mittelline wird eine Linie, kein Rechteck.
Das Rechteck-Array wird nirgends gebraucht.
Da die Füllfarbe und die Strichfarbe immer gleich bleiben, können wir sie in
setup setzen.
Die Bedingungen für die Bewegung des Balkens werden zusammengefasst.
Die Funktion anfang() vermeidet Code-Wiederholungen.
Die Variablen für collide2D sind sprechend und werden zusammengefasst.
Reihenfolge: check-move-display

todo: die Variablennamen für die Balken sind nicht sonderlich sprechend.
todo: Variablen einführen, um die Größen für die Leinwand, den Ball und die Balken
änderbar zu machen.
*/
let x; // Ball 
let y;
let vx;
let vy;

let radius = 10;

let t = 80; // y-Koordinate Balken
let z = 80;

let l = 0; // Zähler
let r = 0;

function setup() {
  createCanvas(300, 200);
  ellipseMode(RADIUS);
  textAlign(RIGHT);
  fill(255);
  stroke(155);
  anfang();
}

function anfang() {
  x = 150;
  y = 100;
  vx = -1.5;
  vy = -3;
}

function draw() {
  background(0);

  // check

  if (x < radius) {
    l += 1;
    anfang();
    vx = -vx;
  } else if (x > width - radius) {
    r += 1;
    anfang();

  }

  if (y < radius || y > height - radius) {
    vy = -vy;
  }

  let hitLinks = collideRectCircle(10, t, 5, 40, x, y, radius);
  let hitRechts = collideRectCircle(285, z, 5, 40, x, y, radius);
  if (hitLinks || hitRechts) vx = -vx;

  // move

  if (keyIsDown(UP_ARROW) && z >= 2) {
    z -= 2;
  }
  if (keyIsDown(DOWN_ARROW) && z <= 158) {
    z += 2;
  }

  if (keyIsDown(SHIFT) && t >= 2) {
    t -= 2;
  }

  if (keyIsDown(CONTROL) && t <= 158) {
    t += 2;
  }

  x = x + vx;
  y = y + vy;

  // display

  line(width / 2, 0, width / 2, height); // Mittellinie

  textSize(30);
  text(l, 120, 40);
  text(r, 195, 40);

  if (l === 10) {
    textSize(18);
    text('Der linke Spieler hat gewonnen', 280, 60);
    vx = 0;
    vy = 0;
  }

  if (r === 10) {
    textSize(18);
    text('Der rechte Spieler hat gewonnen', 280, 60);
    vx = 0;
    vy = 0;
  }

  circle(x, y, radius);
  rect(10, t, 5, 40);
  rect(285, z, 5, 40);
}
```

<iframe src="pongNach.html" width="320" height="220"></iframe>

</details>