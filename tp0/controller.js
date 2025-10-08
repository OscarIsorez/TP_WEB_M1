
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById("butRect").onclick = () => { this.currEditingMode = editingMode.rect; console.log("Rect mode activated") };
	document.getElementById("butLine").onclick = () => { this.currEditingMode = editingMode.line; console.log("Line mode activated") };

	document.getElementById("spinnerWidth").onchange = (e) => { this.currLineWidth = e.target.value; console.log("Line width changed to " + this.currLineWidth) };
	document.getElementById("colour").onchange = (e) => { this.currColour = e.target.value; console.log("Colour changed to " + this.currColour) };
	dnd = new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function(dnd){
			console.log("Interaction started");
			if(this.currEditingMode =  editingMode.line){
				this.currentShape = new Line(dnd.initialX, dnd.initialY, dnd.initialX, dnd.initialY, this.currLineWidth, this.currColour);
			}
			else if (this.currEditingMode = editingMode.rect){
				this.currentShape = new Rectangle(dnd.initialX, dnd.initialY,dnd.width,dnd.height, this.currLineWidth, this.currColour);

			}
			else{
				console.error("You must select either a Rectangle or a Line before drawing anything")
			}
		
	}.bind(this);

	this.onInteractionUpdate = function(dnd){
		console.log("Interaction updated");
		if(this.currEditingMode == editingMode.line){
			this.currentShape = new Line(dnd.initialX, dnd.initialY, dnd.finalX, dnd.finalY, this.currLineWidth, this.currColour);
			this.currentShape.paint(ctx);
			drawing.paint(ctx,canvas);
		}
		else if(this.currEditingMode == editingMode.rect){ 
			this.currentShape = new Rectangle(dnd.initialX, dnd.initialY, dnd.finalX - dnd.initialX, dnd.finalY - dnd.initialY, this.currLineWidth, this.currColour);
			this.currentShape.paint(ctx);

			drawing.paint(ctx,canvas);
		}
		else{
			console.error("You must select either a Rectangle or a Line before drawing anything")
		}
		

	}.bind(this);

	this.onInteractionEnd = function(dnd){
		console.log("Interaction ended");
		if(this.currEditingMode == editingMode.line){
			let line = new Line(this.initialX, this.initialY, this.currLineWidth, this.currColour);
			drawing.shapes.push(line);
			drawing.paint(ctx,canvas);
		}
		else if(this.currEditingMode == editingMode.rect){
			let rect = new Rectangle(this.initialX, this.initialY, this.finalX - this.initialX, this.finalY - this.initialY, this.currLineWidth, this.currColour);
			drawing.shapes.push(rect);
		
			

		}
		else{
			console.error("You must select either a Rectangle or a Line before drawing anything")
		}
		this.currentShape = 0;


	}.bind(this);
};


