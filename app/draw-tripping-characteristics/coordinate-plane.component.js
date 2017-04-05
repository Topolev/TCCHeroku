/**
 * Created by Vladimir on 22.03.2017.
 */
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
var core_1 = require("@angular/core");
var CoordinatePlane_1 = require("./coordinate-panel/CoordinatePlane");
var ConfigCoordinatePanel_1 = require("./coordinate-panel/ConfigCoordinatePanel");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var characteristic_component_1 = require("./modal/characteristic.component");
var characteristic_service_1 = require("./modal/characteristic.service");
var CoordinatePlaneComponent = (function () {
    function CoordinatePlaneComponent(modalService, chactericticService) {
        var _this = this;
        this.modalService = modalService;
        this.chactericticService = chactericticService;
        this.grid = null;
        this.characteristics = [];
        this.config = Object.assign({}, ConfigCoordinatePanel_1.defaultConfig);
        this.chactericticService.newCharacteristic$.subscribe(function (characteristic) {
            _this.setCharacteristic(characteristic);
        });
    }
    CoordinatePlaneComponent.prototype.setCharacteristic = function (newCharacteristic) {
        for (var _i = 0, _a = this.characteristics; _i < _a.length; _i++) {
            var characterisctic = _a[_i];
            if (characterisctic.id === newCharacteristic.id) {
                characterisctic = newCharacteristic;
                return;
            }
        }
        this.characteristics.push(newCharacteristic);
        this.grid.addCharacteristics(this.characteristics);
    };
    CoordinatePlaneComponent.prototype.ngAfterViewInit = function () {
        this.grid = new CoordinatePlane_1.default(this.canvas.nativeElement, this.canvasBack.nativeElement, this.config);
        //katex.render("t = \\frac{0.14k}{(I/I_{sz})^{0,02}-1}", this.test.nativeElement)
    };
    CoordinatePlaneComponent.prototype.addNewGraph = function () {
        console.log("Add");
    };
    CoordinatePlaneComponent.prototype.rerender = function () {
        this.grid.render(this.config);
    };
    CoordinatePlaneComponent.prototype.openModal = function (characterisctic) {
        this.modalService.open(characteristic_component_1.CharacteristicComponent, { windowClass: 'modal-create-new-graph' });
        this.chactericticService.setCurrentCharacteristic(characterisctic);
    };
    CoordinatePlaneComponent.prototype.changeVisable = function (characteristic) {
        characteristic.visable = !characteristic.visable;
        this.grid.addCharacteristics(this.characteristics);
    };
    CoordinatePlaneComponent.prototype.deleteCharacteristic = function (characteristic) {
        this.characteristics.splice(this.characteristics.indexOf(characteristic), 1);
    };
    return CoordinatePlaneComponent;
}());
__decorate([
    core_1.ViewChild('canvas'),
    __metadata("design:type", core_1.ElementRef)
], CoordinatePlaneComponent.prototype, "canvas", void 0);
__decorate([
    core_1.ViewChild('canvasBack'),
    __metadata("design:type", core_1.ElementRef)
], CoordinatePlaneComponent.prototype, "canvasBack", void 0);
CoordinatePlaneComponent = __decorate([
    core_1.Component({
        selector: 'coordinate-plane',
        templateUrl: './coordinate-plane.component.html',
        styleUrls: ['./coordinate-plane.component.css']
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
        characteristic_service_1.CharacteristicService])
], CoordinatePlaneComponent);
exports.CoordinatePlaneComponent = CoordinatePlaneComponent;
//# sourceMappingURL=coordinate-plane.component.js.map