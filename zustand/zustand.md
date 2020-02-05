## Zustände

Bei Spielen ist es häufig möglich, verschiedene Zustände zu identifizieren. Meist unterscheiden sich die Zustände dadurch,
dass auf der Leinwand andere Dinge zu sehen sind. Im Beispiel wird im Zustand "WELCOME" der Benutzer begrüßt und mit den Regeln des
Spiels vertraut gemacht, im Zustand "PLAY" findet das eigentliche Spiel statt, im Zustand "END" wird das Ergebnis angezeigt und
die Möglichkeit zum Restart gegeben.

Für spendieren uns eine Variable `state` und implementieren für jeden Zustand eine eigene Funktion.
Die draw-Funktion beteht dann nur noch aus einer `switch-case` Anweisung.

Hat unser Spiel mehrere Levels, wird jeder Level ein eigener Zustand.

Beispiel (ohne Levels): SimplePong


```
    let xBalken = 150;
    let yBalken = 270;
    let balkenBreite = 80;
    let balkenHoehe = 10;
    let xBall = 20;
    let yBall = 50;
    let ballRadius = 10;
    let treffer = 0;

    let vxBall = 4;
    let vyBall = 3;

    let vxBalken = 4;

    let pLinksVonBalken;
    let pRechtsVonBalken;

    let state = "WELCOME";

    function setup() {
      createCanvas(300, 300);
      ellipseMode(RADIUS);
    }

    function draw() {
      switch (state) {
        case "WELCOME":
          welcome();
          break;
        case "PLAY":
          play();
          break;
        case "END":
          end();
          break;
      }
    }

    function end() {
      background(120);
      fill(50);
      textSize(20);
      textAlign(CENTER);
      text("End of SimplePong\n\n", 0, 100, width, 20);
      textSize(16);
      text("Your score: " + treffer + "\n\nr - restart", 0, 140, width, 80);
    }

    function welcome() {
      background(120);
      fill(50);
      textSize(20);
      textAlign(CENTER);
      text("Welcome to SimplePong\n\n", 0, 100, width, 20);
      textSize(16);
      text("Move paddle with \nleft and right arrow-key \n\nENTER to start", 0, 140, width, 80);
    }

    function play() {
      background(0);

      let oberhalbBalken = yBall + ballRadius <= yBalken;
      let unterhalbBalken = yBall - ballRadius >= yBalken + balkenHoehe;
      let linksVonBalken = xBall + ballRadius <= xBalken;
      let rechtsVonBalken = xBalken + balkenBreite <= xBall - ballRadius;

      let kollisionMitBalken = !(oberhalbBalken || unterhalbBalken || linksVonBalken || rechtsVonBalken);

      let amRandLinksRechts = (xBall - ballRadius < 0 || xBall + ballRadius > width);
      let amRandOben = yBall - ballRadius < 0;

      let kommtVonLinks = pLinksVonBalken && !linksVonBalken;
      let kommtVonRechts = pRechtsVonBalken && !rechtsVonBalken;

      if (amRandLinksRechts) vxBall = -vxBall;
      if (amRandOben) vyBall = -vyBall;

      if (kollisionMitBalken) {
        if (kommtVonLinks) vxBall = -vxBall - vxBalken;
        else if (kommtVonRechts) vxBall = -vxBall + vxBalken
        else {
          vyBall = -vyBall;
          treffer++;
        }
      }

      if (yBall > height) {
        state = "END";
      }

      if (keyIsDown(LEFT_ARROW)) xBalken = xBalken - vxBalken;
      if (keyIsDown(RIGHT_ARROW)) xBalken = xBalken + vxBalken;

      // der Ball wird langsam schneller
      vxBall = vxBall * 1.0003;
      vyBall = vyBall * 1.0003;

      xBall = xBall + vxBall;
      yBall = yBall + vyBall;

      noStroke();
      rect(xBalken, yBalken, balkenBreite, balkenHoehe);
      circle(xBall, yBall, ballRadius);

      textSize(20);
      fill(255);
      text(treffer + "", 20, 30);

      pLinksVonBalken = linksVonBalken;
      pRechtsVonBalken = rechtsVonBalken;

    }

    function keyPressed() {
      if (state === "WELCOME" && keyCode === ENTER) {
        state = "PLAY";
      }

      if (state === "END" && key === 'r') {
        treffer = 0;
        xBall = random(20, width - 20);
        yBall = 50;
        vxBall = 4;
        vyBall = 3;
        state = "PLAY";
      }
    }
```

<iframe src="simplePong.html" width="320" height="320"></iframe>