"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Area = (function () {
    function Area() {
        this.xStart = 0;
        this.xEnd = 0;
    }
    return Area;
}());
exports.Area = Area;
var VariableDescription = (function () {
    function VariableDescription() {
    }
    return VariableDescription;
}());
exports.VariableDescription = VariableDescription;
var AreaTemplate = (function () {
    function AreaTemplate() {
    }
    return AreaTemplate;
}());
exports.AreaTemplate = AreaTemplate;
exports.defaultAreaTemplates = [
    {
        id: 0,
        label: "По точкам",
        type: 0 /* POINTS */
    },
    {
        id: 1,
        label: "Независимая",
        type: 2 /* INDEPENDENT */,
        variableDescriptions: [{
                label: "Isz",
                labelForUser: "Пусковой ток",
            }, {
                label: "tsz",
                labelForUser: "Время срабатывания",
            }],
        fn: function (x) {
            var tsz = this.variables['tsz'];
            return tsz;
        }
    },
    {
        id: 2,
        label: "Нормально-инверсная (IEC)",
        type: 1 /* EXPRESSION */,
        variableDescriptions: [{
                label: "k",
                labelForUser: "Коэффициент k",
            }, {
                label: "Isz",
                labelForUser: "Пусковой ток",
            }],
        fn: function (x) {
            var k = this.variables['k'];
            var Isz = this.variables['Isz'];
            return k * 0.14 / (Math.pow(x / Isz, 0.02) - 1);
        }
    }
];
//# sourceMappingURL=area-template.js.map