var output = "0";
var newNumber = true;
var pendingOperation = null;
var operationToken = "";
var operationTokenOld = "";
var runningTotal = null;
var pendingValue = null;
var lastValue = null;
var lastOperation = null;
var enableText = true;

var ADD = "adding";
var SUBSTRACT = "subtracting";
var MULTIPLY = "multiply";
var DIV = "div";
var ADD_TOKEN = "+";
var SUBTRACT_TOKEN = "-";
var MULTIPLY_TOKEN = "*";
var DIV_TOKEN = "/";
var FLAG = null;
var CURRENT_VALUE = 0;
var SET_CURRENT_VALUE = false;

interface OutputInformation {
	outputInfo: string;
	operationTokenInfo: string;
}

function mrcal() {
	output = "0";
	return output;
};

function mscal() {
	enableText = (output == "0" ? false : true);
	return output == "0" ? "" : "M";
};

function mccal() {
	return (enableText ? "" : "");
};

function mpluscal() {
	enableText = (output == "0" ? false : true);
	return output == "0" ? "" : "M";
};

function msubcal() {
	return (enableText ? "" : "");
};

function percent(information: OutputInformation) {
	var result = String((runningTotal * toNumber(output)) / 100);
	information.outputInfo = result;
	information.operationTokenInfo = operationToken + " " + result;
	pendingValue = result;
	output = result;
	return information;
};

function updateOutput(btn: string) {
	if (output == "0" || newNumber) {
		output = btn;
		newNumber = false;
	} else {
		output += String(btn);
	}
	pendingValue = toNumber(output);
	FLAG = "NUMBER";
	return output;
};

function add(information: OutputInformation) {
	checkOperator();
	if (FLAG != "ADD") {
		information.operationTokenInfo = setOperationToken(ADD);
	}
	information.outputInfo = runningTotal;
	setOutput(String(runningTotal));
	pendingOperation = ADD;
	pendingValue = null;
	FLAG = "ADD";
	return information;
};

function subtract(information: OutputInformation) {
	checkOperator();
	if (FLAG != "SUBSTRACT") {
		information.operationTokenInfo = setOperationToken(SUBSTRACT);
	}
	information.outputInfo = runningTotal;
	setOutput(String(runningTotal));
	pendingOperation = SUBSTRACT;
	pendingValue = null;
	FLAG = "SUBSTRACT";
	return information;
};

function multiply(information: OutputInformation) {
	checkOperator();
	if (FLAG != "MULTIPLY") {
		information.operationTokenInfo = setOperationToken(MULTIPLY);
	}
	information.outputInfo = runningTotal;
	setOutput(String(runningTotal));
	pendingOperation = MULTIPLY;
	pendingValue = null
	FLAG = "MULTIPLY";
	return information;
};

function div(information: OutputInformation) {
	checkOperator();
	if (FLAG != "DIV") {
		information.operationTokenInfo = setOperationToken(DIV);
	}
	information.outputInfo = runningTotal;
	setOutput(String(runningTotal));
	pendingOperation = DIV;
	pendingValue = null;
	FLAG = "DIV";
	return information;
};

function calculate() {
	if (!newNumber) {
		pendingValue = toNumber(output);
		lastValue = pendingValue;
	}

	if (pendingOperation == ADD) {
		if (FLAG == "ADD") {
			CURRENT_VALUE = runningTotal;
			runningTotal += runningTotal;
		} else {
			runningTotal += pendingValue;
		}
		lastOperation = ADD;
	} else if (pendingOperation == SUBSTRACT) {
		if (FLAG == "SUBSTRACT") {
			CURRENT_VALUE = runningTotal;
			runningTotal -= runningTotal;
		} else {
			runningTotal -= pendingValue;
		}
		lastOperation = SUBSTRACT;
	} else if (pendingOperation == MULTIPLY) {
		if (FLAG == "MULTIPLY") {
			CURRENT_VALUE = runningTotal;
			runningTotal = runningTotal * runningTotal;
		} else {
			runningTotal = runningTotal * pendingValue;
		}
		lastOperation = MULTIPLY;
	} else if (pendingOperation == DIV) {
		if (FLAG == "DIV") {
			CURRENT_VALUE = runningTotal;
			runningTotal = runningTotal / runningTotal;
		} else {
			runningTotal = runningTotal / pendingValue;
		}
		lastOperation = DIV;
	} else {
		if (lastOperation) {
			if (lastOperation == ADD) {
				if (FLAG == "NUMBER") {
					runningTotal = pendingValue + CURRENT_VALUE;
				} else {
					runningTotal += CURRENT_VALUE;
				}
			} else {
				if (lastOperation == SUBSTRACT) {
					if (FLAG == "NUMBER") {
						runningTotal = pendingValue - CURRENT_VALUE;
					} else {
						runningTotal -= CURRENT_VALUE;
					}
				} else if (lastOperation == MULTIPLY) {
					if (FLAG == "NUMBER") {
						runningTotal = pendingValue * CURRENT_VALUE;
					} else {
						runningTotal = runningTotal * CURRENT_VALUE;
					}
				} else {
					if (FLAG == "NUMBER") {
						runningTotal = pendingValue / CURRENT_VALUE;
					} else {
						runningTotal = runningTotal / CURRENT_VALUE;
					}
				}
			}
		} else {
			runningTotal = 0;
		}
	}
	setOutput(runningTotal);
	setOperationToken(null);
	if (pendingValue && !SET_CURRENT_VALUE)
		CURRENT_VALUE = pendingValue;
	pendingOperation = null;
	pendingValue = null;
	FLAG = "NUMBER";
	SET_CURRENT_VALUE = true;
	return runningTotal;
};

