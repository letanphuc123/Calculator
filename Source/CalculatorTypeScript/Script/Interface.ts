module CalculatorModule {
	// main interface
	export interface IResultInformation extends IBaseVariable {
		_result: number;
		_resultToken: string;
	}

	export interface IResultFunction {
		getResultOperation(operation: number): any;
		getResultOutput(btn: string): any;
	}

	export interface IBaseVariable {
		// properties
		_outputString: string;
		_newNumber: boolean;

		// constant;
		_flag: number;
	}
}
