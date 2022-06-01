class Text {
    constructor(str, x, y) {
        this.str = str;
        this.x = x;
        this.y = y;
        fill(0)
        textSize(24);
        textFont('Dinosaur');
        text(this.str, this.x, this.y);
    }
}