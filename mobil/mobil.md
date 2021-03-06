## Mobil

Mit den Variablen *rotationX,Y,Z* können wir auf die Rotationswerte eines mobile device zugreifen.

```
    function setup() {
      createCanvas(400, 400);
    }

    function draw() {
      background(230);
      stroke(0);
      strokeWeight(5);

      fill(255, 255, 0);           // Kopf
      ellipse(200, 200, 200, 200)

      fill(255);                 // Augen
      ellipse(160, 175, 30, 30);
      ellipse(240, 175, 30, 30);

      fill(0);
      dx = map(rotationX, 0, 90, 2, 7, true);  // Pupillen
      ellipse(170 - dx, 175, 10, 10);
      ellipse(230 + dx, 175, 10, 10);

      fill(255);                 // Nase
      triangle(200, 180, 220, 220, 180, 220);

      noFill();                  // Mund
      let y = map(rotationX, 0, 90, 230, 270, true);
      beginShape()
      curveVertex(150, y)
      curveVertex(150, y)
      curveVertex(180, 250)
      curveVertex(220, 250)
      curveVertex(250, y)
      curveVertex(250, y)
      endShape()
    }


```

<iframe src="smiley.html" width="420" height="420"></iframe>

<br><br>

Betrachte den Sketch auf dem Handy. Augen und Mund hängen von rotationX ab.

<img src="smiley.png" width="150">