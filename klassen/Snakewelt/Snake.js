class Snake {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.px = null;   // previous x
    this.py = null;   // previous y
    this.sn = null;   // snake-nachfolger
  }

  act() {
    this.move();
    this.display();
  }

  display() {
    strokeWeight(2);
    stroke(0);
    fill('#BC2D19');
    rect(this.x, this.y, GROESSE, GROESSE);
    if (this.sn != null) this.sn.display();
  }

  move() {
    if (frameCount % WARTE == 0) {
      this.px = this.x;
      this.py = this.y;
      this.x += this.vx
      this.y += this.vy
      this.zieheNachfolger();
    }
  }

  zieheNachfolger() {
    if (this.sn != null) {
      this.sn.px = this.sn.x;
      this.sn.py = this.sn.y;
      this.sn.x = this.px;
      this.sn.y = this.py;
      this.sn.zieheNachfolger();
    }
  }

  nachOben() {
    this.vx = 0;
    this.vy = -GROESSE;
  }

  nachUnten() {
    this.vx = 0;
    this.vy = GROESSE;
  }

  nachRechts() {
    this.vx = GROESSE;
    this.vy = 0;
  }

  nachLinks() {
    this.vx = -GROESSE;
    this.vy = 0;
  }

  addSnake() {
    if (this.sn == null) this.sn = new Snake(this.px, this.py);
    else this.sn.addSnake();
  }
}
