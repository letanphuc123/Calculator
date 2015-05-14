/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
// main class
var Calculator = (function () {
    // constructor
    function Calculator(outputString, newNumber, flag, result, resultToken) {
        this._outputString = outputString;
        this._newNumber = newNumber;
        this._flag = flag;
        this._result = result;
        this._resultToken = resultToken;
        this._outputTotal = 0;
    }
    // functions
    Calculator.prototype.getResultOperation = function (operation) {
        switch (operation) {
            case 0 /* add */:
                this._resultToken += this._result + " " + "+" + "  ";
                this._flag = 1 /* isPlus */;
                this._outputTotal += this._result;
                break;
            case 1 /* sub */:
                this._resultToken += this._result + " " + "-" + "  ";
                this._flag = 2 /* isSub */;
                this._outputTotal -= this._result;
                break;
            case 2 /* div */:
                this._resultToken += this._result + " " + "/" + "  ";
                this._flag = 3 /* isDiv */;
                this._outputTotal = this._outputTotal / this._result;
                break;
                ;
            case 3 /* mult */:
                this._resultToken += this._result + " " + "*" + "  ";
                this._flag = 4 /* isMul */;
                this._outputTotal = this._outputTotal * this._result;
                break;
        }
        var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
        return resultOperation;
    };
    Calculator.prototype.getResultOutput = function (btn) {
        this._result = parseFloat(btn);
        this._flag = 0 /* isNumber */;
        return btn;
    };
    Calculator.prototype.clearResult = function () {
        this._flag = 0 /* isNumber */;
        this._newNumber = true;
        this._outputString = "0";
        this._outputTotal = 0;
        this._result = 0;
        this._resultToken = "";
        var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
        return resultOperation;
    };
    return Calculator;
})();
// enum
var ConstantVariable;
(function (ConstantVariable) {
    ConstantVariable[ConstantVariable["add"] = 0] = "add";
    ConstantVariable[ConstantVariable["sub"] = 1] = "sub";
    ConstantVariable[ConstantVariable["div"] = 2] = "div";
    ConstantVariable[ConstantVariable["mult"] = 3] = "mult";
})(ConstantVariable || (ConstantVariable = {}));
;
var ConstantFlag;
(function (ConstantFlag) {
    ConstantFlag[ConstantFlag["isNumber"] = 0] = "isNumber";
    ConstantFlag[ConstantFlag["isPlus"] = 1] = "isPlus";
    ConstantFlag[ConstantFlag["isSub"] = 2] = "isSub";
    ConstantFlag[ConstantFlag["isDiv"] = 3] = "isDiv";
    ConstantFlag[ConstantFlag["isMul"] = 4] = "isMul";
})(ConstantFlag || (ConstantFlag = {}));
;
// implement function
window.onload = function () {
    var resultInformation = { _outputString: "0", _newNumber: true, _flag: 0 /* isNumber */, _result: 0, _resultToken: "" };
    var cal = new Calculator(resultInformation._outputString, resultInformation._newNumber, resultInformation._flag, resultInformation._result, resultInformation._resultToken);
    $("#resultValue").val(cal._result.toString());
    $(".calbtnumber").click(function () {
        var _this = this;
        $("#resultValue").val(function (string) { return cal.getResultOutput($(_this).val()); });
    });
    $("#calPlus").click(function () {
        var resultOperation = cal.getResultOperation(0 /* add */);
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
    $("#calSub").click(function () {
        var resultOperation = cal.getResultOperation(1 /* sub */);
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
    $("#calDiv").click(function () {
        var resultOperation = cal.getResultOperation(2 /* div */);
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
    $("#calMul").click(function () {
        var resultOperation = cal.getResultOperation(3 /* mult */);
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
    $("#calClear").click(function () {
        var resultOperation = cal.clearResult();
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
};
//# sourceMappingURL=myTypeScript.js.map