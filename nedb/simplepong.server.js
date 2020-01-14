const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Datastore = require("nedb");

const db = new Datastore(".data/database.db");
db.loadDatabase();

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./", "sketch.html"));
});
 
app.get("/highscore", (req, res, next) => {
  db.find({})
    .sort({
      score: -1
    })
    .exec(function(err, result) {
      res.json(result);
    });
});

app.post("/highscore", (req, res, next) => {
  let newuser = req.body;
  db.find({})
    .sort({
      score: -1
    })
    .exec(function(err, data) {
      let last = data[data.length - 1];
      if (newuser.score > last.score) {
        db.remove(last);
        db.insert(newuser);
      }
      res.redirect("/");
    });
});

app.listen(process.env.PORT);
