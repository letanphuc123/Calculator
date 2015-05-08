/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

// main class
class Calculator {
	// property
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

	// constant variables
	ADD: string = "adding";
	SUBSTRACT: string = "subtracting";
	MULTIPLY: string = "multiply";
	DIV: string = "div";
	ADD_TOKEN: string = "+";
	SUBTRACT_TOKEN: string = "-";
	MULTIPLY_TOKEN: string = "*";
	DIV_TOKEN: string = "/";
	FLAG: string = null;
	CURRENT_VALUE: number = 0;
	SET_CURRENT_VALUE: boolean = false;

	// contructor
	constructor(output: string, newNumber: boolean, pendingOperation: string, operationToken: string,
		operationTokenOld: string, runningTotal: number, pendingValue: number, lastValue: number,
		lastOperation: string, enableText: boolean) {
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

	// function
	mrcal() {
		this.output = "0";
		return this.output;
	}

	mscal() {
		this.enableText = (this.output === "0" ? false : true);
		return this.output === "0" ? "" : "M";
	}

	mccal() {
		return (this.enableText ? "" : "");
	}

	mpluscal() {
		this.enableText = (this.output === "0" ? false : true);
		return this.output === "0" ? "" : "M";
	}

	msubcal() {
		return (this.enableText ? "" : "");
	}

	toNumber(numberString: string) {
		var result = 0;
		if (numberString) {
			result = parseFloat(numberString) * 1;
		}
		return result;
	}

	percent(information: IOutputInformation) {
		var result = String((this.runningTotal * this.toNumber(this.output)) / 100);
		information.outputInfo = result;
		information.operationTokenInfo = this.operationToken + " " + result;
		this.pendingValue = parseFloat(result);
		this.output = result;
		return information;
	}

	updateOutput(btn: string) {
		if (this.output === "0" || this.newNumber) {
			this.output = btn;
			this.newNumber = false;
		} else {
			this.output += String(btn);
		}
		this.pendingValue = this.toNumber(this.output);
		this.FLAG = "NUMBER";
		return this.output;
	}

	add(information: IOutputInformation) {
		this.checkOperator();
		if (this.FLAG !== "ADD") {
			information.operationTokenInfo = this.setOperationToken(this.ADD);
		}
		information.outputInfo = this.runningTotal.toString();
		this.setOutput(String(this.runningTotal));
		this.pendingOperation = this.ADD;
		this.pendingValue = null;
		this.FLAG = "ADD";
		return information;
	}

	subtract(information: IOutputInformation) {
		this.checkOperator();
		if (this.FLAG !== "SUBSTRACT") {
			information.operationTokenInfo = this.setOperationToken(this.SUBSTRACT);
		}
		information.outputInfo = this.runningTotal.toString();
		this.setOutput(String(this.runningTotal));
		this.pendingOperation = this.SUBSTRACT;
		this.pendingValue = null;
		this.FLAG = "SUBSTRACT";
		return information;
	}

	multiply(information: IOutputInformation) {
		this.checkOperator();
		if (this.FLAG !== "MULTIPLY") {
			information.operationTokenInfo = this.setOperationToken(this.MULTIPLY);
		}
		information.outputInfo = this.runningTotal.toString();
		this.setOutput(String(this.runningTotal));
		this.pendingOperation = this.MULTIPLY;
		this.pendingValue = null;
		this.FLAG = "MULTIPLY";
		return information;
	}

	div(information: IOutputInformation) {
		this.checkOperator();
		if (this.FLAG !== "DIV") {
			information.operationTokenInfo = this.setOperationToken(this.DIV);
		}
		information.outputInfo = this.runningTotal.toString();
		this.setOutput(String(this.runningTotal));
		this.pendingOperation = this.DIV;
		this.pendingValue = null;
		this.FLAG = "DIV";
		return information;
	}

	// calculator
	calculate() {
		if (!this.newNumber) {
			this.pendingValue = this.toNumber(this.output);
			this.lastValue = this.pendingValue;
		}

		if (this.pendingOperation === this.ADD) {
			if (this.FLAG === "ADD") {
				this.CURRENT_VALUE = this.runningTotal;
				this.runningTotal += this.runningTotal;
			} else {
				this.runningTotal += this.pendingValue;
			}
			this.lastOperation = this.ADD;
		} else if (this.pendingOperation === this.SUBSTRACT) {
			if (this.FLAG === "SUBSTRACT") {
				this.CURRENT_VALUE = this.runningTotal;
				this.runningTotal -= this.runningTotal;
			} else {
				this.runningTotal -= this.pendingValue;
			}
			this.lastOperation = this.SUBSTRACT;
		} else if (this.pendingOperation === this.MULTIPLY) {
			if (this.FLAG === "MULTIPLY") {
				this.CURRENT_VALUE = this.runningTotal;
				this.runningTotal = this.runningTotal * this.runningTotal;
			} else {
				this.runningTotal = this.runningTotal * this.pendingValue;
			}
			this.lastOperation = this.MULTIPLY;
		} else if (this.pendingOperation === this.DIV) {
			if (this.FLAG === "DIV") {
				this.CURRENT_VALUE = this.runningTotal;
				this.runningTotal = this.runningTotal / this.runningTotal;
			} else {
				this.runningTotal = this.runningTotal / this.pendingValue;
			}
			this.lastOperation = this.DIV;
		} else {
			if (this.lastOperation) {
				if (this.lastOperation === this.ADD) {
					if (this.FLAG === "NUMBER") {
						this.runningTotal = this.pendingValue + this.CURRENT_VALUE;
						} else {
							this.runningTotal += this.CURRENT_VALUE;
						}
					} else {
					if (this.lastOperation === this.SUBSTRACT) {
						if (this.FLAG === "NUMBER") {
							this.runningTotal = this.pendingValue - this.CURRENT_VALUE;
							} else {
								this.runningTotal -= this.CURRENT_VALUE;
							}
					} else if (this.lastOperation === this.MULTIPLY) {
						if (this.FLAG === "NUMBER") {
							this.runningTotal = this.pendingValue * this.CURRENT_VALUE;
							} else {
								this.runningTotal = this.runningTotal * this.CURRENT_VALUE;
							}
						} else {
						if (this.FLAG === "NUMBER") {
							this.runningTotal = this.pendingValue / this.CURRENT_VALUE;
							} else {
								this.runningTotal = this.runningTotal / this.CURRENT_VALUE;
							}
						}
					}
				} else {
					this.runningTotal = 0;
				}
		}
		this.setOutput(this.runningTotal.toString());
		this.setOperationToken(null);
		if (this.pendingValue && !this.SET_CURRENT_VALUE) {
			this.CURRENT_VALUE = this.pendingValue;
		}
		this.pendingOperation = null;
		this.pendingValue = null;
		this.FLAG = "";
		this.SET_CURRENT_VALUE = false;
		return this.runningTotal;
	}

	clear() {
		this.pendingValue = null;
		this.runningTotal = null;
		this.pendingOperation = null;
		this.lastOperation = null;
		this.FLAG = null;
		this.SET_CURRENT_VALUE = false;
		this.CURRENT_VALUE = 0;
		this.setOutput("0");
		this.setOperationToken(null);
		return "";
	}

	setOperationToken(operation: string) {
		if (this.FLAG === "NUMBER") {
			if (operation === this.ADD) {
				this.operationToken += this.output + " " + this.ADD_TOKEN + "  ";
			} else if (operation === this.SUBSTRACT) {
				this.operationToken += this.output + " " + this.SUBTRACT_TOKEN + "  ";
			} else if (operation === this.MULTIPLY) {
				this.operationToken += this.output + " " + this.MULTIPLY_TOKEN + "  ";
			} else if (operation === this.DIV) {
				this.operationToken += this.output + " " + this.DIV_TOKEN + "  ";
			} else {
				this.operationToken = "";
			}
		} else if (this.FLAG === null) {
			this.operationToken = "";
		} else {
			this.operationToken = this.runningTotal + " " + (operation === this.SUBSTRACT ? this.SUBTRACT_TOKEN :
			(operation === this.MULTIPLY ? this.MULTIPLY_TOKEN : (operation === this.ADD ? this.ADD_TOKEN :
			this.DIV_TOKEN))) + "  ";
		}
		return this.operationToken;
	}

	setOutput(outputString: string) {
		this.output = outputString;
		this.newNumber = true;
	}

	checkOperator() {
		if (this.pendingValue !== null) {
			if (this.runningTotal && this.pendingOperation === this.SUBSTRACT) {
				this.runningTotal -= this.pendingValue;
			} else if (this.runningTotal && this.pendingOperation === this.ADD) {
				this.runningTotal += this.pendingValue;
			} else if (this.runningTotal && this.pendingOperation === this.MULTIPLY) {
				this.runningTotal = this.runningTotal * this.pendingValue;
			} else if (this.runningTotal && this.pendingOperation === this.DIV) {
				this.runningTotal = this.runningTotal / this.pendingValue;
			} else {
				this.runningTotal = this.pendingValue;
			}
		}
	}
};

// main interface
interface IOutputInformation {
	outputInfo: string;
	operationTokenInfo: string;
}

// implement function
window.onload = function () {
	var cal = new Calculator("0", true, null, "", "", null, null, null, null, true);
	var IOutputInformation = { outputInfo: "", operationTokenInfo: "" };
	$(".numberbutton").click(function () {
		$("#output").text(string => cal.updateOutput($(this).val()));
	});

	$(".numberdoublebutton").click(function () {
		$("#output").text(string => cal.updateOutput($(this).val()));
	});

	$("#add").click(function () {
		var info = cal.add(IOutputInformation);
		$("#operationToken").text(string => info.operationTokenInfo);
		$("#output").text(string => info.outputInfo);
	});

	$("#subtract").click(function () {
		var info = cal.subtract(IOutputInformation);
		$("#operationToken").text(string => info.operationTokenInfo);
		$("#output").text(string => info.outputInfo);
	});

	$("#multiply").click(function () {
		var info = cal.multiply(IOutputInformation);
		$("#operationToken").text(string => info.operationTokenInfo);
		$("#output").text(string => info.outputInfo);
	});

	$("#div").click(function () {
		var info = cal.div(IOutputInformation);
		$("#operationToken").text(string => info.operationTokenInfo);
		$("#output").text(string => info.outputInfo);
	});

	$("#clear").click(function () {
		$("#output").text(string => "0");
		$("#operationToken").text(string => cal.clear());
	});

	$("#calculate").click(function () {
		$("#output").text(string => cal.calculate().toString());
		$("#operationToken").text(string => "");
	});

	$("#mr").click(function () {
		$("#output").text(string => cal.mrcal());
	});

	$("#ms").click(function () {
		$("#changeOutput").text(string => cal.mscal());
	});

	$("#mc").click(function () {
		$("#changeOutput").text(string => cal.mccal());
	});

	$("#mplus").click(function () {
		$("#changeOutput").text(string => cal.mpluscal());
	});

	$("#msub").click(function () {
		$("#changeOutput").text(string => cal.msubcal());
	});

	$("#percent").click(function () {
		var info = cal.percent(IOutputInformation);
		$("#operationToken").text(string => info.operationTokenInfo);
		$("#output").text(string => info.outputInfo);
	});
};
