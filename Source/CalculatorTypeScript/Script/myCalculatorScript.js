/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
// define constructor /* module */ /* class */
var CalculatorModule;
(function (CalculatorModule) {
    // enum
    CalculatorModule.ConstantOperationType = {
        add: "+",
        sub: "-",
        div: "/",
        mult: "*",
    };
    (function (ConstantOperationFlag) {
        ConstantOperationFlag[ConstantOperationFlag["isNumber"] = 0] = "isNumber";
        ConstantOperationFlag[ConstantOperationFlag["isPlus"] = 1] = "isPlus";
        ConstantOperationFlag[ConstantOperationFlag["isSub"] = 2] = "isSub";
        ConstantOperationFlag[ConstantOperationFlag["isDiv"] = 3] = "isDiv";
        ConstantOperationFlag[ConstantOperationFlag["isMul"] = 4] = "isMul";
    })(CalculatorModule.ConstantOperationFlag || (CalculatorModule.ConstantOperationFlag = {}));
    var ConstantOperationFlag = CalculatorModule.ConstantOperationFlag;
    ;
    var ResultOperation = (function () {
        function ResultOperation() {
        }
        return ResultOperation;
    })();
    CalculatorModule.ResultOperation = ResultOperation;
    var Calculator = (function () {
        // constructor
        function Calculator(_parentElement, _outputString, _isNumber, _flag, _result, _resultToken, _outputTotal, _isAgain, _oldToken) {
            var _this = this;
            if (_outputString === void 0) { _outputString = "0"; }
            if (_isNumber === void 0) { _isNumber = false; }
            if (_flag === void 0) { _flag = 0 /* isNumber */; }
            if (_result === void 0) { _result = 0; }
            if (_resultToken === void 0) { _resultToken = ""; }
            if (_outputTotal === void 0) { _outputTotal = 0; }
            if (_isAgain === void 0) { _isAgain = false; }
            if (_oldToken === void 0) { _oldToken = ""; }
            this._parentElement = _parentElement;
            this._outputString = _outputString;
            this._isNumber = _isNumber;
            this._flag = _flag;
            this._result = _result;
            this._resultToken = _resultToken;
            this._outputTotal = _outputTotal;
            this._isAgain = _isAgain;
            this._oldToken = _oldToken;
            this._resultOperation = new ResultOperation();
            this._tokenElement = this._parentElement + " .resultToken";
            $(this._parentElement + " button").click(function (event) { return _this.showResult(event); });
        }
        // functions
        // implement operator /* add */ /* subtract */ /* div */ /* multiply */
        Calculator.prototype.getResultOperation = function (operation, flag) {
            if (this._isNumber) {
                this.getResultTotal();
                this._oldToken = this._resultToken + this._result + " ";
                this._resultToken += this._result + " " + operation + "  ";
            }
            else {
                this._resultToken = this._oldToken + operation + "  ";
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
                    this.getResultOperation(CalculatorModule.ConstantOperationType.add, 1 /* isPlus */);
                    break;
                case "-":
                    this.getResultOperation(CalculatorModule.ConstantOperationType.sub, 2 /* isSub */);
                    break;
                case "/":
                    this.getResultOperation(CalculatorModule.ConstantOperationType.div, 3 /* isDiv */);
                    break;
                case "*":
                    this.getResultOperation(CalculatorModule.ConstantOperationType.mult, 4 /* isMul */);
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
            $(this._parentElement + " .resultValue").val(function (string) { return _this._resultOperation._result.toString(); });
            $(this._tokenElement).text(function (string) { return _this._resultOperation._resultToken; });
        };
        return Calculator;
    })();
    CalculatorModule.Calculator = Calculator;
})(CalculatorModule || (CalculatorModule = {}));
// implement function
$(document).ready(function () {
    var cal_first = new CalculatorModule.Calculator("#calbody_first");
    var cal_second = new CalculatorModule.Calculator("#calbody_second");
});
//# sourceMappingURL=myCalculatorScript.js.map