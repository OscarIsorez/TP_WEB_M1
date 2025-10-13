
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing() {
    this.shapes = new Map()

}

function Shape(thickness, color, originX, originY) {
    this.thickness = thickness
    this.color = color
    this.originX = originX
    this.originY = originY



}

function Rectangle(originX, originY, width, height, thickness, color) {
    this.width = width
    this.height = height

    Shape.call(this, thickness, color, originX, originY)
}


function Line(originX, originY, thickness, color, endX, endY) {
    Shape.call(this, thickness, color, originX, originY)
    this.endX = endX
    this.endY = endY

}
