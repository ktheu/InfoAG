class Ball {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
    this.radius = 20;
  }

  act() {
    this.checkTasten();
    this.move();
    this.correctPosition();
    this.display();
  }

  move() {
    if (!this.onGround()) {
      this.applyForce(gravitation);
    } else {
      this.v.y = 0;
    }
    if (this.onGround() && !tRight && !tLeft) this.v.x = 0;
    this.v.add(this.a);
    this.pos.add(this.v);
    this.a.mult(0);
  }

  correctPosition() {
    if (this.pos.y + this.radius > height) this.pos.y = height - this.radius;
  }

  checkTasten() {
    if (tRight) this.v.x = 5.0;
    if (tLeft) this.v.x = -5.0;
    if (tSpace && !tSpacelock && this.onGround()) {
      this.applyForce(jump);
      tSpacelock = true;
    }
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

  onGround() {
    return this.pos.y >= height - this.radius;
  }
}

