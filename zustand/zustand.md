## Zustände

Bei Spielen ist es häufig möglich, verschiedene Zustände zu identifizieren. Meist unterscheiden sich die Zustände dadurch, dass auf der Leinwand andere Dinge zu sehen sind. Im Beispiel wird im Zustand "WELCOME" der Benutzer begrüßt und mit den Regeln des
Spiels vertraut gemacht, im Zustand "PLAY" findet das eigentliche Spiel statt, im Zustand "END" wird das Ergebnis angezeigt und
die Möglichkeit zum Restart gegeben.

Für spendieren uns eine Variable `state` und implementieren für jeden Zustand eine eigene Funktion.
Die draw-Funktion beteht dann nur noch aus einer `switch-case` Anweisung.

Beispiel: BallFangen


```
    farbe0 = ['#295B7F', '#89CEFF', '#52B7FF', '#737A7F', '#3D88BE']   // blue
    farbe1 = ['#325C40', '#60E08B', '#367049', '#3F8F59', '#5A635D']   // green
    farben = [farbe0, farbe1];

    let state = "WELCOME";
    let basketbreite = [40, 38];
    let balldurchmesser = [20, 21];
    let nextlevel = [10, 1000];

    let score;
    let level;
    let vy;
    let x;
    let y;

    function setup() {
      createCanvas(600, 400);
    }

    function init0() {
      score = 0;
      level = 0;
      vy = [2, 3];
      newBall();
      state = "PLAY";
    }

    function newBall() {
      x = int(random(50, width - 50));
      y = 0;
    }

    function draw() {
      switch (state) {
        case "WELCOME":
          welcome();
          break;
        case "PLAY":
          play(level);
          break;
        case "END":
          end();
          break;
      }
    }

    function welcome() {
      background(120);
      textausgabe('Welcome to Ballfangen', 100, 20);
      textausgabe('Move basket with mouse to catch the ball', 300);
      textausgabe('Press Enter to start', 320);
    }

    function play(lvl) {
      background(farben[lvl][0])

      // check
      let radius = balldurchmesser[lvl] / 2;
      let baskethalb = basketbreite[lvl] / 2;
      let oberhalb = (y + radius) < height - 50;
      let unterhalb = (height - 50) < y - radius
      let zwischen = (mouseX - baskethalb < x - radius) && (x + radius < mouseX + baskethalb);
      let gefangen = zwischen && unterhalb;
      let kollision = !oberhalb && !zwischen;

      if (gefangen) {
        score++;
        if (score >= nextlevel[lvl]) {
           level++;
        }
        newBall();
      }

      if (kollision) {
        state = 'END'
      }

      // move
      vy[level] *= 1.001
      y = y + vy[level]

      // display 
      displayScore(level);
      displayBasket(level);
      displayBall(level);
    }

    function end() {
      background(120);
      textausgabe("End of Ballfangen", 100, 20);
      textausgabe("Your score: " + score, 300);
      textausgabe("r - restart", 320);
    }

    function keyPressed() {
      if ((state === 'WELCOME' && keyCode === ENTER) || (state === 'END' && key === 'r')) {
        init0();
      }
    }

    function displayBall(level) {
      noStroke();
      fill(farben[level][4]);
      circle(x, y, balldurchmesser[level]);
    }

    function displayBasket(level) {
      rectMode(CENTER);
      strokeWeight(2);
      stroke(farben[level][2]);
      fill(farben[level][3]);
      rect(mouseX, height - 25, basketbreite[level], 50);
    }

    function displayScore(level) {
      noStroke();
      fill(farben[level][3]);
      textSize(20);
      text(score, 40, 40);
    }

    function textausgabe(str, y, size = 14, farbe = 200) {
      rectMode(CORNER);
      textAlign(CENTER);
      textSize(size);
      fill(farbe);
      noStroke();
      text(str, 0, y, width);
    }
```

<iframe src="fangen.html" width="620" height="420"></iframe>