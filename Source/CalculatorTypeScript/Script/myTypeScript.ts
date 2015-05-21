/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

// define constructor /* module */ /* class */
module CalculatorModule {
	export class Calculator {
		// constructor
		constructor(public _outputString: string, public _isNumber: boolean, public _flag: number, public _result: number, public _resultToken: string,
			public _outputTotal: number, public _isAgain: boolean, public _oldToken: string) {
		}

		// functions
		// implement operator /* add */ /* subtract */ /* div */ /* multiply */
		getResultOperation(operation: number, flag: number): any {
			if (this._isNumber) {
				this.getResultTotal();
				this._oldToken = this._resultToken + this._result + " ";
				this._resultToken += this._result + " " + (operation === ConstantVariable.add ? "+" :
				(operation === ConstantVariable.sub ? "-" : (operation === ConstantVariable.div ? "/" : "*"))) + "  ";
			} else {
				this._resultToken = this._oldToken + (operation === ConstantVariable.add ? "+" :
				(operation === ConstantVariable.sub ? "-" : (operation === ConstantVariable.div ? "/" : "*"))) + "  ";
			}
			
			this._flag = flag;
			this._isNumber = false;
			var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
			return resultOperation;
		}

		// implement number button /* 0 -> 9 */
		getResultOutput(btn: string): number {
			this._result = this._isNumber ? parseFloat(this._result + btn) : parseFloat(btn);
			this._outputTotal = (this._flag === ConstantFlag.isNumber ? this._result : this._outputTotal);
			this._isNumber = true;
			return this._result;
		}

		// implement clear operator /* c */
		clearResult(): any {
			this._flag = ConstantFlag.isNumber;
			this._isNumber = false;
			this._isAgain = false;
			this._outputString = "0";
			this._outputTotal = 0;
			this._result = 0;
			this._oldToken = "";
			this._resultToken = "";
			var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
			return resultOperation;
		}

		// implement equal operator /* = */
		getFinalResult(): any {
			this.getResultTotal();
			this._resultToken = "";
			this._oldToken = "";
			this._isAgain = true;
			this._isNumber = false;
			var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
			return resultOperation;
		}

		// get value final result currently
		getResultTotal(): void {
			if (this._flag !== ConstantFlag.isNumber || this._isAgain) {
				this._outputTotal = (this._flag === ConstantFlag.isPlus) ? this._outputTotal + this._result :
				(this._flag === ConstantFlag.isSub ? this._outputTotal - this._result :
				(this._flag === ConstantFlag.isDiv ? this._outputTotal / this._result :
				this._outputTotal * this._result));
			}
		}
	}

	// enum
	export enum ConstantVariable { add, sub, div, mult };
	export enum ConstantFlag { isNumber, isPlus, isSub, isDiv, isMul };
}

// implement function
window.onload = function() {
	var cal = new CalculatorModule.Calculator("0", false, CalculatorModule.ConstantFlag.isNumber, 0, "", 0, false, "");
	
	$("button").click(function () {
		var valueElement = $("." + $(this).parent().parent().attr('class') + " .resultValue");
		var tokenElement = $("." + $(this).parent().parent().attr('class') + " .resultToken");
		var btElemment = $("." + $(this).parent().parent().attr('class') + " .calbt");
		var resultOperation = { result: cal._result, resultToken: cal._resultToken };
		switch ($(this).val()) {
			case "+":
				resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.add, CalculatorModule.ConstantFlag.isPlus);
				break;
			case "-":
				resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.sub, CalculatorModule.ConstantFlag.isSub);
				break;
			case "/":
				resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.div, CalculatorModule.ConstantFlag.isDiv);
				break;
			case "*":
				resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.mult, CalculatorModule.ConstantFlag.isMul);
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
		valueElement.val(string => resultOperation.result.toString());
		tokenElement.text(string => resultOperation.resultToken);
	});
}