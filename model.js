
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing() {
    this.shapes = [];

    this.addShape = function (shape) {
        this.shapes.push(shape);
    }

    this.removeShape = function (shape) {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }
};
function Shape(startX, startY, thickness, color) {
    this.startX = startX;
    this.startY = startY;
    this.color = color;
    this.thickness = thickness;
};

function Rectangle(startX, startY, width, height, thickness, color) {
    Shape.call(this, startX, startY, thickness, color);
    this.startX = startX;
    this.startY = startY;
    this.width = width;
    this.height = height;
};
Rectangle.prototype = new Shape();

function Line(startX, startY, endX, endY, thickness, color) {
    Shape.call(this, startX, startY, thickness, color);
    this.endX = endX;
    this.endY = endY;
};
Line.prototype = new Shape();


