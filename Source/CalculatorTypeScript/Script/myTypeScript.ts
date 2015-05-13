// main class
class Calculator implements IResultFunction, IResultInformation {
	// properties
	_outputString: string;
	_newNumber: boolean;
	_flag: string;
	_result: string;
	_resultToken: string;
	// constructor
	constructor(outputString: string, newNumber: boolean, flag: string) {
		this._outputString = outputString;
		this._newNumber = newNumber;
		this._flag = flag;
	}

	// functions
	getResultOperation() {

	}

	getResultOutput(btn: string) {
		return btn;
	}
}

// enum
enum ConstantVariable {
	add = 1,
	sub = 2,
	div = 3,
	mult = 4
}

// main interface
interface IResultInformation extends IBaseVariable {
	_result: string;
	_resultToken: string;
}

interface IResultFunction {
	getResultOperation(): any;
	getResultOutput(btn: string): any;
}

interface IBaseVariable {
	// properties
	_outputString: string;
	_newNumber: boolean;

	// constant;
	_flag: string;
}

// implement function
window.onload = function () {
	var resultInformation = <IResultInformation>{_outputString: "0", _newNumber: true, _flag: null};
	var cal = new Calculator(resultInformation._outputString, resultInformation._newNumber, resultInformation._flag);
	$("#resultValue").val("0");
	$(".calbtnumber").click(function () {
		$("#resultValue").val(string => cal.getResultOutput($(this).val()));
	});
}