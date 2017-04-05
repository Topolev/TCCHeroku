"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
}
exports.clearCanvas = clearCanvas;
;
function drawFillRectangle(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.rect(x1, y1, x2, y2);
    ctx.fillStyle = color;
    ctx.fill();
}
exports.drawFillRectangle = drawFillRectangle;
;
function drawOutlineRectangle(ctx, x1, y1, x2, y2, color) {
    ctx.fillStyle = color;
    ctx.strokeRect(x1, y1, x2, y2);
}
exports.drawOutlineRectangle = drawOutlineRectangle;
;
function drawOutlineRectangleByPoints(ctx, point1, point2, color) {
    drawOutlineRectangle(ctx, point1.x, point1.y, point2.x, point2.y, color);
}
exports.drawOutlineRectangleByPoints = drawOutlineRectangleByPoints;
;
function drawLine(ctx, x1, y1, x2, y2, colorLine) {
    if (colorLine === void 0) { colorLine = "#000000"; }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = colorLine;
    ctx.stroke();
}
exports.drawLine = drawLine;
//# sourceMappingURL=util-canvas.js.map