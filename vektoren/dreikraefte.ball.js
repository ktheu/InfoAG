class Ball {
  constructor() {

    this.pos = createVector(width/2, height/2);
    this.v = createVector(0,0);
    this.a = createVector(0,0)
    this.radius = 20;
  }

  act() {
    this.checkRand();
    this.move();
    this.display();
  }

  move() {
    this.v.add(this.a);
    this.pos.add(this.v);
    this.a.mult(0);
  }

  applyForce(force) {
    this.a.add(force);
  }

  display() {
    fill(128);
    strokeWeight(3);
    ellipseMode(RADIUS);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }


  checkRand() {
    let amLinkenRand = this.pos.x + this.radius >= width;
    let amRechtenRand = this.pos.x - this.radius <= 0;
    let amUnterenRand = this.pos.y + this.radius >= height;
    let amOberenRand = this.pos.y - this.radius <= 0;

    if (amLinkenRand) this.v.x = -abs(this.v.x);
    if (amRechtenRand) this.v.x = abs(this.v.x);
    if (amUnterenRand) this.v.y = -abs(this.v.y);
    if (amOberenRand) this.v.y = abs(this.v.y);
  }
}

