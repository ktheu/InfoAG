## Highscores


```
let xBalken = 150;
let yBalken = 270;
let balkenBreite = 80;
let balkenHoehe = 10;
let xBall = 20;
let yBall = 50;
let ballRadius = 10;
let treffer = 0;

var tRechts = false; // Schalter Taste
var tLinks = false;

let vxBall = 4;
let vyBall = 3;

let vxBalken = 4;

let pLinksVonBalken;
let pRechtsVonBalken;

let highscore;

function setup() {
  createCanvas(300, 300);
  ellipseMode(RADIUS);
  highscore = getItem('highscorePong');
  if (highscore === null)
    highscore = 0;
  else
    highscore = int(highscore);

  print(highscore);
}

function draw() {
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

  let ende = yBall > height;

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

  if (tLinks) xBalken = xBalken - vxBalken;
  if (tRechts) xBalken = xBalken + vxBalken;



  // der Ball wird langsam schneller
  vxBall = vxBall * 1.0003;
  vyBall = vyBall * 1.0003;

  xBall = xBall + vxBall;
  yBall = yBall + vyBall;



  noStroke();
  rect(xBalken, yBalken, balkenBreite, balkenHoehe);
  circle(xBall, yBall, ballRadius);


  if (treffer > highscore) {
    highscore = treffer;
  }

  textSize(20);
  fill(255);
  text(treffer + "", 20, 30);
  textSize(10);
  text("high: ", 225, 30);
  textSize(20);
  text(highscore + "", 255, 30);

  if (ende) storeItem('highscorePong', highscore);

  pLinksVonBalken = linksVonBalken;
  pRechtsVonBalken = rechtsVonBalken;

}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) tRechts = true;
  if (keyCode == LEFT_ARROW) tLinks = true;
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) tRechts = false;
  if (keyCode == LEFT_ARROW) tLinks = false;
}

function mousePressed() {
  treffer = 0;
  xBall = random(20, width - 20);
  yBall = 50;
  vxBall = 4;
  vyBall = 3;
}
```