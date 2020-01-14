## Glitch

In einem Glitch-Project können eine Node-Server starten, der es erlaubt, Daten zu speichern.

Wir müssen zwei Dateien anpassen:

```
- views
   index.html
- server.js
 
```

#### index.html

Lösche den gesamten Inhalt und füge das Muster unten ein.
Update den `title`, wähle bei `background-color` eine Hintergrundfarbe und setze ein geeignetes `padding`.


```
<!DOCTYPE html>
<html>
  <head>
    <title>Highscore-Demo</title>
    <meta charset="utf-8" />
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        background-color: #1a1a1a;
        padding-top: 100px;
      }
      canvas {
        display: block;
        margin: auto;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
    <script>
      // Hier kommt der Sketch hin
    </script>
  </head>
</html>
  
```

Füge den Sketch zwischen die beiden `script`-Tags ein

```
<!DOCTYPE html>
<html>
  <head>
    <title>Highscore-Demo</title>
    <meta charset="utf-8" />
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        background-color: #1a1a1a;
        padding-top: 100px;
      }
      canvas {
        display: block;
        margin: auto;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
    <script>
      let highscore = [["N.N.", 0]];
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
        a = getItem("highscore");
        if (a) highscore = a;
      }

      function draw() {
        background(220);
        s = "Highscore:\n\n";
        for (let i = 0; i < highscore.length; i++) {
          s = s + highscore[i][0] + "  " + highscore[i][1] + "\n";
        }
        textSize(16);
        text(s, 50, 30);

        text("Deine Zahl: " + zahl, 50, 140);

        if (
          (highscore.length < 3 && zahl > 0) ||
          zahl > highscore[highscore.length - 1][1]
        ) {
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
            storeItem("highscore", highscore);
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
    </script>
  </head>
</html>

```

Jetzt sollte der Sketch durch einen Click auf `Show` laufen. Es fehlt jetzt noch die Umstellung der Datenspeicherung
von *local storage* auf eine Datei auf dem Server.


```
<!DOCTYPE html>
<html>
  <head>
    <title>Highscore-Demo</title>
    <meta charset="utf-8" />
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        background-color: #1a1a1a;
        padding-top: 100px;
      }
      canvas {
        display: block;
        margin: auto;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
    <script>
      let highscore = [["N.N.", 0]];
      let zahl = 0;
      let state = "PLAY";
      let name = "";

      function hssort(a, b) {
        if (a[1] > b[1]) return -1;
        if (a[1] < b[1]) return 1;
        return 0;
      }

      function preload() {
         httpGet("/highscore", "text", false, function(res) {
          highscore = JSON.parse(res);
        });
      }
      
      function setup() {
        createCanvas(300, 200);
        // a = getItem("highscore");
      }


      function draw() {
        background(220);
        s = "Highscore:\n\n";
        for (let i = 0; i < highscore.length; i++) {
          s = s + highscore[i][0] + "  " + highscore[i][1] + "\n";
        }
        textSize(16);
        text(s, 50, 30);

        text("Deine Zahl: " + zahl, 50, 140);

        if (
          (highscore.length < 3 && zahl > 0) ||
          zahl > highscore[highscore.length - 1][1]
        ) {
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
            // storeItem("highscore", highscore);
            zahl = 0;
            name = "";
            state = "PLAY";
            httpPost("/highscore", JSON.stringify(highscore));
          }
        }
      }

      function mousePressed() {
        if (state === "PLAY") {
          zahl = int(random(50));
        }
      }
    </script>
  </head>
</html>

```