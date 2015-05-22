/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
// define constructor /* module */ /* class */
var CalculatorModule;
(function (CalculatorModule) {
    var ResultOperation = (function () {
        function ResultOperation() {
        }
        return ResultOperation;
    })();
    CalculatorModule.ResultOperation = ResultOperation;
    var Calculator = (function () {
        // constructor
        function Calculator(_outputString, _isNumber, _flag, _result, _resultToken, _outputTotal, _isAgain, _oldToken, _parentElement) {
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
            this._valueElement = this._parentElement + " .resultValue";
            this._tokenElement = this._parentElement + " .resultToken";
            this._resultOperation = new ResultOperation();
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
            return this.getResult(this._outputTotal, this._resultToken);
        };
        Calculator.prototype.getResult = function (result, resultToken) {
            this._resultOperation._result = result;
            this._resultOperation._resultToken = resultToken;
            return this._resultOperation;
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
            return this.getResult(this._outputTotal, this._resultToken);
        };
        // implement equal operator /* = */
        Calculator.prototype.getFinalResult = function () {
            this.getResultTotal();
            this._resultToken = "";
            this._oldToken = "";
            this._isAgain = true;
            this._isNumber = false;
            return this.getResult(this._outputTotal, this._resultToken);
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
            var _this = this;
            switch ($(element.target).val()) {
                case "+":
                    this.getResultOperation(0 /* add */, 1 /* isPlus */);
                    break;
                case "-":
                    this.getResultOperation(1 /* sub */, 2 /* isSub */);
                    break;
                case "/":
                    this.getResultOperation(2 /* div */, 3 /* isDiv */);
                    break;
                case "*":
                    this.getResultOperation(3 /* mult */, 4 /* isMul */);
                    break;
                case "=":
                    this.getFinalResult();
                    break;
                case "c":
                    this.clearResult();
                    break;
                default:
                    this.getResult(this.getResultOutput($(element.target).val()), $(this._tokenElement).text());
                    break;
            }
            $(this._valueElement).val(function (string) { return _this._resultOperation._result.toString(); });
            $(this._tokenElement).text(function (string) { return _this._resultOperation._resultToken; });
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
    var cal_first = new CalculatorModule.Calculator("0", false, 0 /* isNumber */, 0, "", 0, false, "", "#calbody_first");
    var cal_second = new CalculatorModule.Calculator("0", false, 0 /* isNumber */, 0, "", 0, false, "", "#calbody_second");
});
//# sourceMappingURL=myTypeScript.js.map