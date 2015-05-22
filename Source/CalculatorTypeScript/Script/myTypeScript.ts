/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

// define constructor /* module */ /* class */
module CalculatorModule {
	export class ResultOperation {
		public _result: number;
		public _resultToken: string;
	}
	export class Calculator {
		// default variables
		public _valueElement: string;
		public _tokenElement: string;
		public _resultOperation: ResultOperation;
		// constructor
		constructor(public _outputString: string,
			public _isNumber: boolean,
			public _flag: number,
			public _result: number,
			public _resultToken: string,
			public _outputTotal: number,
			public _isAgain: boolean,
			public _oldToken: string,
			public _parentElement: string) {
			this._valueElement = this._parentElement + " .resultValue";
			this._tokenElement = this._parentElement + " .resultToken";
			this._resultOperation = new ResultOperation();
			$(_parentElement + " button").click((event) => this.showResult(event));
		}

		// functions
		// implement operator /* add */ /* subtract */ /* div */ /* multiply */
		getResultOperation(operation: ConstantOperationType, flag: ConstantOperationFlag): ResultOperation {
			if (this._isNumber) {
				this.getResultTotal();
				this._oldToken = this._resultToken + this._result + " ";
				this._resultToken += this._result + " " + this.getResultToken(operation);
			} else {
				this._resultToken = this._oldToken + this.getResultToken(operation);
			}
			
			this._flag = flag;
			this._isNumber = false;
			return this.getResult(this._outputTotal, this._resultToken);
		}

		getResult(result: number, resultToken: string): ResultOperation {
			this._resultOperation._result = result;
			this._resultOperation._resultToken = resultToken;
			return this._resultOperation;
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
		clearResult(): ResultOperation {
			this._flag = ConstantOperationFlag.isNumber;
			this._isNumber = false;
			this._isAgain = false;
			this._outputString = "0";
			this._outputTotal = 0;
			this._result = 0;
			this._oldToken = "";
			this._resultToken = "";
			return this.getResult(this._outputTotal, this._resultToken);
		}

		// implement equal operator /* = */
		getFinalResult(): ResultOperation {
			this.getResultTotal();
			this._resultToken = "";
			this._oldToken = "";
			this._isAgain = true;
			this._isNumber = false;
			return this.getResult(this._outputTotal, this._resultToken);
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
			switch ($(element.target).val()) {
				case "+":
					this.getResultOperation(ConstantOperationType.add, ConstantOperationFlag.isPlus);
					break;
				case "-":
					this.getResultOperation(ConstantOperationType.sub, ConstantOperationFlag.isSub);
					break;
				case "/":
					this.getResultOperation(ConstantOperationType.div, ConstantOperationFlag.isDiv);
					break;
				case "*":
					this.getResultOperation(ConstantOperationType.mult, ConstantOperationFlag.isMul);
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
			$(this._valueElement).val(string => this._resultOperation._result.toString());
			$(this._tokenElement).text(string => this._resultOperation._resultToken);
		}
	}

	// enum
	export enum ConstantOperationType { add, sub, div, mult };
	export enum ConstantOperationFlag { isNumber, isPlus, isSub, isDiv, isMul };
}

// implement function
$(document).ready(function () {
	var cal_first = new CalculatorModule.Calculator("0", false, CalculatorModule.ConstantOperationFlag.isNumber, 0, "", 0, false, "", "#calbody_first");
	var cal_second = new CalculatorModule.Calculator("0", false, CalculatorModule.ConstantOperationFlag.isNumber, 0, "", 0, false, "", "#calbody_second");
})