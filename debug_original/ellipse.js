class Ell extends Particle {

  show() {
    ellipse(this.x, this.y, this.s);
  }

  koll() {
    this.r = this.s / 2
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.vx *= -1;
    }
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.vy *= -1;
    }
  }

  act() {
    this.koll();
    this.move();
    this.show();
    return
  }
}