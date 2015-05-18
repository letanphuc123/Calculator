/// <reference path="interface.ts" />

module CalculatorModule {
	export class Calculator implements IResultFunction, IResultInformation {
		// properties
		_outputString: string;
		_outputTotal: number;
		_newNumber: boolean;
		_flag: number;
		_result: number;
		_resultToken: string;
		_isAgain: boolean;
		_lastValue: number;
		// constructor
		constructor(outputString: string, newNumber: boolean, flag: number, result: number, resultToken: string) {
			this._outputString = outputString;
			this._newNumber = newNumber;
			this._flag = flag;
			this._result = result;
			this._resultToken = resultToken;
			this._outputTotal = 0;
			this._isAgain = false;
			this._lastValue = 0;
		}

		// functions
		getResultOperation(operation: number) {
			this.getResultTotal();
			switch (operation) {
				case ConstantVariable.add:
					this._resultToken += this._result + " " + "+" + "  ";
					this._flag = ConstantFlag.isPlus;
					break;
				case ConstantVariable.sub:
					this._resultToken += this._result + " " + "-" + "  ";
					this._flag = ConstantFlag.isSub;
					break;
				case ConstantVariable.div:
					this._resultToken += this._result + " " + "/" + "  ";
					this._flag = ConstantFlag.isDiv;
					break;
				case ConstantVariable.mult:
					this._resultToken += this._result + " " + "*" + "  ";
					this._flag = ConstantFlag.isMul;
					break;
			}
			var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
			return resultOperation;
		}

		getResultOutput(btn: string) {
			this._result = parseFloat(btn);
			this._outputTotal = (this._flag === ConstantFlag.isNumber ? this._result : this._outputTotal);
			return this._result;
		}

		clearResult(): any {
			this._flag = ConstantFlag.isNumber;
			this._newNumber = true;
			this._isAgain = false;
			this._outputString = "0";
			this._outputTotal = 0;
			this._result = 0;
			this._resultToken = "";
			var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
			return resultOperation;
		}

		getFinalResult(): any {
			this.getResultTotal();
			this._resultToken = "";
			this._isAgain = true;
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