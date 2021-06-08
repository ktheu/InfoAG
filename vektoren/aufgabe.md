```
/*  
v1 ist der rote Vektor, v2 der blaue Vektor.
1. Zeichne den Vektor v3 = v1 + v2 als grüne Linie ein, mit Start im Ursprung.
2. Zeichen den Vektor v4 = v1 - v2 als gelbe Linie ein, mit Start am Ende der roten Linie.
3. Zeichen den Vektor v5 = v2 - v1 als magenta Linie ein, mit Start am Ende der roten Linie
2. Vom unteren linken Eck soll ein grüne Linie starten die genau dieselbe Richtung
und Länge hat wie die grüne Linie in 1.
3. In der Mitte der grünen Linie aus 1 soll ein kleiner Punkt zu sehen sein.
*/


function setup() {
  createCanvas(600, 400);
  background(220);
  strokeWeight(4);
  let v1 = createVector(180,150);   // rot
  let v2 = createVector(300,100);   // blau
  
  stroke(255,0,0);             // v1 rot
  line(0,0,v1.x, v1.y);
  stroke(0,0,255)              // v2 blau
  line(0,0,v2.x, v2.y);
  
  let v3 = p5.Vector.add(v1,v2);
  stroke(0,255,0);
  line(0,0,v3.x,v3.y)
  
  let v4 = p5.Vector.sub(v1,v2);
  let v5 = p5.Vector.sub(v2,v1);
  stroke(255,255,0);
  line(v1.x,v1.y,v1.x+v4.x,v1.y+v4.y)
  line(v2.x,v2.y,v2.x+v5.x,v2.y+v5.y)
}

function draw() {
  // bleibt leer
 
}

``` 