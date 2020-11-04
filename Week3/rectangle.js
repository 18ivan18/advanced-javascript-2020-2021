function Point(x, y) {
    if(this === undefined) {
        throw "Called with no this";
    }
    [this.x, this.y] = [x, y];
    this.getDistance = function(point2) {
        return Math.sqrt((this.x - point2.x) * (this.x - point2.x) + (this.y - point2.y) * (this.y - point2.y));
    }   
}

function Rectangle(x, y, a, b) {
// getPerimeter() - връща периметъра на правоъгълника
// getArea() - връща лицето на правоъгълника
// getLengthOfDiagonals() - връща масив от дължините на двата диагонала
// getBiggestCircle() - връща кръга с най-голям възможен радиус и с начало центъра на правоъгълника
    if(this === undefined) {
        throw "Called with no this";
    }

    Point.call(this, x, y);
    [this.a, this.b] = [a, b];
}


Rectangle.prototype.getPerimeter = function() {
    return 2 * (this.a + this.b);
}

Rectangle.prototype.getArea = function () {
    return this.a * this.b;
}

Rectangle.prototype.getLengthOfDiagonals = function() {
    const diag = Math.sqrt(this.a * this.a + this.b * this.b); 
    return [diag, diag];
}

Rectangle.prototype.getBiggestCircle = function() {
    const upRight = new Point(this.x + this.a, this.y + this.b);
    const middlePoint = new Point((this.x + upRight.x) / 2, (this.y + upRight.y) / 2);
    return new Circle(middlePoint.x, middlePoint.y, this.a < this.b ? this.a : this.b);
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

Circle.prototype.getCircumference = function() {
    return 2 * Math.PI * this.r;
}

Circle.prototype.getArea = function() {
    return Math.PI * this.r * this.r;
}

Circle.prototype.intersects = function(circle2) {
    return this.getDistance(circle2) <= this.r + circle2.r;
}

Circle.prototype.__proto__ = Point.prototype;
Rectangle.prototype.__proto__ = Point.prototype;

const main = () => {
    console.log("Rectangle...");
    const r1 = new Rectangle(1, 1, 3, 4);
    const r2 = new Rectangle(1, 12, 2, 3);
    console.log(r1.getPerimeter());
    console.log(r1.getArea());
    console.log(r1.getLengthOfDiagonals());
    console.log(r1.getBiggestCircle(r2));
}

main();