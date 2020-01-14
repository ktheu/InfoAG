## Glitch

In einem [Glitch](https://glitch.com)-Project können wir einen Node-Server starten, der es erlaubt, Daten zu speichern.

Wir möchten Highscores in einem Spiel zu verwalten.

#### Express und Nedb

- Wir klicken auf `New Project` und wählen `hello-express` aus.  
- Durch Klick auf den Projektnamen können wir einen passenden Namen vergeben.
- Klick auf `package.json`, `add package`, suchen nach `nedb`  und auswählen. Nedb ist eine einfache Datenbank.

#### server.js
 
Den Inhalt von `server.js` vollständig ersetzen durch den folgenden Inhalt. Gegebenenfalls die Variable
`highscoreAnz` anpassen. 

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

Den Inhalt von `views/index.html` löschen und durch den folgenden Inhalt ersetzen. 
Gegebenenfalls `title`, `background-color` und `padding` anpassen.

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

#### httpPost, httpGet

Wir setzen voraus, dass `name` die Variable ist mit dem Namen des Spielers, der in die Highscoreliste
soll und `score` sein score. Mit der folgenden Anweisung senden wir die Daten an den Server,
setzen `name` und `score` auf einen Anfangszustand und begeben uns in den Spielstatus `PLAY`.


```
let score = 0;
let name = "";
let state = "PLAY"; 

// ...

httpPost("/highscore", {name: name, score: score}, function(res) {
    score = 0;
    name = "";
    state = "PLAY";
    getHighscore();
});
 
```

Die Funktion `getHighscore` füllt die Variablen `hsmin` und `highscoreText`, die wir an geeigneter
Stelle ausgeben können. `hsmin` wird benötigt um zu entscheiden, ob eine neuer Eintrag in die
Highscore-Liste erfolgen soll.

```
let hsmin = 0;               // minimaler Highscore
let highscoreText = "";      // Ausgabetext des Highscores
 
// ...

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

#### Beispiel Sketch

Spiel auf Glitch [hier](https://highscore.glitch.me/). Bei jedem Klick wird eine Zahl erzeugt.

```
let highscoreText = "";
let hsmin = 0; // minimaler Highscore
let score = 0;
let name = "";

let state = "PLAY";

function setup() {
  createCanvas(300, 200);
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
  background(220);
  text(highscoreText, 50, 30);
  text("Deine Zahl: " + score, 50, 140);

  if (score > hsmin) {
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
        httpPost("/highscore", {name: name, score: score}, function(res) {
        score = 0;
        name = "";
        state = "PLAY";
        getHighscore();
      });
    }
  }
}

function mousePressed() {
  if (state === "PLAY") {
    score = int(random(50));
  }
}

```