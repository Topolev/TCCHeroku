"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Vladimir on 22.03.2017.
 */
var Point_1 = require("./Point");
var utilCanvas = require("./util-canvas");
var core_1 = require("@angular/core");
var ConfigCoordinatePanel_1 = require("./ConfigCoordinatePanel");
var CoordinatePlane = (function () {
    /**
     *
     * xOrigin; yOrigin - original coordinate on panel excluding scale, margins
     * xFact; yFact - coordinates with considering scale, margints
     * ConfigCoorfinatePanel
     * x0Offset  - point's distance with coordinates (0,0) relatively left border of workspace
     * y0Offset  - point's distance with coordinates (0,0) relatively top border of workspace
     * xStepGrid - step between intermediate axises within X-axis
     * yStepGrid - step between intermediate axises within Y-axis
     * */
    function CoordinatePlane(canvasMain, canvasBack, config) {
        if (config === void 0) { config = ConfigCoordinatePanel_1.defaultConfig; }
        var _this = this;
        this.maxScale = 5;
        this.minScale = 0.2;
        this.prevMouseDown = false;
        this.characteristics = [];
        this.mouseWheel = function (e) {
            e.stopPropagation();
            e.preventDefault();
            var delta = e.deltaY || e.detail || e.wheelDelta;
            if (delta < 0 && _this.config.scale < _this.maxScale)
                _this.config.scale = +(_this.config.scale + 0.1).toFixed(1);
            if (delta > 0 && _this.config.scale > _this.minScale)
                _this.config.scale = +(_this.config.scale - 0.1).toFixed(1);
            _this.render();
        };
        this.mouseDown = function (ev) {
            _this.xMouseOverPrev = ev.pageX - _this.canvasMain.offsetLeft;
            _this.yMouseOverPrev = ev.pageY - _this.canvasMain.offsetTop;
            _this.prevMouseDown = true;
        };
        this.mouseUp = function (ev) {
            _this.prevMouseDown = false;
        };
        this.mouseOver = function (ev) {
            var currentX = ev.offsetX;
            _this.render();
            if ((currentX > _this.config.marginHorizontal) && (currentX < (_this.width - _this.config.marginHorizontal))) {
                _this.drawVerticalLine(_this.ctxMain, currentX, "red");
                _this.renderTextAndFillBackground(_this.ctxMain, (_this.convertFactXIntoOrigin(currentX) / 1 | 0).toString(), currentX, _this.height - 20);
                _this.drawHorizontalLineForExpressionGraph(currentX);
            }
        };
        //create the workfield
        this.canvasMain = canvasMain;
        this.canvasBack = canvasBack;
        this.ctxMain = canvasMain.getContext("2d");
        this.ctxBack = canvasBack.getContext("2d");
        this.width = canvasMain.offsetWidth;
        this.height = canvasMain.offsetHeight;
        this.config = config;
        this.ctxMain.font = "14px Arial";
        this.canvasMain.addEventListener("wheel", this.mouseWheel);
        this.canvasMain.addEventListener("mousemove", this.mouseOver);
        //this.canvasMain.addEventListener("mousedown", this.mouseDown);
        //this.canvasMain.addEventListener("mouseup", this.mouseUp);
        this.drawWorkspace();
    }
    CoordinatePlane.prototype.addCharacteristic = function (characteristic) {
        this.characteristics.push(characteristic);
        this.render();
    };
    CoordinatePlane.prototype.addCharacteristics = function (characteristics) {
        this.characteristics = characteristics;
        this.render();
    };
    CoordinatePlane.prototype.updateAllCharacteristic = function (characteristics) {
        this.characteristics = characteristics;
        this.render();
    };
    CoordinatePlane.prototype.drawWorkspace = function () {
        this.clearWorkspace(this.ctxMain);
        this.drawAxises();
        //this.render();
        //this.drawBorderWorkspace();
    };
    CoordinatePlane.prototype.clearWorkspace = function (ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
    };
    CoordinatePlane.prototype.drawVerticalLine = function (ctx, x, color) {
        if (color === void 0) { color = "#000000"; }
        utilCanvas.drawLine(ctx, x, this.config.marginVertical, x, this.height - this.config.marginVertical, color);
    };
    CoordinatePlane.prototype.drawHorizontalLine = function (ctx, y, color) {
        if (color === void 0) { color = "#000000"; }
        utilCanvas.drawLine(ctx, this.config.marginHorizontal, y, this.width - this.config.marginHorizontal, y, color);
    };
    CoordinatePlane.prototype.drawAxises = function () {
        this.clearWorkspace(this.ctxBack);
        this.drawMainAxises();
        this.drawIntermidiateXAxises();
        this.drawItermidiateYAxises();
    };
    CoordinatePlane.prototype.drawMainAxises = function () {
        this.drawVerticalLine(this.ctxBack, this.xOriginToFact(0), this.config.colorMainAxis);
        this.drawHorizontalLine(this.ctxBack, this.yOriginToFact(0), this.config.colorMainAxis);
    };
    CoordinatePlane.prototype.drawIntermidiateXAxises = function () {
        this.ctxBack.font = "14px Arial";
        var totalAxis = (this.width - 2 * this.config.marginHorizontal) / (this.config.scale * this.config.xStepGrid);
        var intervalBetweenText = Math.ceil(totalAxis / this.config.maxNumberWithinX);
        var countAxisesBeforeX0 = this.config.x0Offset / this.config.xStepGrid | 0;
        var startX0Fact = this.xOriginToFact(0) - countAxisesBeforeX0 * this.config.xStepGrid * this.config.scale;
        for (var x = startX0Fact, i = 0; x < this.width - this.config.marginHorizontal; x += this.config.xStepGrid * this.config.scale, i++) {
            this.drawVerticalLine(this.ctxBack, x, this.config.colorIntermediateAxis);
            if (i % intervalBetweenText == 0) {
                var text = (-(countAxisesBeforeX0--) * this.config.xStepGrid).toString();
                var widthText = this.ctxBack.measureText(text).width;
                this.ctxBack.fillText(text, x - widthText / 2, this.height - this.config.marginVertical + 30);
            }
            else {
                countAxisesBeforeX0--;
            }
        }
    };
    CoordinatePlane.prototype.drawItermidiateYAxises = function () {
        var totalAxis = (this.height - 2 * this.config.marginVertical) / (this.config.scale * this.config.scaleYInit * this.config.yStepGrid);
        var intervalBetweenText = Math.ceil(totalAxis / this.config.maxNumberWithinY);
        var countAxisesBeforeY0 = (this.config.y0Offset / this.config.yStepGrid) | 0;
        var startY0 = this.height - (this.config.marginVertical + this.config.y0Offset * this.config.scale * this.config.scaleYInit - countAxisesBeforeY0 * this.config.yStepGrid * this.config.scale * this.config.scaleYInit);
        for (var y = startY0, i = 0; y > this.config.marginVertical; y -= this.config.yStepGrid * this.config.scale * this.config.scaleYInit, i++) {
            this.drawHorizontalLine(this.ctxBack, y, this.config.colorIntermediateAxis);
            if (i % intervalBetweenText == 0) {
                var text = (-(countAxisesBeforeY0--) * this.config.yStepGrid).toFixed(2).toString();
                this.ctxBack.fillText(text, 10, y + 6);
            }
            else {
                countAxisesBeforeY0--;
            }
        }
    };
    CoordinatePlane.prototype.drawHorizontalLineForExpressionGraph = function (x) {
        var xOrigin = this.convertFactXIntoOrigin(x);
        for (var _i = 0, _a = this.characteristics; _i < _a.length; _i++) {
            var characteristic = _a[_i];
            if (characteristic.visable) {
                for (var _b = 0, _c = characteristic.areas; _b < _c.length; _b++) {
                    var area = _c[_b];
                    switch (area.type) {
                        case 0: {
                            this.drawHorizonalLineForPoints(+xOrigin, area);
                            break;
                        }
                        case 1: {
                            var yOrigin = area.fn(xOrigin);
                            var yFact = this.yOriginToFact(yOrigin);
                            this.drawHorizontalLine(this.ctxMain, yFact, "red");
                            this.renderTextAndFillBackground(this.ctxMain, (yOrigin.toFixed(2)).toString(), 10, yFact);
                            break;
                        }
                        case 2: {
                            var yOrigin = +area.fn(xOrigin);
                            var yFact = this.yOriginToFact(yOrigin);
                            if (xOrigin > +area.variables['Isz']) {
                                this.drawHorizontalLine(this.ctxMain, yFact, "red");
                                this.renderTextAndFillBackground(this.ctxMain, (yOrigin.toFixed(2)).toString(), 10, yFact);
                            }
                            break;
                        }
                    }
                }
            }
        }
    };
    CoordinatePlane.prototype.drawHorizonalLineForPoints = function (xOrigin, area) {
        if ((+area.points[0].x < xOrigin) && (+area.points[area.points.length - 1].x > xOrigin)) {
            var prevPoint = area.points[0];
            var i = 0;
            while (prevPoint.x < xOrigin && i < area.points.length) {
                prevPoint = area.points[++i];
            }
            var fn = this.approximationByLine(area.points[i - 1], prevPoint);
            var yOrigin = fn(xOrigin);
            var yFact = this.yOriginToFact(yOrigin);
            this.drawHorizontalLine(this.ctxMain, yFact, "red");
            this.renderTextAndFillBackground(this.ctxMain, (yOrigin.toFixed(2)).toString(), 10, yFact);
        }
    };
    CoordinatePlane.prototype.approximationByLine = function (point1, point2) {
        var x1 = +point1.x, y1 = +point1.y;
        var x2 = +point2.x, y2 = +point2.y;
        var k = (y2 - y1) / (x2 - x1);
        var b = (y1 * x2 - x1 * y2) / (x2 - x1);
        return function (x) { return k * x + b; };
    };
    CoordinatePlane.prototype.renderTextAndFillBackground = function (ctx, text, x, y, color) {
        if (color === void 0) { color = "yellow"; }
        var widthText = ctx.measureText(text).width;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x - 3, y + 5, widthText + 3, -20);
        ctx.fillStyle = 'blue';
        ctx.fillText(text, x, y);
        console.log("render:", text);
    };
    CoordinatePlane.prototype.render = function (config) {
        if (config === void 0) { config = this.config; }
        this.config = config;
        this.clearWorkspace(this.ctxMain);
        this.drawAxises();
        for (var _i = 0, _a = this.characteristics; _i < _a.length; _i++) {
            var characteristic = _a[_i];
            if (characteristic.visable) {
                var lastPrevArea = null;
                for (var _b = 0, _c = characteristic.areas; _b < _c.length; _b++) {
                    var area = _c[_b];
                    switch (area.type) {
                        case 0: {
                            lastPrevArea = this.drawPointsCharacteristic(characteristic, area, lastPrevArea, characteristic.color);
                            break;
                        }
                        case 1: {
                            lastPrevArea = this.drawExpressionCharacteristic(characteristic, area, lastPrevArea, characteristic.color);
                            break;
                        }
                        case 2: {
                            lastPrevArea = this.drawIndependentCharacteristic(area, lastPrevArea, characteristic.color);
                            break;
                        }
                    }
                }
            }
        }
        this.ctxMain.clearRect(0, 0, this.width, this.config.marginVertical);
        this.ctxMain.clearRect(0, this.height - this.config.marginVertical, this.width, this.config.marginVertical);
    };
    CoordinatePlane.prototype.calcXStartForArea = function (area) {
        return (!!!area.xStart && String(area.xStart).trim() != '' && area.xStart > -this.config.x0Offset) ? +area.xStart : -this.config.x0Offset;
    };
    CoordinatePlane.prototype.drawIndependentCharacteristic = function (area, prevPointArea, color) {
        if (prevPointArea === void 0) { prevPointArea = null; }
        if (color === void 0) { color = '#000000'; }
        var tsz = +area.variables['tsz'];
        var Isz = +area.variables['Isz'];
        var yTopWorkspace = (this.height - 2 * this.config.marginVertical) / this.config.scale - this.config.y0Offset;
        var yTop = prevPointArea ? prevPointArea.y : yTopWorkspace;
        var xRightWorkspace = (this.width - 2 * this.config.marginHorizontal) / this.config.scale - this.config.x0Offset;
        var xRight = (area.xEnd != null && +area.xEnd < xRightWorkspace) ? +area.xEnd : xRightWorkspace;
        utilCanvas.drawLine(this.ctxMain, +this.xOriginToFact(Isz), this.yOriginToFact(yTop), +this.xOriginToFact(Isz), this.yOriginToFact(tsz), color);
        utilCanvas.drawLine(this.ctxMain, +this.xOriginToFact(Isz), +this.yOriginToFact(tsz), +this.xOriginToFact(xRight), +this.yOriginToFact(tsz), color);
        return new Point_1.default(+this.xOriginToFact(xRight), this.yOriginToFact(tsz));
    };
    CoordinatePlane.prototype.drawExpressionCharacteristic = function (characteristic, area, prevPointArea, color, step) {
        if (prevPointArea === void 0) { prevPointArea = null; }
        if (color === void 0) { color = '#000000'; }
        if (step === void 0) { step = 1; }
        var xPrev = this.calcXStartForArea(area);
        var yPrev = +area.fn(xPrev);
        var xEndWorkspace = (this.width - 2 * this.config.marginHorizontal) / this.config.scale - this.config.x0Offset;
        var xEnd = (area.xEnd != null && area.xEnd < xEndWorkspace) ? area.xEnd : xEndWorkspace;
        for (var i = xPrev + step; i < xEnd; i += step) {
            utilCanvas.drawLine(this.ctxMain, +this.xOriginToFact(xPrev), this.yOriginToFact(yPrev), this.xOriginToFact(xPrev + step), this.yOriginToFact(+area.fn(xPrev + step)), color);
            //spread characteristic
            if (characteristic.isSpread) {
                utilCanvas.drawLine(this.ctxMain, +this.xOriginToFact(xPrev), this.yOriginToFact(yPrev) * (1 + characteristic.spreadPlus / 100), this.xOriginToFact(xPrev + step), this.yOriginToFact(+area.fn(xPrev + step)) * (1 + characteristic.spreadPlus) / 100, color);
            }
            xPrev = xPrev + step;
            yPrev = +area.fn(xPrev);
        }
        return new Point_1.default(xPrev, yPrev);
    };
    CoordinatePlane.prototype.drawPointsCharacteristic = function (characteristic, area, prevPointArea, color) {
        if (prevPointArea === void 0) { prevPointArea = null; }
        if (color === void 0) { color = '#000000'; }
        console.log("draw points");
        var pointPrev = area.points[0];
        for (var i = 1; i < area.points.length; i++) {
            utilCanvas.drawLine(this.ctxMain, this.xOriginToFact(+pointPrev.x), this.yOriginToFact(+pointPrev.y), this.xOriginToFact(+area.points[i].x), this.yOriginToFact(+area.points[i].y), characteristic.color);
            pointPrev = area.points[i];
        }
        return pointPrev;
    };
    CoordinatePlane.prototype.convertFactYIntoOrigin = function (yFact) {
    };
    CoordinatePlane.prototype.xOriginToFact = function (xOrigin) {
        return this.config.marginHorizontal + (xOrigin + this.config.x0Offset) * this.config.scale * this.config.scaleXInit;
    };
    CoordinatePlane.prototype.yOriginToFact = function (yOrigin) {
        return this.height - this.config.marginVertical - (yOrigin + this.config.y0Offset) * this.config.scale * this.config.scaleYInit;
    };
    CoordinatePlane.prototype.convertFactXIntoOrigin = function (xFact) {
        return (xFact - this.config.marginHorizontal) / (this.config.scale * this.config.scaleXInit) - this.config.x0Offset;
    };
    CoordinatePlane.prototype.isYOnWorkspace = function (yOrigin) {
        return true;
    };
    return CoordinatePlane;
}());
CoordinatePlane = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HTMLCanvasElement, HTMLCanvasElement, ConfigCoordinatePanel_1.ConfigCoordinatePanel])
], CoordinatePlane);
exports.default = CoordinatePlane;
//# sourceMappingURL=CoordinatePlane.js.map