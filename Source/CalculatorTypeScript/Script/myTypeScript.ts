module CalculatorModule {
	export class Calculator {
		// constructor
		constructor(public _outputString: string, public _isNumber: boolean, public _flag: number, public _result: number, public _resultToken: string,
			public _outputTotal: number, public _isAgain: boolean, public _oldToken: string) {
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