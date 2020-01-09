## Text und Zeichen

Wenn die Eingabe möglich ist, wird die Variable `Eingabe` um jedes gedrückte Zeichen erweitert.

```
let eingabe = "";
let eingabeMoeglich = true;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(220);
  textSize(20);
  if (eingabeMoeglich) {
      text("Eingabe: "+ eingabe, 20,100);
      
  }
  else {
      text("Es wurde eingegeben: "+eingabe,20,100);
  }
}

function keyTyped() {
  if (eingabeMoeglich) {
    eingabe += key;
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) eingabe = eingabe.substr(0, eingabe.length - 1);
  if (keyCode === ENTER) {
    eingabeMoeglich = false;
  }
}
```



<iframe src="eingabe.html" width="320" height="220"></iframe>

----


<iframe src="simplePong.html" width="320" height="320"></iframe>



