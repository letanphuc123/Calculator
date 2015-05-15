	/// <reference path="interface.ts" />
	var CalculatorModule;
	(function (CalculatorModule) {
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
				this.getResultTotal();
				switch (operation) {
					case 0 /* add */:
						this._resultToken += this._result + " " + "+" + "  ";
						this._flag = 1 /* isPlus */;
						break;
					case 1 /* sub */:
						this._resultToken += this._result + " " + "-" + "  ";
						this._flag = 2 /* isSub */;
						break;
					case 2 /* div */:
						this._resultToken += this._result + " " + "/" + "  ";
						this._flag = 3 /* isDiv */;
						break;
					case 3 /* mult */:
						this._resultToken += this._result + " " + "*" + "  ";
						this._flag = 4 /* isMul */;
						break;
				}
				var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
				return resultOperation;
			};
			Calculator.prototype.getResultOutput = function (btn) {
				this._result = parseFloat(btn);
				this._outputTotal = (this._flag === 0 /* isNumber */ ? this._result : this._outputTotal);
				return this._result;
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
			Calculator.prototype.getFinalResult = function () {
				this.getResultTotal();
				this._resultToken = "";
				this._flag = 0 /* isNumber */;
				var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
				return resultOperation;
			};
			Calculator.prototype.getResultTotal = function () {
				if (this._flag !== 0 /* isNumber */) {
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