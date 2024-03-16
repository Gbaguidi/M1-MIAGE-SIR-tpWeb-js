
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
};


//var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	var editingMode = { rect: 0, line: 1 };

	this.ctx = ctx;
	this.currentShape = null;
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	var lineWidthSpinner = document.getElementById('spinnerWidth');
	var colourPicker = document.getElementById('colour');
	var rectangleButton = document.getElementById('butRect');
	var lineButton = document.getElementById('butLine');

	lineWidthSpinner.addEventListener('change', function () {
		this.currLineWidth = lineWidthSpinner.value;
	}.bind(this));

	colourPicker.addEventListener('change', function () {
		this.currColour = colourPicker.value;
	}.bind(this));

	rectangleButton.addEventListener('change', function () {
		this.currEditingMode = editingMode.rect;
	}.bind(this));

	lineButton.addEventListener('change', function () {
		this.currEditingMode = editingMode.line;
	}.bind(this));

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function (dnd) {

		if (this.currEditingMode == editingMode.rect) {
			this.currentShape = new Rectangle(dnd.initX, dnd.initY, 0, 0, this.currLineWidth, this.currColour);
			dnd.update
		} else if (this.currEditingMode == editingMode.line) {
			this.currentShape = new Line(dnd.initX, dnd.initY, dnd.initX, dnd.initY, this.currLineWidth, this.currColour);

		}
	}.bind(this);



	this.onInteractionUpdate = function (dnd) {
		console.log("update")
		if (this.currentShape != null) {
			if (this.currEditingMode == editingMode.rect) {
				this.currentShape.width = dnd.finalX - this.currentShape.startX;
				this.currentShape.height = dnd.finalY - this.currentShape.startY;
			} else if (this.currEditingMode == editingMode.line) {
				this.currentShape.endX = dnd.finalX;
				this.currentShape.endY = dnd.finalY;
			}

			drawing.paint(ctx, canvas);
			this.currentShape.paint(this.ctx);
		}
	}.bind(this);

	this.onInteractionEnd = function (dnd) {

		if (this.currentShape != null) {
			if (this.currEditingMode == editingMode.rect) {
				this.currentShape.width = dnd.finalX - this.currentShape.startX;
				this.currentShape.height = dnd.finalY - this.currentShape.startY;
			} else if (this.currEditingMode == editingMode.line) {
				this.currentShape.endX = dnd.finalX;
				this.currentShape.endY = dnd.finalY;
			}
			this.currentShape.paint(this.ctx)
			drawing.addShape(this.currentShape);
			this.currentShape = null;
			drawing.paint(ctx, canvas);
			updateShapeList(drawing);
		}
	}.bind(this);
};