class Ballon {
    constructor(img, y = 0) {
        this.y = y;
        this.img = img;
        this.x = width/2;
        this.next = null;
    }

    steige() {
        this.x = width/2 + 40*sin(radians(frameCount));
        this.y -=  0.8;
        this.display();
        this.ziehe();
        if (this.letzter().y < - this.letzter().img.height) this.y = height;
    }

    display() {
        image(this.img, this.x, this.y);
    }

    ziehe() {
        if (this.next != null) {
            this.next.y = this.y + this.img.height+10;
            this.next.x = this.x + 20*sin(radians(frameCount));
            this.next.display();
            this.next.ziehe();
        }
    }

    letzter() {
        if (this.next === null) return this;
        else return this.next.letzter();
    }

    haengeAn(b) {
        this.letzter().next = b;
    }
}
