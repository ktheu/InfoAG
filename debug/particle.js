class Particle {

  constructor(x = random(20, width - 20), y = random(20, height - 20)) {
    this.x = x;
    this.y = y;
    this.vx = random(2, 3);
    this.vy = random(2, 3);
    this.s = random(5, 20);
    this.dir();
  }

  dir() {
    let rx = random();
    let ry = random();
    if (rx > 0.5) {
      this.vx *= -1;
    }
    if (ry > 0.5) {
      this.vy *= -1;
    }
  }


  move() {
    this.vx *= 0.99;
    this.vy *= 0.99;
    this.x += this.vx;
    this.y += this.vy;
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }
}