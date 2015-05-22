/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

// define constructor /* module */ /* class */
module CalculatorModule {
	export class Calculator {
		// constructor
		constructor(public _outputString: string, public _isNumber: boolean, public _flag: number, public _result: number, public _resultToken: string,
			public _outputTotal: number, public _isAgain: boolean, public _oldToken: string, public _parentElement: string,
			public _valueElement: string, public _tokenElement: string) {
			$(_parentElement + " button").click((event) => this.showResult(event));
		}

		// functions
		// implement operator /* add */ /* subtract */ /* div */ /* multiply */
		getResultOperation(operation: number, flag: number): any {
			if (this._isNumber) {
				this.getResultTotal();
				this._oldToken = this._resultToken + this._result + " ";
				this._resultToken += this._result + " " + this.getResultToken(operation);
			} else {
				this._resultToken = this._oldToken + this.getResultToken(operation);
			}
			
			this._flag = flag;
			this._isNumber = false;
			var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
			return resultOperation;
		}

		getResultToken(operation: number): string {
			var resultOperationType = "";
			switch (operation) {
				case ConstantOperationType.add:
					resultOperationType = "+  ";
					break;
				case ConstantOperationType.sub:
					resultOperationType = "-  ";
					break;
				case ConstantOperationType.div:
					resultOperationType = "/  ";
					break;
				case ConstantOperationType.mult:
					resultOperationType = "*  ";
					break;
			}
			return resultOperationType;
		}

		// implement number button /* 0 -> 9 */
		getResultOutput(btn: string): number {
			this._result = this._isNumber ? parseFloat(this._result + btn) : parseFloat(btn);
			this._outputTotal = (this._flag === ConstantOperationFlag.isNumber ? this._result : this._outputTotal);
			this._isNumber = true;
			return this._result;
		}

		// implement clear operator /* c */
		clearResult(): any {
			this._flag = ConstantOperationFlag.isNumber;
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
			if (this._flag !== ConstantOperationFlag.isNumber || this._isAgain) {
				switch (this._flag) {
					case ConstantOperationFlag.isPlus:
						this._outputTotal += this._result;
						break;
					case ConstantOperationFlag.isSub:
						this._outputTotal -= this._result;
						break;
					case ConstantOperationFlag.isDiv:
						this._outputTotal = this._outputTotal / this._result;
						break;
					case ConstantOperationFlag.isMul:
						this._outputTotal = this._outputTotal * this._result;
						break;
				}
			}
		}

		// get result operation add into element result
		showResult(element: JQueryEventObject): void {
			var resultOperation = { result: this._result, resultToken: this._resultToken };
			switch ($(element.target).val()) {
				case "+":
					resultOperation = this.getResultOperation(ConstantOperationType.add, ConstantOperationFlag.isPlus);
					break;
				case "-":
					resultOperation = this.getResultOperation(ConstantOperationType.sub, ConstantOperationFlag.isSub);
					break;
				case "/":
					resultOperation = this.getResultOperation(ConstantOperationType.div, ConstantOperationFlag.isDiv);
					break;
				case "*":
					resultOperation = this.getResultOperation(ConstantOperationType.mult, ConstantOperationFlag.isMul);
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
			$(this._valueElement).val(string => resultOperation.result.toString());
			$(this._tokenElement).text(string => resultOperation.resultToken);
		}
	}

	// enum
	export enum ConstantOperationType { add, sub, div, mult };
	export enum ConstantOperationFlag { isNumber, isPlus, isSub, isDiv, isMul };
}

// implement function
$(document).ready(function () {
	var cal_first = new CalculatorModule.Calculator("0", false, CalculatorModule.ConstantOperationFlag.isNumber, 0, "", 0, false, "", "#calbody_first", "#calbody_first .resultValue", "#calbody_first .resultToken");
	var cal_second = new CalculatorModule.Calculator("0", false, CalculatorModule.ConstantOperationFlag.isNumber, 0, "", 0, false, "", "#calbody_second", "#calbody_second .resultValue", "#calbody_second .resultToken");
})