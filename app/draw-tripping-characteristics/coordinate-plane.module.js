"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var coordinate_plane_component_1 = require("./coordinate-plane.component");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var characteristic_component_1 = require("./modal/characteristic.component");
var area_component_1 = require("./modal/area.component");
var characteristic_service_1 = require("./modal/characteristic.service");
var CoordinatePlaneModule = (function () {
    function CoordinatePlaneModule() {
    }
    return CoordinatePlaneModule;
}());
CoordinatePlaneModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            ng_bootstrap_1.NgbModule
        ],
        declarations: [
            coordinate_plane_component_1.CoordinatePlaneComponent,
            characteristic_component_1.CharacteristicComponent,
            area_component_1.CreateNewArea
        ],
        entryComponents: [
            characteristic_component_1.CharacteristicComponent
        ],
        exports: [
            coordinate_plane_component_1.CoordinatePlaneComponent
        ],
        providers: [
            characteristic_service_1.CharacteristicService
        ]
    })
], CoordinatePlaneModule);
exports.CoordinatePlaneModule = CoordinatePlaneModule;
//# sourceMappingURL=coordinate-plane.module.js.map