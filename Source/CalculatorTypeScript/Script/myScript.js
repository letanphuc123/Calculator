/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
// main class
var Calculator = (function () {
    // contructor
    function Calculator(output, newNumber, pendingOperation, operationToken, operationTokenOld, runningTotal, pendingValue, lastValue, lastOperation, enableText) {
        // constant variables
        this.ADD = "adding";
        this.SUBSTRACT = "subtracting";
        this.MULTIPLY = "multiply";
        this.DIV = "div";
        this.ADD_TOKEN = "+";
        this.SUBTRACT_TOKEN = "-";
        this.MULTIPLY_TOKEN = "*";
        this.DIV_TOKEN = "/";
        this.FLAG = null;
        this.CURRENT_VALUE = 0;
        this.SET_CURRENT_VALUE = false;
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
    Calculator.prototype.mrcal = function () {
        this.output = "0";
        return this.output;
    };
    Calculator.prototype.mscal = function () {
        this.enableText = (this.output === "0" ? false : true);
        return this.output === "0" ? "" : "M";
    };
    Calculator.prototype.mccal = function () {
        return (this.enableText ? "" : "");
    };
    Calculator.prototype.mpluscal = function () {
        this.enableText = (this.output === "0" ? false : true);
        return this.output === "0" ? "" : "M";
    };
    Calculator.prototype.msubcal = function () {
        return (this.enableText ? "" : "");
    };
    Calculator.prototype.toNumber = function (numberString) {
        var result = 0;
        if (numberString) {
            result = parseFloat(numberString) * 1;
        }
        return result;
    };
    Calculator.prototype.percent = function (information) {
        var result = String((this.runningTotal * this.toNumber(this.output)) / 100);
        information.outputInfo = result;
        information.operationTokenInfo = this.operationToken + " " + result;
        this.pendingValue = parseFloat(result);
        this.output = result;
        return information;
    };
    Calculator.prototype.updateOutput = function (btn) {
        if (this.output === "0" || this.newNumber) {
            this.output = btn;
            this.newNumber = false;
        }
        else {
            this.output += String(btn);
        }
        this.pendingValue = this.toNumber(this.output);
        this.FLAG = "NUMBER";
        return this.output;
    };
    Calculator.prototype.add = function (information) {
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
    };
    Calculator.prototype.subtract = function (information) {
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
    };
    Calculator.prototype.multiply = function (information) {
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
    };
    Calculator.prototype.div = function (information) {
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
    };
    // calculator
    Calculator.prototype.calculate = function () {
        if (!this.newNumber) {
            this.pendingValue = this.toNumber(this.output);
            this.lastValue = this.pendingValue;
        }
        if (this.pendingOperation === this.ADD) {
            if (this.FLAG === "ADD") {
                this.CURRENT_VALUE = this.runningTotal;
                this.runningTotal += this.runningTotal;
            }
            else {
                this.runningTotal += this.pendingValue;
            }
            this.lastOperation = this.ADD;
        }
        else if (this.pendingOperation === this.SUBSTRACT) {
            if (this.FLAG === "SUBSTRACT") {
                this.CURRENT_VALUE = this.runningTotal;
                this.runningTotal -= this.runningTotal;
            }
            else {
                this.runningTotal -= this.pendingValue;
            }
            this.lastOperation = this.SUBSTRACT;
        }
        else if (this.pendingOperation === this.MULTIPLY) {
            if (this.FLAG === "MULTIPLY") {
                this.CURRENT_VALUE = this.runningTotal;
                this.runningTotal = this.runningTotal * this.runningTotal;
            }
            else {
                this.runningTotal = this.runningTotal * this.pendingValue;
            }
            this.lastOperation = this.MULTIPLY;
        }
        else if (this.pendingOperation === this.DIV) {
            if (this.FLAG === "DIV") {
                this.CURRENT_VALUE = this.runningTotal;
                this.runningTotal = this.runningTotal / this.runningTotal;
            }
            else {
                this.runningTotal = this.runningTotal / this.pendingValue;
            }
            this.lastOperation = this.DIV;
        }
        else {
            if (this.lastOperation) {
                if (this.lastOperation === this.ADD) {
                    if (this.FLAG === "NUMBER") {
                        this.runningTotal = this.pendingValue + this.CURRENT_VALUE;
                    }
                    else {
                        this.runningTotal += this.CURRENT_VALUE;
                    }
                }
                else {
                    if (this.lastOperation === this.SUBSTRACT) {
                        if (this.FLAG === "NUMBER") {
                            this.runningTotal = this.pendingValue - this.CURRENT_VALUE;
                        }
                        else {
                            this.runningTotal -= this.CURRENT_VALUE;
                        }
                    }
                    else if (this.lastOperation === this.MULTIPLY) {
                        if (this.FLAG === "NUMBER") {
                            this.runningTotal = this.pendingValue * this.CURRENT_VALUE;
                        }
                        else {
                            this.runningTotal = this.runningTotal * this.CURRENT_VALUE;
                        }
                    }
                    else {
                        if (this.FLAG === "NUMBER") {
                            this.runningTotal = this.pendingValue / this.CURRENT_VALUE;
                        }
                        else {
                            this.runningTotal = this.runningTotal / this.CURRENT_VALUE;
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
        if (this.pendingValue && !this.SET_CURRENT_VALUE) {
            this.CURRENT_VALUE = this.pendingValue;
        }
        this.pendingOperation = null;
        this.pendingValue = null;
        this.FLAG = "";
        this.SET_CURRENT_VALUE = false;
        return this.runningTotal;
    };
    Calculator.prototype.clear = function () {
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
    };
    Calculator.prototype.setOperationToken = function (operation) {
        if (this.FLAG === "NUMBER") {
            if (operation === this.ADD) {
                this.operationToken += this.output + " " + this.ADD_TOKEN + "  ";
            }
            else if (operation === this.SUBSTRACT) {
                this.operationToken += this.output + " " + this.SUBTRACT_TOKEN + "  ";
            }
            else if (operation === this.MULTIPLY) {
                this.operationToken += this.output + " " + this.MULTIPLY_TOKEN + "  ";
            }
            else if (operation === this.DIV) {
                this.operationToken += this.output + " " + this.DIV_TOKEN + "  ";
            }
            else {
                this.operationToken = "";
            }
        }
        else if (this.FLAG === null) {
            this.operationToken = "";
        }
        else {
            this.operationToken = this.runningTotal + " " + (operation === this.SUBSTRACT ? this.SUBTRACT_TOKEN : (operation === this.MULTIPLY ? this.MULTIPLY_TOKEN : (operation === this.ADD ? this.ADD_TOKEN : this.DIV_TOKEN))) + "  ";
        }
        return this.operationToken;
    };
    Calculator.prototype.setOutput = function (outputString) {
        this.output = outputString;
        this.newNumber = true;
        return "";
    };
    Calculator.prototype.checkOperator = function () {
        if (this.pendingValue !== null) {
            if (this.runningTotal && this.pendingOperation === this.SUBSTRACT) {
                this.runningTotal -= this.pendingValue;
            }
            else if (this.runningTotal && this.pendingOperation === this.ADD) {
                this.runningTotal += this.pendingValue;
            }
            else if (this.runningTotal && this.pendingOperation === this.MULTIPLY) {
                this.runningTotal = this.runningTotal * this.pendingValue;
            }
            else if (this.runningTotal && this.pendingOperation === this.DIV) {
                this.runningTotal = this.runningTotal / this.pendingValue;
            }
            else {
                this.runningTotal = this.pendingValue;
            }
        }
        return "";
    };
    return Calculator;
})();
;
// implement function
window.onload = function () {
    var cal = new Calculator("0", true, null, "", "", null, null, null, null, true);
    var IOutputInformation = { outputInfo: "", operationTokenInfo: "" };
    $("#output").val("0");
    $(".numberbutton").click(function () {
        var _this = this;
        $("#output").val(function (string) { return cal.updateOutput($(_this).val()); });
    });
    $(".numberdoublebutton").click(function () {
        var _this = this;
        $("#output").text(function (string) { return cal.updateOutput($(_this).val()); });
    });
    $("#add").click(function () {
        var info = cal.add(IOutputInformation);
        $("#operationToken").text(function (string) { return info.operationTokenInfo; });
        $("#output").val(function (string) { return info.outputInfo; });
    });
    $("#subtract").click(function () {
        var info = cal.subtract(IOutputInformation);
        $("#operationToken").text(function (string) { return info.operationTokenInfo; });
        $("#output").val(function (string) { return info.outputInfo; });
    });
    $("#multiply").click(function () {
        var info = cal.multiply(IOutputInformation);
        $("#operationToken").text(function (string) { return info.operationTokenInfo; });
        $("#output").val(function (string) { return info.outputInfo; });
    });
    $("#div").click(function () {
        var info = cal.div(IOutputInformation);
        $("#operationToken").text(function (string) { return info.operationTokenInfo; });
        $("#output").val(function (string) { return info.outputInfo; });
    });
    $("#clear").click(function () {
        $("#output").val(function (string) { return "0"; });
        $("#operationToken").text(function (string) { return cal.clear(); });
    });
    $("#calculate").click(function () {
        $("#output").val(function (string) { return cal.calculate().toString(); });
        $("#operationToken").text(function (string) { return ""; });
    });
    $("#mr").click(function () {
        $("#output").val(function (string) { return cal.mrcal(); });
    });
    $("#ms").click(function () {
        $("#changeOutput").text(function (string) { return cal.mscal(); });
    });
    $("#mc").click(function () {
        $("#changeOutput").text(function (string) { return cal.mccal(); });
    });
    $("#mplus").click(function () {
        $("#changeOutput").text(function (string) { return cal.mpluscal(); });
    });
    $("#msub").click(function () {
        $("#changeOutput").text(function (string) { return cal.msubcal(); });
    });
    $("#percent").click(function () {
        var info = cal.percent(IOutputInformation);
        $("#operationToken").text(function (string) { return info.operationTokenInfo; });
        $("#output").val(function (string) { return info.outputInfo; });
    });
};
//# sourceMappingURL=myScript.js.map