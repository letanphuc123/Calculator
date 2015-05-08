// constant variables
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

// main class
class Calculator {
	// Property
	output: string;
	newNumber: boolean;
	pendingOperation: string;
	operationToken: string;
	operationTokenOld: string;
	runningTotal: number;
	pendingValue: number;
	lastValue: number;
	lastOperation: string;
	enableText: boolean;

	// Contructor
	constructor(output: string, newNumber: boolean, pendingOperation: string, operationToken: string, operationTokenOld: string, runningTotal: number,
		pendingValue: number, lastValue: number, lastOperation: string, enableText: boolean) {
		this.output = output;
		this.newNumber = newNumber;
		this.pendingOperation = pendingOperation;
		this.operationToken = operationToken;
		this.operationTokenOld = operationTokenOld;
		this.runningTotal = runningTotal;
		this.pendingValue = pendingValue;
		this.lastValue = lastValue;
		this.lastOperation = lastOperation;
		this.enableText = enableText;
	}

	// Function
	mrcal() {
		this.output = "0";
		return this.output;
	}

	mscal() {
		this.enableText = (this.output == "0" ? false : true);
		return this.output == "0" ? "" : "M";
	}

	mccal() {
		return (this.enableText ? "" : "");
	}

	mpluscal() {
		this.enableText = (this.output == "0" ? false : true);
		return this.output == "0" ? "" : "M";
	}

	msubcal() {
		return (this.enableText ? "" : "");
	}

	toNumber(numberString) {
		var result = 0;
		if (numberString) {
			result = numberString * 1;
		}
		return result;
	}

	percent(information: OutputInformation) {
		var result = String((this.runningTotal * this.toNumber(this.output)) / 100);
		information.outputInfo = result;
		information.operationTokenInfo = this.operationToken + " " + result;
		this.pendingValue = toFloat(result);
		this.output = result;
		return information;
	}

	updateOutput(btn: string) {
		if (this.output == "0" || this.newNumber) {
			this.output = btn;
			this.newNumber = false;
		} else {
			this.output += String(btn);
		}
		this.pendingValue = this.toNumber(this.output);
		FLAG = "NUMBER";
		return this.output;
	}

	add(information: OutputInformation) {
		this.checkOperator();
		if (FLAG != "ADD") {
			information.operationTokenInfo = this.setOperationToken(ADD);
		}
		information.outputInfo = this.runningTotal.toString();
		this.setOutput(String(this.runningTotal));
		this.pendingOperation = ADD;
		this.pendingValue = null;
		FLAG = "ADD";
		return information;
	}

	subtract(information: OutputInformation) {
		this.checkOperator();
		if (FLAG != "SUBSTRACT") {
			information.operationTokenInfo = this.setOperationToken(SUBSTRACT);
		}
		information.outputInfo = this.runningTotal.toString();
		this.setOutput(String(this.runningTotal));
		this.pendingOperation = SUBSTRACT;
		this.pendingValue = null;
		FLAG = "SUBSTRACT";
		return information;
	}

	multiply(information: OutputInformation) {
		this.checkOperator();
		if (FLAG != "MULTIPLY") {
			information.operationTokenInfo = this.setOperationToken(MULTIPLY);
		}
		information.outputInfo = this.runningTotal.toString();
		this.setOutput(String(this.runningTotal));
		this.pendingOperation = MULTIPLY;
		this.pendingValue = null
		FLAG = "MULTIPLY";
		return information;
	}

	div(information: OutputInformation) {
		this.checkOperator();
		if (FLAG != "DIV") {
			information.operationTokenInfo = this.setOperationToken(DIV);
		}
		information.outputInfo = this.runningTotal.toString();
		this.setOutput(String(this.runningTotal));
		this.pendingOperation = DIV;
		this.pendingValue = null;
		FLAG = "DIV";
		return information;
	}

	// calculator
	calculate() {
		if (!this.newNumber) {
			this.pendingValue = this.toNumber(this.output);
			this.lastValue = this.pendingValue;
		}

		if (this.pendingOperation == ADD) {
			if (FLAG == "ADD") {
				CURRENT_VALUE = this.runningTotal;
				this.runningTotal += this.runningTotal;
			} else {
				this.runningTotal += this.pendingValue;
			}
			this.	lastOperation = ADD;
		} else if (this.pendingOperation == SUBSTRACT) {
			if (FLAG == "SUBSTRACT") {
				CURRENT_VALUE = this.runningTotal;
				this.runningTotal -= this.runningTotal;
			} else {
				this.runningTotal -= this.pendingValue;
			}
			this.lastOperation = SUBSTRACT;
		} else if (this.pendingOperation == MULTIPLY) {
			if (FLAG == "MULTIPLY") {
				CURRENT_VALUE = this.runningTotal;
				this.runningTotal = this.runningTotal * this.runningTotal;
			} else {
				this.runningTotal = this.runningTotal * this.pendingValue;
			}
			this.lastOperation = MULTIPLY;
		} else if (this.pendingOperation == DIV) {
			if (FLAG == "DIV") {
				CURRENT_VALUE = this.runningTotal;
				this.runningTotal = this.runningTotal / this.runningTotal;
			} else {
				this.runningTotal = this.runningTotal / this.pendingValue;
			}
			this.lastOperation = DIV;
		} else {
		if (this.lastOperation) {
			if (this.lastOperation == ADD) {
					if (FLAG == "NUMBER") {
						this.runningTotal = this.pendingValue + CURRENT_VALUE;
					} else {
						this.runningTotal += CURRENT_VALUE;
					}
				} else {
				if (this.lastOperation == SUBSTRACT) {
						if (FLAG == "NUMBER") {
							this.runningTotal = this.pendingValue - CURRENT_VALUE;
						} else {
							this.runningTotal -= CURRENT_VALUE;
						}
				} else if (this.lastOperation == MULTIPLY) {
						if (FLAG == "NUMBER") {
							this.runningTotal = this.pendingValue * CURRENT_VALUE;
						} else {
							this.runningTotal = this.runningTotal * CURRENT_VALUE;
						}
					} else {
						if (FLAG == "NUMBER") {
							this.runningTotal = this.pendingValue / CURRENT_VALUE;
						} else {
							this.runningTotal = this.runningTotal / CURRENT_VALUE;
						}
					}
				}
			} else {
				this.runningTotal = 0;
			}
		}
		this.setOutput(this.runningTotal.toString());
		this.setOperationToken(null);
		if (this.pendingValue && !SET_CURRENT_VALUE)
			CURRENT_VALUE = this.pendingValue;
		this.pendingOperation = null;
		this.pendingValue = null;
		FLAG = "NUMBER";
		SET_CURRENT_VALUE = true;
		return this.runningTotal;
	}

