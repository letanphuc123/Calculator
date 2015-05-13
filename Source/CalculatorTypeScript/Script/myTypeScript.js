// main class
var Calculator = (function () {
    // constructor
    function Calculator(outputString, newNumber, flag) {
        this._outputString = outputString;
        this._newNumber = newNumber;
        this._flag = flag;
    }
    // functions
    Calculator.prototype.getResultOperation = function () {
    };
    Calculator.prototype.getResultOutput = function (btn) {
        return btn;
    };
    return Calculator;
})();
// enum
var ConstantVariable;
(function (ConstantVariable) {
    ConstantVariable[ConstantVariable["add"] = 1] = "add";
    ConstantVariable[ConstantVariable["sub"] = 2] = "sub";
    ConstantVariable[ConstantVariable["div"] = 3] = "div";
    ConstantVariable[ConstantVariable["mult"] = 4] = "mult";
})(ConstantVariable || (ConstantVariable = {}));
// implement function
window.onload = function () {
    var resultInformation = { _outputString: "0", _newNumber: true, _flag: null };
    var cal = new Calculator(resultInformation._outputString, resultInformation._newNumber, resultInformation._flag);
    $("#resultValue").val("0");
    $(".calbtnumber").click(function () {
        var _this = this;
        $("#resultValue").val(function (string) { return cal.getResultOutput($(_this).val()); });
    });
};
//# sourceMappingURL=myTypeScript.js.map