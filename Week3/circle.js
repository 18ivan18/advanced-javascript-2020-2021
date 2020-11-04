function Point(x, y) {
    if(this === undefined) {
        throw "Called with no this";
    }
    [this.x, this.y] = [x, y];
    this.getDistance = function(point2) {
        return Math.sqrt((this.x - point2.x) * (this.x - point2.x) + (this.y - point2.y) * (this.y - point2.y));
    }   
}

function Circle(x, y, r) {
// getCircumference() - връща обиколката на кръга
// getArea() - връща лицето на кръга
// intersects(circle2) - проверява дали нашият кръг има сечение с подадения circle2
    if(this === undefined) {
        throw "Called with no this";
    }

    Point.call(this, x, y);
    this.r = r;  
}
Circle.prototype.__proto__ = Point.prototype;
Circle.prototype.getCircumference = function() {
    return 2 * Math.PI * this.r;
}

Circle.prototype.getArea = function() {
    return Math.PI * this.r * this.r;
}

Circle.prototype.intersects = function(circle2) {
    return this.getDistance(circle2) <= this.r + circle2.r;
}


const main = () => {
    console.log("Circle...");
    const c1 = new Circle(1, 1, 5);
    const c2 = new Circle(1, 12, 6);
    console.log(c1.getDistance(c2));
    console.log(c1.getArea(c2));
    console.log(c1.getCircumference(c2));
    console.log(c1.intersects(c2));
}

main();