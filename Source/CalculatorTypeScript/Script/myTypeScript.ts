/// <reference path="interface.ts" />

module CalculatorModule {
	export class Calculator implements IResultFunction, IResultInformation {
		// properties
		_outputString: string;
		_outputTotal: number;
		_isNumber: boolean;
		_flag: number;
		_result: number;
		_resultToken: string;
		_isAgain: boolean;
		_oldToken: string;
		// constructor
		constructor(outputString: string, isNumber: boolean, flag: number, result: number, resultToken: string) {
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
		getResultOperation(operation: number, flag: number) {
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

		getResultOutput(btn: string) {
			this._result = this._isNumber ? parseFloat(this._result + btn) : parseFloat(btn);
			this._outputTotal = (this._flag === ConstantFlag.isNumber ? this._result : this._outputTotal);
			this._isNumber = true;
			return this._result;
		}

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

		getFinalResult(): any {
			this.getResultTotal();
			this._resultToken = "";
			this._oldToken = "";
			this._isAgain = true;
			this._isNumber = false;
			var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
			return resultOperation;
		}

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