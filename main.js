
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = 800
canvas.height = 600

// Code temporaire pour tester le DnD
// new DnD(canvas);
ctx.fillStyle = '#F0F0F0'; // set canvas' background color
ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
/////

// Code temporaire pour tester l'affiche de la vue
// var rec = new Rectangle(100, 120, 200, 150, 10, '#FF0000');
// rec.paint(ctx);
// var ligne = new Line(400, 300, 5, '#0000FF', 600, 450);
// ligne.paint(ctx);    
// tester également Dessin.
////

// Code final à utiliser pour manipuler Pencil.
var drawing = new Drawing()
var pencil = new Pencil(ctx, drawing, canvas);
drawing.paint(ctx, canvas);

