"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var area_template_1 = require("./area-template");
var BuilderArea = (function () {
    function BuilderArea() {
    }
    BuilderArea.prototype.buildAreaByTemplate = function (areaTemplate) {
        var area = new area_template_1.Area();
        area.xEnd = null;
        area.xStart = null;
        area.areaTemplate = areaTemplate;
        area.type = areaTemplate.type;
        if (area.type == 0) {
            area.points = [];
            area.pointsTemplate = null;
        }
        if (area.type == 1 || area.type == 2) {
            area.fn = areaTemplate.fn;
            if (areaTemplate.variableDescriptions) {
                area.variables = [];
                for (var _i = 0, _a = areaTemplate.variableDescriptions; _i < _a.length; _i++) {
                    var variable = _a[_i];
                    area.variables[variable.label] = null;
                }
            }
        }
        return area;
    };
    return BuilderArea;
}());
exports.BuilderArea = BuilderArea;
//# sourceMappingURL=area-builder.js.map