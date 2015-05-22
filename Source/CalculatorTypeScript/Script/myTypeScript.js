/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
// define constructor /* module */ /* class */
var CalculatorModule;
(function (CalculatorModule) {
    var Calculator = (function () {
        // constructor
        function Calculator(_outputString, _isNumber, _flag, _result, _resultToken, _outputTotal, _isAgain, _oldToken, _parentElement, _valueElement, _tokenElement) {
            var _this = this;
            this._outputString = _outputString;
            this._isNumber = _isNumber;
            this._flag = _flag;
            this._result = _result;
            this._resultToken = _resultToken;
            this._outputTotal = _outputTotal;
            this._isAgain = _isAgain;
            this._oldToken = _oldToken;
            this._parentElement = _parentElement;
            this._valueElement = _valueElement;
            this._tokenElement = _tokenElement;
            $(_parentElement + " button").click(function (event) { return _this.showResult(event); });
        }
        // functions
        // implement operator /* add */ /* subtract */ /* div */ /* multiply */
        Calculator.prototype.getResultOperation = function (operation, flag) {
            if (this._isNumber) {
                this.getResultTotal();
                this._oldToken = this._resultToken + this._result + " ";
                this._resultToken += this._result + " " + this.getResultToken(operation);
            }
            else {
                this._resultToken = this._oldToken + this.getResultToken(operation);
            }
            this._flag = flag;
            this._isNumber = false;
            var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
            return resultOperation;
        };
        Calculator.prototype.getResultToken = function (operation) {
            var resultOperationType = "";
            switch (operation) {
                case 0 /* add */:
                    resultOperationType = "+  ";
                    break;
                case 1 /* sub */:
                    resultOperationType = "-  ";
                    break;
                case 2 /* div */:
                    resultOperationType = "/  ";
                    break;
                case 3 /* mult */:
                    resultOperationType = "*  ";
                    break;
            }
            return resultOperationType;
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
                switch (this._flag) {
                    case 1 /* isPlus */:
                        this._outputTotal += this._result;
                        break;
                    case 2 /* isSub */:
                        this._outputTotal -= this._result;
                        break;
                    case 3 /* isDiv */:
                        this._outputTotal = this._outputTotal / this._result;
                        break;
                    case 4 /* isMul */:
                        this._outputTotal = this._outputTotal * this._result;
                        break;
                }
            }
        };
        // get result operation add into element result
        Calculator.prototype.showResult = function (element) {
            var resultOperation = { result: this._result, resultToken: this._resultToken };
            switch ($(element.target).val()) {
                case "+":
                    resultOperation = this.getResultOperation(0 /* add */, 1 /* isPlus */);
                    break;
                case "-":
                    resultOperation = this.getResultOperation(1 /* sub */, 2 /* isSub */);
                    break;
                case "/":
                    resultOperation = this.getResultOperation(2 /* div */, 3 /* isDiv */);
                    break;
                case "*":
                    resultOperation = this.getResultOperation(3 /* mult */, 4 /* isMul */);
                    break;
                case "=":
                    resultOperation = this.getFinalResult();
                    break;
                case "c":
                    resultOperation = this.clearResult();
                    break;
                default:
                    resultOperation = { result: this.getResultOutput($(element.target).val()), resultToken: $(this._tokenElement).text() };
                    break;
            }
            $(this._valueElement).val(function (string) { return resultOperation.result.toString(); });
            $(this._tokenElement).text(function (string) { return resultOperation.resultToken; });
        };
        return Calculator;
    })();
    CalculatorModule.Calculator = Calculator;
    // enum
    (function (ConstantOperationType) {
        ConstantOperationType[ConstantOperationType["add"] = 0] = "add";
        ConstantOperationType[ConstantOperationType["sub"] = 1] = "sub";
        ConstantOperationType[ConstantOperationType["div"] = 2] = "div";
        ConstantOperationType[ConstantOperationType["mult"] = 3] = "mult";
    })(CalculatorModule.ConstantOperationType || (CalculatorModule.ConstantOperationType = {}));
    var ConstantOperationType = CalculatorModule.ConstantOperationType;
    ;
    (function (ConstantOperationFlag) {
        ConstantOperationFlag[ConstantOperationFlag["isNumber"] = 0] = "isNumber";
        ConstantOperationFlag[ConstantOperationFlag["isPlus"] = 1] = "isPlus";
        ConstantOperationFlag[ConstantOperationFlag["isSub"] = 2] = "isSub";
        ConstantOperationFlag[ConstantOperationFlag["isDiv"] = 3] = "isDiv";
        ConstantOperationFlag[ConstantOperationFlag["isMul"] = 4] = "isMul";
    })(CalculatorModule.ConstantOperationFlag || (CalculatorModule.ConstantOperationFlag = {}));
    var ConstantOperationFlag = CalculatorModule.ConstantOperationFlag;
    ;
})(CalculatorModule || (CalculatorModule = {}));
// implement function
$(document).ready(function () {
    var cal_first = new CalculatorModule.Calculator("0", false, 0 /* isNumber */, 0, "", 0, false, "", "#calbody_first", "#calbody_first .resultValue", "#calbody_first .resultToken");
    var cal_second = new CalculatorModule.Calculator("0", false, 0 /* isNumber */, 0, "", 0, false, "", "#calbody_second", "#calbody_second .resultValue", "#calbody_second .resultToken");
});
//# sourceMappingURL=myTypeScript.js.map