class Rec extends Particle {

  show() {
    rect(this.x, this.y, this.s, this.s);
  }

  koll() {
    if (this.x < 0 || this.x + this.s > width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y + this.s > height) {
      this.vy *= -1;
    }
  }

  kollO(other) {
    print("in kollO"+other.toString());
    let type = other.constructor.name;
    print("type" + type);
    let coll = false;
    if (type === 'Rec') {
      coll = collideRectRect(this.x, this.y, this.s, this.s, other.x, other.y, other.s, other.s);
    } else if (type === 'Ell') {
      coll = collideRectCircle(this.x, this.y, this.s, this.s, other.x, other.y, other.s);
    }
    if (coll) {
      this.vx *= -1;
      this.vy *= -1;
    }
    return coll;
  }



  act() {
    this.kollO();
/*    this.koll();
    this.move();
    this.show();*/
  }
}