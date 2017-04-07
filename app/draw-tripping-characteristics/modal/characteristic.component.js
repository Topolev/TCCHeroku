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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var CoordinatePlane_1 = require("../coordinate-panel/CoordinatePlane");
var characteristic_service_1 = require("./characteristic.service");
var Characteristic_1 = require("../coordinate-panel/Characteristic");
var VoltageSteps_1 = require("../coordinate-panel/VoltageSteps");
var CharacteristicComponent = (function () {
    function CharacteristicComponent(modalService, activeModal, characteristicService) {
        var _this = this;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.characteristicService = characteristicService;
        this.characteristic = new Characteristic_1.Characteristic();
        this.grid = null;
        this.voltageSteps = VoltageSteps_1.defaultVoltageSteps;
        characteristicService.currentCharacteristic$.subscribe(function (characteristic) {
            _this.characteristic = characteristic ? characteristic : new Characteristic_1.Characteristic();
            _this.idCharacteristic = characteristic ? characteristic.id : Date.now();
            _this.characteristic.voltageStep = characteristic ? characteristic.voltageStep : _this.voltageSteps[0].value;
        });
    }
    CharacteristicComponent.prototype.ngOnInit = function () {
    };
    CharacteristicComponent.prototype.openModal = function () {
        this.modalService.open(this.contentModal).result.then(function () {
        });
    };
    CharacteristicComponent.prototype.closeModal = function () {
        this.activeModal.close();
    };
    CharacteristicComponent.prototype.saveCharacteristic = function () {
        this.characteristic.id = this.idCharacteristic;
        this.characteristicService.setNewCharacteristic(this.characteristic);
        this.activeModal.close();
    };
    CharacteristicComponent.prototype.ngAfterViewInit = function () {
        this.grid = new CoordinatePlane_1.default(this.canvas.nativeElement, this.canvasBack.nativeElement, this.config);
        this.grid.updateAllCharacteristic([this.characteristic]);
    };
    CharacteristicComponent.prototype.deleteArea = function (area) {
        this.characteristic.areas.splice(this.characteristic.areas.indexOf(area), 1);
    };
    CharacteristicComponent.prototype.createNewArea = function (area) {
        this.characteristic.areas.push(area);
        this.grid.updateAllCharacteristic([this.characteristic]);
        //jQuery('body').addClass('modal-open');
    };
    CharacteristicComponent.prototype.editExistArea = function (editArea) {
        var areas = this.characteristic.areas;
        for (var i in areas) {
            if (areas[i].id === editArea.id) {
                areas[i] = editArea;
                break;
            }
        }
        this.grid.updateAllCharacteristic([this.characteristic]);
        //jQuery('body').addClass('modal-open');
    };
    return CharacteristicComponent;
}());
__decorate([
    core_1.ViewChild('canvas'),
    __metadata("design:type", core_1.ElementRef)
], CharacteristicComponent.prototype, "canvas", void 0);
__decorate([
    core_1.ViewChild('canvasBack'),
    __metadata("design:type", core_1.ElementRef)
], CharacteristicComponent.prototype, "canvasBack", void 0);
__decorate([
    core_1.ViewChild("contentModal"),
    __metadata("design:type", core_1.ElementRef)
], CharacteristicComponent.prototype, "contentModal", void 0);
CharacteristicComponent = __decorate([
    core_1.Component({
        selector: 'ngbd-modal-basic',
        templateUrl: './characteristic.component.html',
        styleUrls: ['./characteristic.component.css']
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
        ng_bootstrap_1.NgbActiveModal,
        characteristic_service_1.CharacteristicService])
], CharacteristicComponent);
exports.CharacteristicComponent = CharacteristicComponent;
//# sourceMappingURL=characteristic.component.js.map