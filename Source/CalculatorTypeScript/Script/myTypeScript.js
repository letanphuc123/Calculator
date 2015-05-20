/// <reference path="interface.ts" />
var CalculatorModule;
(function (CalculatorModule) {
    var Calculator = (function () {
        // constructor
        function Calculator(outputString, isNumber, flag, result, resultToken) {
            this._outputString = outputString;
            this._isNumber = isNumber;
            this._flag = flag;
            this._result = result;
            this._resultToken = resultToken;
            this._outputTotal = 0;
            this._isAgain = false;
            this._oldToken = "";
        }
        // functions
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
        Calculator.prototype.getResultOutput = function (btn) {
            this._result = this._isNumber ? parseFloat(this._result + btn) : parseFloat(btn);
            this._outputTotal = (this._flag === 0 /* isNumber */ ? this._result : this._outputTotal);
            this._isNumber = true;
            return this._result;
        };
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
        Calculator.prototype.getFinalResult = function () {
            this.getResultTotal();
            this._resultToken = "";
            this._oldToken = "";
            this._isAgain = true;
            this._isNumber = false;
            var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
            return resultOperation;
        };
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
//# sourceMappingURL=mytypescript.js.map