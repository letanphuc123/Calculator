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
// implement function
window.onload = function () {
    var cal = new CalculatorModule.Calculator("0", false, 0 /* isNumber */, 0, "", 0, false, "");
    var valueElement = $(".calbody .resultValue");
    var tokenElement = $(".calbody .resultToken");
    var btElemment = $(".calbody .calbt");
    var resultOperation = { result: cal._result, resultToken: cal._resultToken };
    btElemment.click(function () {
        switch ($(this).val()) {
            case "+":
                resultOperation = cal.getResultOperation(0 /* add */, 1 /* isPlus */);
                break;
            case "-":
                resultOperation = cal.getResultOperation(1 /* sub */, 2 /* isSub */);
                break;
            case "/":
                resultOperation = cal.getResultOperation(2 /* div */, 3 /* isDiv */);
                break;
            case "*":
                resultOperation = cal.getResultOperation(3 /* mult */, 4 /* isMul */);
                break;
            case "=":
                resultOperation = cal.getFinalResult();
                break;
            case "c":
                resultOperation = cal.clearResult();
                break;
            default:
                resultOperation = { result: cal.getResultOutput($(this).val()), resultToken: tokenElement.text() };
                break;
        }
        valueElement.val(function (string) { return resultOperation.result.toString(); });
        tokenElement.text(function (string) { return resultOperation.resultToken; });
    });
};
//# sourceMappingURL=mytypescript.js.map