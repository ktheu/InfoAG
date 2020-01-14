## Highscore

Wir möchten einen möglichst einfachen Ablauf zur Verwaltung von Highscores in einem Spiel.
Wir verwenden dazu die Datenbank [nedb](https://github.com/louischatriot/nedb).

Im 1. Schritt verwenden wir die Browser-Version. 
Die Datenbank lebt lokal im Storage-Bereich des Browsers.  In Chrome können wir sie mit `Strg+Umsch+i, Application, IndexedDB` ansehen.  

Im 2. Schritt bringen wir unsere Anwendung nach [Glitch](https://glitch.com/). Glitch bietet die
Möglichkeit, eine Datenbank über einen Node-Server anzusprechen. Die Highscores werden dann nicht mehr lokal auf dem Browser gespeichert, sondern remote auf Glitch.


### Highscore mit Nedb-Datenbank im Browser Storage

 
Wir gehen davon aus, dass unser Spiel die states 'PLAY' und 'HIGHSCORE' besitzt.

 
 
#### Globale Variablen

Gegebenfalls die Variable `highscoreAnz` updaten.

```
let highscoreAnz = 3;  // Anzahl Highscores    
let db;

let highscoreText = "";
let hsmin = 0;        // minimaler Highscore
let score = 0;        // aktueller score
let name = "";        // Spielername für Highscore
```

#### preload und getHighscore

Die beiden Funktionen können ohne Änderung übernommen werden.

```
function preload() {
    db = new Nedb({ filename: 'highscore' });   // im Browser-Storage: IndexedDB
    db.loadDatabase();
    //db.remove({}, { multi: true });  
    db.count({}, function (err, res) {
    if (res === 0) {
        for (let i = 0; i < highscoreAnz; i++) {
            db.insert([{ name: "N.N", score: 0 }]);
        }
    }
    getHighscore();
    });
}

function getHighscore() {

    db.find({}).sort({
        score: -1            // Nach score absteigend sortieren
    }).exec(function (err, res) {             
        if (res.length > highscoreAnz) {
            for (let i = highscoreAnz; i < res.length; i++) {
                db.remove({ _id: res[i]._id });
            }
            res = res.slice(0, highscoreAnz);
        }

        highscoreText = "Highscore:\n\n";
        for (let i = 0; i < res.length; i++) {
           highscoreText += res[i].name + ": " + res[i].score + "\n";
        }
        hsmin = res[res.length - 1].score;
    });
}

```

#### draw

In der draw-Methode können wir an geeigneter Stelle den highscoreText ausgeben und
in den HIGHSCORE-State wechseln, wenn der score größer als der kleinste Highscore ist. 
```
function draw() {
    // ...
    text(highscoreText, 50, 30);
    
    if (score > hsmin) {
        state = "HIGHSCORE";
        text("Dein Name: " + name, 50, 165);
    }
}

```

#### Eingabe des Namens

Im Status HIGHSCORE können wir uns mit einem Namen in die Highscoreliste eintragen. 
Mit jedem Tastendruck hängen wir ein Zeichen an die Variable `name` an, mit BACKSPACE löschen
wir das letzte Zeichen, mit ENTER schließen wir die Eingabe ab und wechseln wieder in den PLAY-State.


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
            let data = {
                name: name,
                score: score
            };
            db.insert([data], function (res) {
                score = 0;
                name = "";
                state = "PLAY";
                getHighscore();
            });
        }
    }
}
```

#### Ein einfaches Beispiel

```
<html>

<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
  <script src="./nedb.min.js"></script>
  <script>

    let highscoreAnz = 3;  // Anzahl Highscores
    let db;

    let highscoreText = "";
    let hsmin = 0;        // minimaler Highscore
    let score = 0;        // aktueller score
    let name = "";        // Spielername für Highscore

    let state = "PLAY";

    function preload() {
      db = new Nedb({ filename: 'highscore' });   // im Browser-Storage: IndexedDB
      db.loadDatabase();
      //db.remove({}, { multi: true });  
      db.count({}, function (err, res) {
        if (res === 0) {
          for (let i = 0; i < highscoreAnz; i++) {
            db.insert([{ name: "N.N", score: 0 }]);
          }
        }
        getHighscore();
      });
    }

    function setup() {
      createCanvas(300, 200);

    }

    function getHighscore() {

      db.find({}).sort({
        score: -1                                 // Nach score absteigend sortieren
      }).exec(function (err, res) {              // res ist das Array mit den Resultaten der Abfrage
        if (res.length > highscoreAnz) {
          for (let i = highscoreAnz; i < res.length; i++) {
            db.remove({ _id: res[i]._id });
          }
          res = res.slice(0, highscoreAnz);
        }

        highscoreText = "Highscore:\n\n";
        for (let i = 0; i < res.length; i++) {
          highscoreText += res[i].name + ": " + res[i].score + "\n";
        }
        hsmin = res[res.length - 1].score;

      });
    }


    function draw() {
      background(220);
      text(highscoreText, 50, 30);

      text("Deine Zahl: " + score, 50, 140);

      if (score > hsmin) {
        state = "HIGHSCORE";
        text("Dein Name: " + name, 50, 165);
      }
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
          let data = {
            name: name,
            score: score
          };
          db.insert([data], function (res) {
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

  </script>
</head>

<body>
</body>

</html> 

```

### Highscore mit Nedb-Datenbank auf Node-Server in Glitch



#### index.html:

```
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
    <script>
      let highscoreText;
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
          state = "HIGHSCORE";
          text("Dein Name: " + name, 50, 165);
        }
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
            let data = {
              name: name,
              score: score
            };
            httpPost("/highscore", data, function(res) {
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
    </script>
  </head>

  <body></body>
</html>
```

#### server.js

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