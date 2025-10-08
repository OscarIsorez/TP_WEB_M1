
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing() {
    this.shapes =  new Map()

}

function Shape(initialX,initialY,thickness, color ){
    this.initialX = initialX
    this.initialY = initialY
    this.thickness = thickness
    this.color = color
    


}

function Rectangle(originX, originY, width, height, thickness, color) {
    this.width = width
    this.height = height

    Shape.call(this,originX,originY,thickness, color)

    
    

}


function Line(originX, originY, finalX, finalY, thickness, color) {
    this.finalX =  finalX
    this.finalY = finalY

    Shape.call(this,originX,originY,thickness, color)
    
}
