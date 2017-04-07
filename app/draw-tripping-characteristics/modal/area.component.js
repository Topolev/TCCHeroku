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
var area_template_1 = require("../coordinate-panel/area-template");
var area_builder_1 = require("../coordinate-panel/area-builder");
var Point_1 = require("../coordinate-panel/Point");
var PointsTemplate_1 = require("../coordinate-panel/PointsTemplate");
var CreateNewArea = (function () {
    function CreateNewArea(modalService) {
        this.modalService = modalService;
        this.selectedPointsTemplate = null;
        this.isEditMode = false;
        this.onNewArea = new core_1.EventEmitter();
        this.onEditArea = new core_1.EventEmitter();
        this.areaTemplates = area_template_1.defaultAreaTemplates;
        this.pointsTemplates = PointsTemplate_1.defaultPointsTemplate;
        this.builderArea = new area_builder_1.BuilderArea();
    }
    CreateNewArea.prototype.buildArea = function () {
        this.currentArea = this.builderArea.buildAreaByTemplate(this.selectedAreaTemplate);
        this.currentArea.id = this.idArea;
    };
    CreateNewArea.prototype.buildPointsTemplate = function () {
        if (this.selectedPointsTemplate != null) {
            this.currentArea.points = this.selectedPointsTemplate.points.map(function (point) { return new Point_1.default(point.x, point.y); });
        }
        else {
            this.currentArea.points = [];
        }
    };
    CreateNewArea.prototype.findAreaTemplateById = function (id) {
        for (var _i = 0, defaultAreaTemplates_1 = area_template_1.defaultAreaTemplates; _i < defaultAreaTemplates_1.length; _i++) {
            var areaTemplate = defaultAreaTemplates_1[_i];
            if (areaTemplate.id === id)
                return areaTemplate;
        }
        return null;
    };
    CreateNewArea.prototype.addPoint = function () {
        console.log("add point");
        this.currentArea.points.push(new Point_1.default());
    };
    CreateNewArea.prototype.deletePoint = function (point) {
        this.currentArea.points.splice(this.currentArea.points.indexOf(point), 1);
    };
    CreateNewArea.prototype.open = function (area) {
        var _this = this;
        if (area) {
            this.isEditMode = true;
            this.label = area.label;
            this.idArea = area.id;
            this.currentArea = area;
            this.selectedAreaTemplate = area.areaTemplate;
            this.selectedPointsTemplate = area.pointsTemplate;
        }
        else {
            this.idArea = Date.now();
            this.isEditMode = false;
        }
        this.modalService.open(this.content).result.then(function () {
            _this.currentArea.label = _this.label;
            _this.currentArea.areaTemplate = _this.selectedAreaTemplate;
            _this.currentArea.pointsTemplate = _this.selectedPointsTemplate;
            if (_this.isEditMode) {
                _this.onEditArea.emit(_this.currentArea);
            }
            else {
                _this.onNewArea.emit(_this.currentArea);
            }
            _this.clearAllData();
        }, function () {
            _this.clearAllData();
        });
    };
    CreateNewArea.prototype.clearAllData = function () {
        this.selectedAreaTemplate = null;
        this.label = "";
        this.currentArea = null;
        jQuery('body').addClass('modal-open');
    };
    return CreateNewArea;
}());
__decorate([
    core_1.ViewChild("content"),
    __metadata("design:type", core_1.ElementRef)
], CreateNewArea.prototype, "content", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CreateNewArea.prototype, "onNewArea", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CreateNewArea.prototype, "onEditArea", void 0);
CreateNewArea = __decorate([
    core_1.Component({
        selector: 'create-new-area-modal',
        templateUrl: './area.component.html',
        styleUrls: ['./area.component.css']
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
], CreateNewArea);
exports.CreateNewArea = CreateNewArea;
//# sourceMappingURL=area.component.js.map