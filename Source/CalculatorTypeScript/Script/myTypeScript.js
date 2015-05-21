/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
// define constructor /* module */ /* class */
var CalculatorModule;
(function (CalculatorModule) {
    var Calculator = (function () {
        // constructor
        function Calculator(_outputString, _isNumber, _flag, _result, _resultToken, _outputTotal, _isAgain, _oldToken) {
            this._outputString = _outputString;
            this._isNumber = _isNumber;
            this._flag = _flag;
            this._result = _result;
            this._resultToken = _resultToken;
            this._outputTotal = _outputTotal;
            this._isAgain = _isAgain;
            this._oldToken = _oldToken;
        }
        // functions
        // implement operator /* add */ /* subtract */ /* div */ /* multiply */
        Calculator.prototype.getResultOperation = function (operation, flag) {
            if (this._isNumber) {
                this.getResultTotal();
                this._oldToken = this._resultToken + this._result + " ";
                this._resultToken += this._result + " " + (operation === 0 /* add */ ? "+" : (operation === 1 /* sub */ ? "-" : (operation === 2 /* div */ ? "/" : "*"))) + "  ";
            }
            else {
                this._resultToken = this._oldToken + (operation === 0 /* add */ ? "+" : (operation === 1 /* sub */ ? "-" : (operation === 2 /* div */ ? "/" : "*"))) + "  ";
            }
            this._flag = flag;
            this._isNumber = false;
            var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
            return resultOperation;
        };
        // implement number button /* 0 -> 9 */
        Calculator.prototype.getResultOutput = function (btn) {
            this._result = this._isNumber ? parseFloat(this._result + btn) : parseFloat(btn);
            this._outputTotal = (this._flag === 0 /* isNumber */ ? this._result : this._outputTotal);
            this._isNumber = true;
            return this._result;
        };
        // implement clear operator /* c */
        Calculator.prototype.clearResult = function () {
            this._flag = 0 /* isNumber */;
            this._isNumber = false;
            this._isAgain = false;
            this._outputString = "0";
            this._outputTotal = 0;
            this._result = 0;
            this._oldToken = "";
            this._resultToken = "";
            var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
            return resultOperation;
        };
        // implement equal operator /* = */
        Calculator.prototype.getFinalResult = function () {
            this.getResultTotal();
            this._resultToken = "";
            this._oldToken = "";
            this._isAgain = true;
            this._isNumber = false;
            var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
            return resultOperation;
        };
        // get value final result currently
        Calculator.prototype.getResultTotal = function () {
            if (this._flag !== 0 /* isNumber */ || this._isAgain) {
                this._outputTotal = (this._flag === 1 /* isPlus */) ? this._outputTotal + this._result : (this._flag === 2 /* isSub */ ? this._outputTotal - this._result : (this._flag === 3 /* isDiv */ ? this._outputTotal / this._result : this._outputTotal * this._result));
            }
        };
        return Calculator;
    })();
    CalculatorModule.Calculator = Calculator;
    // enum
    (function (ConstantVariable) {
        ConstantVariable[ConstantVariable["add"] = 0] = "add";
        ConstantVariable[ConstantVariable["sub"] = 1] = "sub";
        ConstantVariable[ConstantVariable["div"] = 2] = "div";
        ConstantVariable[ConstantVariable["mult"] = 3] = "mult";
    })(CalculatorModule.ConstantVariable || (CalculatorModule.ConstantVariable = {}));
    var ConstantVariable = CalculatorModule.ConstantVariable;
    ;
    (function (ConstantFlag) {
        ConstantFlag[ConstantFlag["isNumber"] = 0] = "isNumber";
        ConstantFlag[ConstantFlag["isPlus"] = 1] = "isPlus";
        ConstantFlag[ConstantFlag["isSub"] = 2] = "isSub";
        ConstantFlag[ConstantFlag["isDiv"] = 3] = "isDiv";
        ConstantFlag[ConstantFlag["isMul"] = 4] = "isMul";
    })(CalculatorModule.ConstantFlag || (CalculatorModule.ConstantFlag = {}));
    var ConstantFlag = CalculatorModule.ConstantFlag;
    ;
})(CalculatorModule || (CalculatorModule = {}));
// implement function
$(document).ready(function () {
    var cal_first = new CalculatorModule.Calculator("0", false, 0 /* isNumber */, 0, "", 0, false, "");
    var cal_second = new CalculatorModule.Calculator("0", false, 0 /* isNumber */, 0, "", 0, false, "");
    $("#calbody_first").find("button").click(function () {
        showResult("#calbody_first", cal_first, $(this).val());
    });
    $("#calbody_second").find("button").click(function () {
        showResult("#calbody_second", cal_second, $(this).val());
    });
    function showResult(parentElement, parentClass, value) {
        var valueElement = $(parentElement + " .resultValue");
        var tokenElement = $(parentElement + " .resultToken");
        var btElemment = $(parentElement + " .calbt");
        var resultOperation = { result: parentClass._result, resultToken: parentClass._resultToken };
        switch (value) {
            case "+":
                resultOperation = parentClass.getResultOperation(0 /* add */, 1 /* isPlus */);
                break;
            case "-":
                resultOperation = parentClass.getResultOperation(1 /* sub */, 2 /* isSub */);
                break;
            case "/":
                resultOperation = parentClass.getResultOperation(2 /* div */, 3 /* isDiv */);
                break;
            case "*":
                resultOperation = parentClass.getResultOperation(3 /* mult */, 4 /* isMul */);
                break;
            case "=":
                resultOperation = parentClass.getFinalResult();
                break;
            case "c":
                resultOperation = parentClass.clearResult();
                break;
            default:
                resultOperation = { result: parentClass.getResultOutput(value), resultToken: tokenElement.text() };
                break;
        }
        valueElement.val(function (string) { return resultOperation.result.toString(); });
        tokenElement.text(function (string) { return resultOperation.resultToken; });
    }
});
//# sourceMappingURL=myTypeScript.js.map