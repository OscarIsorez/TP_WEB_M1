Rectangle.prototype.paint = function(ctx) {
    console.log("Rectangle paint")
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.rect(this.originX, this.originY, this.width, this.height)
  };
  
  Line.prototype.paint = function(ctx) {
    console.log("Line paint")
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.beginPath();
    ctx.moveTo(this.originX, this.originY);
    ctx.lineTo(this.finalX, this.finalY);
    ctx.stroke();
  };    
  
  Drawing.prototype.paint = function(ctx, canvas) {
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //   this.shapes =  new Map()
    this.shapes.forEach(function(shape) {
      shape.paint(ctx);
    })
  };
  