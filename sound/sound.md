## Sound

Die [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) Bibliothek liefert umfangreiche Möglichkeiten
zur Wiedergabe, Bearbeitung und Erzeugen von Sound.

Die unterstützten Wiedergabeformate hängen vom Browser ab, die Formate *mp3* und *wav* sind immer möglich.

Bei [BenSound](https://www.bensound.com/) gibt es einige Musiktitel, die lizenzfrei genutzt werden können, wenn
BenSound als Urheber genannt ist.

Geräusche können bei [FreeSound](https://freesound.org/) heruntergeladen werden. Die Nutzungsbedingungen sind
unterschiedlich. Viele sind lizenzfrei, manche Urheber möchten genannt werden, manche nicht. 

Tutorial: Daniel Shiffmans [Youtube Tutorial](https://www.youtube.com/playlist?st=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW) für p5.sound.

-----

#### Hintergrundmusik 

Wie Bilder werden auch Musikfiles in der preload-Funktion geladen.

Im Beispiel wird die Hintergrundmusik mit Mausklick ein- und ausgeschaltet.

```
let song;

function preload() {
    song = loadSound('bensound-jazzyfrenchy.mp3');
}

function setup() {
    createCanvas(100, 100);
    background(200);
    createP("Music: www.bensound.com")
}

function draw() {

}

function mousePressed() {
    if (song.isPlaying() ) {
        song.stop();
    } else {
        song.play();
    }
}


```

<iframe src="startStop.html" width="200" height="200"></iframe>


#### Drei Sounds

Ein Hintergrundsound, der mit Mausklick gestartet wird, eine Explosion mit Taste 'e' und ein Schuss mit Taste 's'

```
let song;
let missile;
let explosion;

function preload() {
    song = loadSound('soundtrack.mp3');
    missile = loadSound('missile.mp3')
    explosion = loadSound('explosion.mp3')
}

function setup() {
    createCanvas(200, 200);
    background(220);
    song.setVolume(0.7);
}

function draw() {
}

function keyPressed() {
     if (key === 'e') explosion.play();
     if (key === 's') missile.play();
}

function mousePressed() {
    song.play();
}

```

<iframe src="dreiSounds.html" width="220" height="220"></iframe>