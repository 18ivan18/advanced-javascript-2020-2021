function Point(x, y) {
    [this.x, this.y] = [x, y];
    // this.getDistance = function(point2) {
    //     return Math.sqrt((this.x - point2.x) * (this.x - point2.x) + (this.y - point2.y) * (this.y - point2.y));
    // }   
}

Point.prototype.getDistance = function(point2) {
        return Math.sqrt((this.x - point2.x) * (this.x - point2.x) + (this.y - point2.y) * (this.y - point2.y));
    }

const main = () => {
    const p1 = new Point(3, 4);
    const p2 = new Point(1, 1);
    console.log(p1.getDistance(p2));
}

main();