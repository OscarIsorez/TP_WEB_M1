 
var editingMode = { rect: 0, line: 1 };

/* 
	class controller(Pencil)

	manage interactions between the user and the application
	- listen to widgets events to update the current drawing attributes (colour, line width, shape)
	- listen to mouse events on the canvas to draw shapes
	- use an instance of DnD to manage mouse events
	- use an instance of Drawing to store and render shapes

	@properties
	- currEditingMode : current shape to draw (rectangle or line)
	- currLineWidth : current line width
	- currColour : current colour in hexadecimal format
	- currentShape : shape being currently drawn (0 if none) 

	use models defined in model.js :
	- Drawing : contains all drawn shapes
	- Shape : abstract class for shapes
	- Rectangle : a rectangle shape
	- Line : a line shape

	*/

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
			var completedShape = this.currentShape;
			completedShape.id = Date.now(); // Simple ID generation
			drawing.shapes.set(completedShape.id, completedShape);
			drawing.paint(ctx, canvas);

			updateShapeList(completedShape.id, completedShape);
			var removeBtn = document.getElementById("removeShape" + completedShape.id);
			if (removeBtn) {
				removeBtn.addEventListener('click', function (evt) {
					remove(drawing, completedShape.id, ctx, canvas);
				});
			}
			this.currentShape = 0;
		}
	}.bind(this);
};


function remove(drawing,shapeId,ctx,canvas) {
	if (typeof ctx === 'undefined') ctx = window.ctx || null;
	if (typeof canvas === 'undefined') canvas = window.canvas || null;

	drawing.shapes.delete(parseInt(shapeId));
	var li = document.getElementById("liRemoveShape" + shapeId);
	if (li) li.remove();

	if (ctx && canvas) drawing.paint(ctx, canvas);
}