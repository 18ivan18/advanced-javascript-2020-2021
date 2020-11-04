function Point(x, y) {
    if(this === undefined) {
        throw "Called with no this";
    }
    [this.x, this.y] = [x, y]; 
}

Point.prototype.getDistance = function(point2) {
    return Math.sqrt((this.x - point2.x) * (this.x - point2.x) + (this.y - point2.y) * (this.y - point2.y));
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
    return a * b;
}

Rectangle.prototype.getLengthOfDiagonals = function() {
    const diag = Math.sqrt(a * a + b* b); 
    return [diag, diag];
}

Rectangle.prototype.getBiggestCircle = function() {
    const upRight = new Point(this.x + a, this.y + b);
    const middlePoint = new Point((this.x + upRight.x) / 2, (this.y + upRight.y) / 2);
    return new Circle(middlePoint.x, middlePoint.y, this.a < this.b ? a : b);
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

function RectanglePrism(x, y, a, b, c) { 
    
    if(this === undefined) {
    throw "Called with no this";
    }

    Rectangle.call(this, x, y, a, b);
    this.c = c;
}

RectanglePrism.prototype.getVolume = function () {
    return this.a * this.b * this.c;
}

Circle.prototype.__proto__ = Point.prototype;
Rectangle.prototype.__proto__ = Point.prototype;
RectanglePrism.prototype.__proto__ = Rectangle.prototype;

const main = () => {
    console.log("Rectangle Prism...");
    const r1 = new RectanglePrism(1, 1, 3, 4, 5);
    console.log(r1.getVolume());
}

main();