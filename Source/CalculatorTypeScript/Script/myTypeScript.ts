/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
// main class
class Calculator implements IResultFunction, IResultInformation {
	// properties
	_outputString: string;
	_outputTotal: number;
	_newNumber: boolean;
	_flag: number;
	_result: number;
	_resultToken: string;
	// constructor
	constructor(outputString: string, newNumber: boolean, flag: number, result: number, resultToken: string) {
		this._outputString = outputString;
		this._newNumber = newNumber;
		this._flag = flag;
		this._result = result;
		this._resultToken = resultToken;
		this._outputTotal = 0;
	}

	// functions
	getResultOperation(operation: number) {
		switch (operation) {
			case ConstantVariable.add:
				this._resultToken += this._result + " " + "+" + "  ";
				this._flag = ConstantFlag.isPlus;
				this._outputTotal += this._result;
				break;
			case ConstantVariable.sub:
				this._resultToken += this._result + " " + "-" + "  ";
				this._flag = ConstantFlag.isSub;
				this._outputTotal -= this._result;
				break;
			case ConstantVariable.div:
				this._resultToken += this._result + " " + "/" + "  ";
				this._flag = ConstantFlag.isDiv;
				this._outputTotal = this._outputTotal / this._result;
				break;;
			case ConstantVariable.mult:
				this._resultToken += this._result + " " + "*" + "  ";
				this._flag = ConstantFlag.isMul;
				this._outputTotal = this._outputTotal * this._result;
				break;
		}
		var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
		return resultOperation;
	}

	getResultOutput(btn: string) {
		this._result = parseFloat(btn);
		this._flag = ConstantFlag.isNumber;
		return btn;
	}

	clearResult() {
		this._flag = ConstantFlag.isNumber;
		this._newNumber = true;
		this._outputString = "0";
		this._outputTotal = 0;
		this._result = 0;
		this._resultToken = "";
		var resultOperation = { result: this._outputTotal, resultToken: this._resultToken };
		return resultOperation;
	}
}

// enum
enum ConstantVariable { add, sub, div, mult };
enum ConstantFlag { isNumber, isPlus, isSub, isDiv, isMul };

// main interface
interface IResultInformation extends IBaseVariable {
	_result: number;
	_resultToken: string;
}

interface IResultFunction {
	getResultOperation(operation: number): any;
	getResultOutput(btn: string): any;
}

interface IBaseVariable {
	// properties
	_outputString: string;
	_newNumber: boolean;

	// constant;
	_flag: number;
}

// implement function
window.onload = function () {
	var resultInformation = <IResultInformation>{ _outputString: "0", _newNumber: true, _flag: ConstantFlag.isNumber, _result: 0, _resultToken: "" };
	var cal = new Calculator(resultInformation._outputString, resultInformation._newNumber, resultInformation._flag, resultInformation._result, resultInformation._resultToken);
	$("#resultValue").val(cal._result.toString());
	$(".calbtnumber").click(function () {
		$("#resultValue").val(string => cal.getResultOutput($(this).val()));
	});

	$("#calPlus").click(function () {
		var resultOperation = cal.getResultOperation(ConstantVariable.add);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});
	$("#calSub").click(function () {
		var resultOperation = cal.getResultOperation(ConstantVariable.sub);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});

	$("#calDiv").click(function () {
		var resultOperation = cal.getResultOperation(ConstantVariable.div);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});

	$("#calMul").click(function () {
		var resultOperation = cal.getResultOperation(ConstantVariable.mult);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});

	$("#calClear").click(function () {
		var resultOperation = cal.clearResult();
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});
}