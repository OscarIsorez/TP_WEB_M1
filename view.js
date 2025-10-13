Rectangle.prototype.paint = function (ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.thickness;
  ctx.strokeRect(this.originX, this.originY, this.width, this.height);
};

Line.prototype.paint = function (ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.thickness;
  //TODO Manager color
  ctx.beginPath();
  ctx.moveTo(this.originX, this.originY);
  ctx.lineTo(this.endX, this.endY);
  ctx.stroke();
};

Drawing.prototype.paint = function (ctx) {
  //console.log(this.getForms());
  ctx.fillStyle = '#F0F0F0'; // set canvas' background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  this.shapes.forEach(element => element.paint(ctx));

};
