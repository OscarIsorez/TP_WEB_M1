/* 
  Contains the view part of the application (the canvas)
  It uses the model defined in model.js
  */
Rectangle.prototype.paint = function (ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.thickness;
  ctx.strokeRect(this.originX, this.originY, this.width, this.height);
};

Line.prototype.paint = function (ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.thickness;
  ctx.beginPath();
  ctx.moveTo(this.originX, this.originY);
  ctx.lineTo(this.endX, this.endY);
  ctx.stroke();
};

Drawing.prototype.paint = function (ctx, canvas) {
  // draw background
  ctx.fillStyle = '#F0F0F0'; // set canvas' background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // draw each shape
  this.shapes.forEach(element => element.paint(ctx));

};


function updateShapeList(index,shape) {
  document.getElementById("shapeList").insertAdjacentElement('beforeend', toDom(shape, index));
}

function toDom(shape, index) {
  if (shape && typeof shape === 'object') {
    var li = document.createElement('li');
    li.id = 'liRemoveShape' + index;

    var swatch = document.createElement('span');
    swatch.style.display = 'inline-block';
    swatch.style.width = '12px';
    swatch.style.height = '12px';
    swatch.style.marginRight = '6px';
    swatch.style.verticalAlign = 'middle';
    swatch.style.backgroundColor = shape.color || '#000';

    var text = document.createElement('span');
    text.textContent = (shape.constructor === Rectangle) ? 'Rectangle' : 'Line';

    var btn = document.createElement('button');
    btn.id = 'removeShape' + index;
    btn.textContent = 'Remove';

    li.appendChild(swatch);
    li.appendChild(text);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(btn);
    return li;
  }
  return document.createTextNode('');
}