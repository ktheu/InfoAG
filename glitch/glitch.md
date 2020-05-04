## Glitch

In einem [Glitch](https://glitch.com)-Project können wir einen Node-Server starten, der es erlaubt, Daten zu speichern.

Wir möchten Highscores in einem Spiel zu verwalten.

Beispiel 1: [SimplePong](https://simplepong.glitch.me/)

Beispiel 2: [Wellen](https://wellen.glitch.me/)

#### Express und Nedb

- Wir klicken auf *New Project* und wählen *hello-express* aus.  
- Durch Klick auf den Projektnamen können wir einen passenden Namen vergeben.
- Klick auf *package.json, add package*, suchen nach *nedb*  und auswählen. Nedb ist eine einfache Datenbank.

#### server.js
 
Den Inhalt von *server.js* vollständig ersetzen durch den folgenden Inhalt. Gegebenenfalls die Variable
*highscoreAnz* anpassen. 

```
const highscoreAnz = 3;         // Update: Anzahl Highscores

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Datastore = require("nedb");

const db = new Datastore(".data/highscore.db");
db.loadDatabase();  
// db.remove({}, { multi: true });  
db.count({}, function(err, res) {
  if (res === 0) {
    for (let i = 0; i < highscoreAnz; i++) {
      db.insert([{ name: "N.N", score: 0 }]);
    }
  }
});  

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./", "views/index.html"));
});

app.get("/highscore", (req, res, next) => {
  db.find({})
    .sort({
      score: -1 // Nach score absteigend sortieren
    })
    .exec(function(err, docs) {
      // docs ist das Array mit den Resultaten der Abfrage
      if (docs.length > highscoreAnz) {
        for (let i = highscoreAnz; i < docs.length; i++) {
          db.remove({ _id: docs[i]._id });
        }
        docs = docs.slice(0, highscoreAnz);
      }
      res.json(docs);
    });
});

app.post("/highscore", (req, res, next) => {
  db.insert(req.body);
  res.redirect("/");
});

app.listen(process.env.PORT);
```
#### views/index.html

Den Inhalt von *views/index.html* löschen und durch den folgenden Inhalt ersetzen. 
Gegebenenfalls *title, background-color* und *padding-top* anpassen.

```
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
    <script>
        //  ------------ Hier kommt der Sketch hin -------------
    </script>
  </head>

  <body></body>
</html>
```
 
Jetzt den Sketch an die markierte Stelle einfügen und weitere Anpassungen machen.

#### Variablen, getHighscore

Wir setzen voraus, dass *name* die Variable mit dem Namen des Spielers ist, der in die Highscoreliste
soll und *score* sein score. Die Funktion *getHighscore* füllt die Variablen *hsmin* und *highscoreText*, die wir an geeigneter Stelle ausgeben können. *hsmin* wird benötigt um zu entscheiden, ob eine neuer Eintrag in die
Highscore-Liste erfolgen soll.

Falls noch nicht vorhanden, fügen wir die folgenden Variablen ein:

```
let score = 0;
let name = "";
let hsmin = 0;               // minimaler Highscore
let highscoreText = "";      // Ausgabetext des Highscores
```

Wir fügen folgende Funktion ein und rufen Sie am Ende von *setup* auf. 


```
function getHighscore() {
  httpGet(
    "/highscore",
    "json",
    false,
    function(res) {
      highscoreText = "Highscore:\n\n";
      for (let i = 0; i < res.length; i++) {
        highscoreText += res[i].name + ": " + res[i].score + "\n";
      }
      hsmin = res[res.length - 1].score;
    },
    function(err) {
      console.log(err);
    }
  );
}

```

#### Anpassung Welcome-Screen

Im *welcome-screen* zeigen wir an geeigneter Stelle den bisherigen Highscore

```
    textStyle(NORMAL);
    textAlign(LEFT);
    textSize(18);
    text(highscoreText, 100, 20);
```
 
#### Highscore und Newhighscore

Wenn wir am Ende eines Spiels merken, dass der erreichte Score größer als *hsmin* ist, versetzen wir uns in den
Spielstatus *HIGHSCORE* um unseren Namen einzugeben. Im Status *NEWHIGHSCORE* wird der neue Highscore dann gezeigt.
Hier könnten wir eine restart-Möglichkeit einbauen.

```
  if (score > hsmin) {
    state = "HIGHSCORE";
  }
```

In der draw-Methode berücksichtigen wir die neuen Stati:

```
  case "HIGHSCORE":
    highscore();
    break;

  case "NEWHIGHSCORE":
    newhighscore();
    break;

```

Die dazugehörigen Funktionen müssen für den Einzelfall angepasst werden.

```
function highscore() {
  background('#1a1a1f');
  fill(120);
  textStyle(NORMAL);
  textAlign(LEFT);
  textSize(18);
  text(highscoreText, 200, 100);
  
  text("Your score: " + score, 200, 270);
  text("Your name: " + name, 200, 300);
}

function newhighscore() {
  background('#1a1a1f');
  fill(120);
  textStyle(NORMAL);
  textAlign(LEFT);
  textSize(18);
  text(highscoreText, 200, 100);
}

 
```   

Zum Eintippen des Namens fügen wir die Funktion *keyTyped* ein.
In der Funktion *keyPressed* können wir mit *backspace* die Eingabe korrigieren. Mit 
*enter* schließen wir die Eingabe ab und versetzen uns in den Zustand *NEWHIGHSCORE*.

```
function keyTyped() {
  if (state === "HIGHSCORE") {
    name += key;
  }
}


function keyPressed() {
  if (state === "HIGHSCORE") {
    if (keyCode === BACKSPACE) name = name.substr(0, name.length - 1);
    if (keyCode === ENTER) {
      httpPost("/highscore", { name: name, score: score }, function(res) {
        getHighscore();
      });
      state = "NEWHIGHSCORE";
    }
  }
}

```


#### Fehlersuche 

Fehler in unserem Sketch treten auf der Client-Seite auf. Wir können in Chrome mit der Eingabe von
`Strg+Umschalt+I` die Konsole mit den Fehlermeldungen aufrufen.

Fehler auf der Serverseite können wir in Glitch mit Klick auf `Tools, Logs` sehen.

#### Datenbank neu anlegen
Die Datenbank können wir löschen, indem wir die Kommentarzeichen in Zeile 10 in *server.js* entfernen und die 
Anwendung neu starten. Danach fügen wir die Kommentarzeichen wieder ein.

```
db.remove({}, { multi: true });  

```

#### Anwendung aufrufen
Wenn der Projektname *treffer* heißt, dann ist die Anwendung unter *https://treffer.glitch.me/* aufrufbar.


### Beispiel: _[Highscore](https://highscore.glitch.me)_

Ein Mausklick erzeugt eine Zufallszahl zwischen 0 und 99. Die höchsten drei werden im Highscore abgespeichert.

```
      let highscoreText = "";
      let hsmin = 0; // minimaler Highscore
      let score = 0;
      let name = "";

      let state = "WELCOME";

      function setup() {
        createCanvas(400, 400);
        fill(120);
        getHighscore();
      }

      function getHighscore() {
        httpGet(
          "/highscore",
          "json",
          false,
          function(res) {
            highscoreText = "Highscore:\n\n";
            for (let i = 0; i < res.length; i++) {
              highscoreText += res[i].name + ": " + res[i].score + "\n";
            }
            hsmin = res[res.length - 1].score;
          },
          function(err) {
            console.log(err);
          }
        );
      }

      function draw() {
        background("#1a1a1f");

        switch (state) {
          case "WELCOME":
            welcome();
            break;

          case "PLAY":
            play();
            break;

          case "HIGHSCORE":
            highscore();
            break;

          case "NEWHIGHSCORE":
            newhighscore();
            break;
        }
      }

      function welcome() {
        textSize(22);
        text("Welcome to Highscore", 50, 50);
        textSize(18);
        text(
          "Click to start, then click to get a random number",
          50,
          100,
          250,
          200
        );
        textSize(18);
        text(highscoreText, 50, 200);
      }

      function play() {
        textSize(18);
        text("Your number: " + score, 50, 200);
        if (score > hsmin) {
          state = "HIGHSCORE";
        }
      }

      function highscore() {
        textSize(18);
        text(highscoreText, 50, 100);

        text("Your score: " + score, 50, 270);
        text("Your name: " + name, 50, 300);
      }

      function newhighscore() {
        textSize(18);
        text(highscoreText, 50, 100);
      }

      function keyTyped() {
        if (state === "HIGHSCORE") {
          name += key;
        }
      }

      function keyPressed() {
        if (state === "HIGHSCORE") {
          if (keyCode === BACKSPACE) name = name.substr(0, name.length - 1);
          if (keyCode === ENTER) {
            httpPost("/highscore", { name: name, score: score }, function(res) {
              getHighscore();
            });
            state = "NEWHIGHSCORE";
          }
        }
      }

      function mousePressed() {
        if (state === "WELCOME") state = "PLAY";
        if (state === "PLAY") {
          score = int(random(100));
        }
      }
```
