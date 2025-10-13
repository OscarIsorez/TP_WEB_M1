
var editingMode = { rect: 0, line: 1 };



function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById("butRect").addEventListener('click', function () {
		this.currEditingMode = editingMode.rect;
	}.bind(this));

	document.getElementById("butLine").addEventListener('click', function () {
		this.currEditingMode = editingMode.line;
	}.bind(this));


	// <input id="spinnerWidth" type="number" min="1" max="50" step="1" value="5" size="4">
	// 		<input id="colour" type="color"></input>
	document.getElementById("spinnerWidth").addEventListener('change', function (evt) {
		this.currLineWidth = parseInt(evt.target.value);
	}.bind(this));

	document.getElementById("colour").addEventListener('change', function (evt) {
		this.currColour = evt.target.value;
	}.bind(this));

	// Créez ici une instance de DnD
	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd 
	this.onInteractionStart = function (dnd) {
		console.log("initX", dnd.initialX, "initY", dnd.initialY, "fX", dnd.finalX, "fY", dnd.finalY)
		if (this.currentShape == 0) {
			if (this.currEditingMode == editingMode.line) {
				this.currentShape = new Line(dnd.initialX, dnd.initialY, this.currLineWidth, this.currColour, dnd.initialX, dnd.initialY)
			}
			else if (this.currEditingMode == editingMode.rect) {
				this.currentShape = new Rectangle(dnd.initialX, dnd.initialY, 0, 0, this.currLineWidth, this.currColour)
			}
			else {
				console.error("You must select either a Rectangle or a Line before drawing anything")
			}
		}
	}.bind(this);

	this.onInteractionUpdate = function (dnd) {
		console.log("initX", dnd.initialX, "initY", dnd.initialY, "fX", dnd.finalX, "fY", dnd.finalY)
		if (this.currentShape != 0) {
			if (this.currEditingMode == editingMode.line) {
				this.currentShape.endX = dnd.finalX
				this.currentShape.endY = dnd.finalY
			}
			else if (this.currEditingMode == editingMode.rect) {
				this.currentShape.width = dnd.finalX - dnd.initialX
				this.currentShape.height = dnd.finalY - dnd.initialY
			}
			else {
				console.error("You must select either a Rectangle or a Line before drawing anything")
			}
			drawing.paint(ctx, canvas)
			this.currentShape.paint(ctx)
		}



	}.bind(this);

	this.onInteractionEnd = function (dnd) {
		if (this.currentShape != 0) {
			// Add a unique ID to the shape and add it to the drawing
			this.currentShape.id = Date.now(); // Simple ID generation
			drawing.shapes.set(this.currentShape.id, this.currentShape);
		}
		this.currentShape = 0
		drawing.paint(ctx, canvas)
	}.bind(this);
};


