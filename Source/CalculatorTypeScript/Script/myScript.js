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
var Calculator = (function () {
    // Contructor
    function Calculator(output, newNumber, pendingOperation, operationToken, operationTokenOld, runningTotal, pendingValue, lastValue, lastOperation, enableText) {
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
    Calculator.prototype.mrcal = function () {
        this.output = "0";
        return this.output;
    };
    Calculator.prototype.mscal = function () {
        this.enableText = (this.output == "0" ? false : true);
        return this.output == "0" ? "" : "M";
    };
    Calculator.prototype.mccal = function () {
        return (this.enableText ? "" : "");
    };
    Calculator.prototype.mpluscal = function () {
        this.enableText = (this.output == "0" ? false : true);
        return this.output == "0" ? "" : "M";
    };
    Calculator.prototype.msubcal = function () {
        return (this.enableText ? "" : "");
    };
    Calculator.prototype.toNumber = function (numberString) {
        var result = 0;
        if (numberString) {
            result = numberString * 1;
        }
        return result;
    };
    Calculator.prototype.percent = function (information) {
        var result = String((this.runningTotal * this.toNumber(this.output)) / 100);
        information.outputInfo = result;
        information.operationTokenInfo = this.operationToken + " " + result;
        this.pendingValue = toFloat(result);
        this.output = result;
        return information;
    };
    Calculator.prototype.updateOutput = function (btn) {
        if (this.output == "0" || this.newNumber) {
            this.output = btn;
            this.newNumber = false;
        }
        else {
            this.output += String(btn);
        }
        this.pendingValue = this.toNumber(this.output);
        FLAG = "NUMBER";
        return this.output;
    };
    Calculator.prototype.add = function (information) {
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
    };
    Calculator.prototype.subtract = function (information) {
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
    };
    Calculator.prototype.multiply = function (information) {
        this.checkOperator();
        if (FLAG != "MULTIPLY") {
            information.operationTokenInfo = this.setOperationToken(MULTIPLY);
        }
        information.outputInfo = this.runningTotal.toString();
        this.setOutput(String(this.runningTotal));
        this.pendingOperation = MULTIPLY;
        this.pendingValue = null;
        FLAG = "MULTIPLY";
        return information;
    };
    Calculator.prototype.div = function (information) {
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
    };
    // calculator
    Calculator.prototype.calculate = function () {
        if (!this.newNumber) {
            this.pendingValue = this.toNumber(this.output);
            this.lastValue = this.pendingValue;
        }
        if (this.pendingOperation == ADD) {
            if (FLAG == "ADD") {
                CURRENT_VALUE = this.runningTotal;
                this.runningTotal += this.runningTotal;
            }
            else {
                this.runningTotal += this.pendingValue;
            }
            this.lastOperation = ADD;
        }
        else if (this.pendingOperation == SUBSTRACT) {
            if (FLAG == "SUBSTRACT") {
                CURRENT_VALUE = this.runningTotal;
                this.runningTotal -= this.runningTotal;
            }
            else {
                this.runningTotal -= this.pendingValue;
            }
            this.lastOperation = SUBSTRACT;
        }
        else if (this.pendingOperation == MULTIPLY) {
            if (FLAG == "MULTIPLY") {
                CURRENT_VALUE = this.runningTotal;
                this.runningTotal = this.runningTotal * this.runningTotal;
            }
            else {
                this.runningTotal = this.runningTotal * this.pendingValue;
            }
            this.lastOperation = MULTIPLY;
        }
        else if (this.pendingOperation == DIV) {
            if (FLAG == "DIV") {
                CURRENT_VALUE = this.runningTotal;
                this.runningTotal = this.runningTotal / this.runningTotal;
            }
            else {
                this.runningTotal = this.runningTotal / this.pendingValue;
            }
            this.lastOperation = DIV;
        }
        else {
            if (this.lastOperation) {
                if (this.lastOperation == ADD) {
                    if (FLAG == "NUMBER") {
                        this.runningTotal = this.pendingValue + CURRENT_VALUE;
                    }
                    else {
                        this.runningTotal += CURRENT_VALUE;
                    }
                }
                else {
                    if (this.lastOperation == SUBSTRACT) {
                        if (FLAG == "NUMBER") {
                            this.runningTotal = this.pendingValue - CURRENT_VALUE;
                        }
                        else {
                            this.runningTotal -= CURRENT_VALUE;
                        }
                    }
                    else if (this.lastOperation == MULTIPLY) {
                        if (FLAG == "NUMBER") {
                            this.runningTotal = this.pendingValue * CURRENT_VALUE;
                        }
                        else {
                            this.runningTotal = this.runningTotal * CURRENT_VALUE;
                        }
                    }
                    else {
                        if (FLAG == "NUMBER") {
                            this.runningTotal = this.pendingValue / CURRENT_VALUE;
                        }
                        else {
                            this.runningTotal = this.runningTotal / CURRENT_VALUE;
                        }
                    }
                }
            }
            else {
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
    };
    Calculator.prototype.clear = function () {
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
    };
    Calculator.prototype.setOperationToken = function (operation) {
        if (FLAG == "NUMBER") {
            this.operationTokenOld = this.operationToken + this.output + " ";
            if (operation == ADD) {
                this.operationToken += this.output + " " + ADD_TOKEN + "  ";
            }
            else if (operation == SUBSTRACT) {
                this.operationToken += this.output + " " + SUBTRACT_TOKEN + "  ";
            }
            else if (operation == MULTIPLY) {
                this.operationToken += this.output + " " + MULTIPLY_TOKEN + "  ";
            }
            else if (operation == DIV) {
                this.operationToken += this.output + " " + DIV_TOKEN + "  ";
            }
            else {
                this.operationToken = "";
            }
        }
        else if (FLAG == null) {
            this.operationToken = "";
        }
        else {
            this.operationToken = this.operationTokenOld + (operation == SUBSTRACT ? SUBTRACT_TOKEN : (operation == MULTIPLY ? MULTIPLY_TOKEN : (operation == ADD ? ADD_TOKEN : DIV_TOKEN))) + "  ";
        }
        return this.operationToken;
    };
    Calculator.prototype.setOutput = function (outputString) {
        this.output = outputString;
        this.newNumber = true;
    };
    Calculator.prototype.checkOperator = function () {
        if (this.pendingValue != null) {
            if (this.runningTotal && this.pendingOperation == SUBSTRACT) {
                this.runningTotal -= this.pendingValue;
            }
            else if (this.runningTotal && this.pendingOperation == ADD) {
                this.runningTotal += this.pendingValue;
            }
            else if (this.runningTotal && this.pendingOperation == MULTIPLY) {
                this.runningTotal = this.runningTotal * this.pendingValue;
            }
            else if (this.runningTotal && this.pendingOperation == DIV) {
                this.runningTotal = this.runningTotal / this.pendingValue;
            }
            else {
                this.runningTotal = this.pendingValue;
            }
        }
    };
    return Calculator;
})();
;
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
//# sourceMappingURL=myScript.js.map