	clear() {
		this.pendingValue = null;
		this.runningTotal = null;
		this.pendingOperation = null;
		this.lastOperation = null;
		FLAG = null;
		SET_CURRENT_VALUE = false;
		CURRENT_VALUE = 0;
		this.setOutput("0");
		this.setOperationToken(null);
		return "";
	}

	setOperationToken(operation: string) {
		if (FLAG == "NUMBER") {
			this.operationTokenOld = this.operationToken + this.output + " ";
			if (operation == ADD) {
				this.operationToken += this.output + " " + ADD_TOKEN + "  ";
			} else if (operation == SUBSTRACT) {
				this.operationToken += this.output + " " + SUBTRACT_TOKEN + "  ";
			} else if (operation == MULTIPLY) {
				this.operationToken += this.output + " " + MULTIPLY_TOKEN + "  ";
			} else if (operation == DIV) {
				this.operationToken += this.output + " " + DIV_TOKEN + "  ";
			} else {
				this.operationToken = "";
			}
		} else if (FLAG == null) {
			this.operationToken = "";
		} else {
			this.operationToken = this.operationTokenOld + (operation == SUBSTRACT ? SUBTRACT_TOKEN : (operation == MULTIPLY ? MULTIPLY_TOKEN : (operation == ADD ? ADD_TOKEN : DIV_TOKEN))) + "  ";
		}
		return this.operationToken;
	}

	setOutput(outputString: string) {
		this.output = outputString;
		this.newNumber = true;
	}

	checkOperator() {
		if (this.pendingValue != null) {
			if (this.runningTotal && this.pendingOperation == SUBSTRACT) {
				this.runningTotal -= this.pendingValue;
			} else if (this.runningTotal && this.pendingOperation == ADD) {
				this.runningTotal += this.pendingValue;
			} else if (this.runningTotal && this.pendingOperation == MULTIPLY) {
				this.runningTotal = this.runningTotal * this.pendingValue;
			} else if (this.runningTotal && this.pendingOperation == DIV) {
				this.runningTotal = this.runningTotal / this.pendingValue;
			} else {
				this.runningTotal = this.pendingValue;
			}
		}
	}
};

// main interface
interface OutputInformation {
	outputInfo: string;
	operationTokenInfo: string;
}

// implement function
window.onload = function () {
	var cal = new Calculator("0", true, null, "", "", null, null, null, null, true);
	var outputInformation = { outputInfo: "", operationTokenInfo: "" };
	$(".numberbutton").click(function () {
		$("#output").text(cal.updateOutput($(this).val()));
	});

	$(".numberdoublebutton").click(function () {
		$("#output").text(cal.updateOutput($(this).val()));
	});

	$("#add").click(function () {
		$("#operationToken").text(cal.add(outputInformation).operationTokenInfo);
		$("#output").text(cal.add(outputInformation).outputInfo);
	});

	$("#subtract").click(function () {
		$("#operationToken").text(cal.subtract(outputInformation).operationTokenInfo);
		$("#output").text(cal.subtract(outputInformation).outputInfo);
	});

	$("#multiply").click(function () {
		$("#operationToken").text(cal.multiply(outputInformation).operationTokenInfo);
		$("#output").text(cal.multiply(outputInformation).outputInfo);
	});

	$("#div").click(function () {
		$("#operationToken").text(cal.div(outputInformation).operationTokenInfo);
		$("#output").text(cal.div(outputInformation).outputInfo);
	});

	$("#clear").click(function () {
		$("#output").text("0");
		$("#operationToken").text(cal.clear());
	});

	$("#calculate").click(function () {
		$("#output").text(cal.calculate());
		$("#operationToken").text("");
	});

	$("#mr").click(function () {
		$("#output").text(cal.mrcal());
	});

	$("#ms").click(function () {
		$("#changeOutput").text(cal.mscal());
	});

	$("#mc").click(function () {
		$("#changeOutput").text(cal.mccal());
	});

	$("#mplus").click(function () {
		$("#changeOutput").text(cal.mpluscal());
	});

	$("#msub").click(function () {
		$("#changeOutput").text(cal.msubcal());
	});

	$("#percent").click(function () {
		var info = cal.percent(outputInformation);
		$("#operationToken").text(info.operationTokenInfo);
		$("#output").text(info.outputInfo);
	});
};
