
/* 
    Model for a drawing application
    - Drawing : contains all drawn shapes
    - Shape : abstract class for shapes
    - Rectangle : a rectangle shape
    - Line : a line shape

    @param {number} originX - The X coordinate of the shape's origin
    @param {number} originY - The Y coordinate of the shape's origin
    @param {number} thickness - The thickness of the shape's border
    @param {string} color - The color of the shape's border (in hex format, e.g., '#FF0000' for red)
    @param {number} width - The width of the rectangle (only for Rectangle)
    @param {number} height - The height of the rectangle (only for Rectangle)
    @param {number} endX - The X coordinate of the line's end point (only for Line)
    @param {number} endY - The Y coordinate of the line's end point (only for Line)

    */
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