function clear() {
	pendingValue = null;
	runningTotal = null;
	pendingOperation = null;
	lastOperation = null;
	FLAG = null;
	SET_CURRENT_VALUE = false;
	CURRENT_VALUE = 0;
	setOutput("0");
	setOperationToken(null);
	return "";
};

function toNumber(numberString) {
	var result = 0;
	if (numberString) {
		result = numberString * 1;
	}
	return result;
};

function setOperationToken(operation: string) {
	if (FLAG == "NUMBER") {
		operationTokenOld = operationToken + output + " ";
		if (operation == ADD) {
			operationToken += output + " " + ADD_TOKEN + "  ";
		} else if (operation == SUBSTRACT) {
			operationToken += output + " " + SUBTRACT_TOKEN + "  ";
		} else if (operation == MULTIPLY) {
			operationToken += output + " " + MULTIPLY_TOKEN + "  ";
		} else if (operation == DIV) {
			operationToken += output + " " + DIV_TOKEN + "  ";
		} else {
			operationToken = "";
		}
	} else if (FLAG == null) {
		operationToken = "";
	} else {
		operationToken = operationTokenOld + (operation == SUBSTRACT ? SUBTRACT_TOKEN : (operation == MULTIPLY ? MULTIPLY_TOKEN : (operation == ADD ? ADD_TOKEN : DIV_TOKEN))) + "  ";
	}
	return operationToken;
};

function setOutput(outputString: string) {
	output = outputString;
	newNumber = true;
};

function checkOperator() {
	if (pendingValue != null) {
		if (runningTotal && pendingOperation == SUBSTRACT) {
			runningTotal -= pendingValue;
		} else if (runningTotal && pendingOperation == ADD) {
			runningTotal += pendingValue;
		} else if (runningTotal && pendingOperation == MULTIPLY) {
			runningTotal = runningTotal * pendingValue;
		} else if (runningTotal && pendingOperation == DIV) {
			runningTotal = runningTotal / pendingValue;
		} else {
			runningTotal = pendingValue;
		}
	}
};

window.onload = function () {
	var outputInformation = { outputInfo: "", operationTokenInfo: ""};
	$(".numberbutton").click(function () {
		$("#output").text(updateOutput($(this).val()));
	});

	$(".numberdoublebutton").click(function () {
		$("#output").text(updateOutput($(this).val()));
	});

	$("#add").click(function () {
		$("#operationToken").text(add(outputInformation).operationTokenInfo);
		$("#output").text(add(outputInformation).outputInfo);
	});

	$("#subtract").click(function () {
		$("#operationToken").text(subtract(outputInformation).operationTokenInfo);
		$("#output").text(subtract(outputInformation).outputInfo);
	});

	$("#multiply").click(function () {
		$("#operationToken").text(multiply(outputInformation).operationTokenInfo);
		$("#output").text(multiply(outputInformation).outputInfo);
	});

	$("#div").click(function () {
		$("#operationToken").text(div(outputInformation).operationTokenInfo);
		$("#output").text(div(outputInformation).outputInfo);
	});

	$("#clear").click(function () {
		$("#output").text("0");
		$("#operationToken").text(clear());
	});

	$("#calculate").click(function () {
		$("#output").text(calculate());
		$("#operationToken").text("");
	});

	$("#mr").click(function () {
		$("#output").text(mrcal());
	});

	$("#ms").click(function () {
		$("#changeOutput").text(mscal());
	});

	$("#mc").click(function () {
		$("#changeOutput").text(mccal());
	});

	$("#mplus").click(function () {
		$("#changeOutput").text(mpluscal());
	});

	$("#msub").click(function () {
		$("#changeOutput").text(msubcal());
	});

	$("#percent").click(function () {
		var info = percent(outputInformation);
		$("#operationToken").text(info.operationTokenInfo);
		$("#output").text(info.outputInfo);
	});
};
