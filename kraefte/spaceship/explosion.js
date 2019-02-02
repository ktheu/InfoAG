class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 0;
    }

    display() {
        if (this.index < 81) {
            imageMode(CENTER);
            image(expImg[this.index], this.x, this.y);
            this.index++;
        }
    }
}