var output = "0";
    var newNumber = true;
        var pendingOperation = null;
            var operationToken = "";
                var runningTotal = null;
                    var pendingValue = null;
                        var lastValue = null;
                            var lastOperation = null;

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

function updateOutput(btn: string) {
    if (output == "0" || newNumber) {
        output = btn;
        newNumber = false;
    } else {
        output += String(btn);
    }
    pendingValue = toNumber(btn);
    FLAG = "NUMBER";
    return output;
};

function add() {
    checkOperator();
    setOperationToken(ADD);
    setOutput(String(runningTotal));
    pendingOperation = ADD;
    pendingValue = null;
    FLAG = "ADD";
    return operationToken;
};

function subtract() {
    checkOperator();
    setOperationToken(SUBSTRACT);
    setOutput(String(runningTotal));
    pendingOperation = SUBSTRACT;
    pendingValue = null;
    FLAG = "SUBSTRACT";
    return operationToken;
};

function multiply() {
    checkOperator();
    setOperationToken(MULTIPLY);
    setOutput(String(runningTotal));
    pendingOperation = MULTIPLY;
    pendingValue = null
    FLAG = "MULTIPLY";
    return operationToken;
};

function div() {
    checkOperator();
    setOperationToken(DIV);
    setOutput(String(runningTotal));
    pendingOperation = DIV;
    pendingValue = null;
    FLAG = "DIV";
    return operationToken;
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
    FLAG = null
    SET_CURRENT_VALUE = true;
    return runningTotal;
};

function clear() {
    pendingValue = null;
    runningTotal = null;
    pendingOperation = null;
    newNumber = true;
    lastOperation = null;
    FLAG = null;
    SET_CURRENT_VALUE = false;
    CURRENT_VALUE = 0;
    setOutput("0");
    setOperationToken(null);
};

function toNumber(numberString) {
    var result = 0;
    if (numberString) {
        result = numberString * 1;
    }
    return result;
};

function setOperationToken(operation: string) {
    if (operation == ADD) {
        operationToken = ADD_TOKEN;
    } else if (operation == SUBSTRACT) {
        operationToken = SUBTRACT_TOKEN;
    } else if (operation == MULTIPLY) {
        operationToken = MULTIPLY_TOKEN;
    } else if (operation == DIV) {
        operationToken = DIV_TOKEN;
    } else {
        operationToken = "";
    }
};

function setOutput(outputString: string) {
    output = outputString;
    newNumber = true;
};

function checkOperator() {
    if (pendingValue) {
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
    $(".numberbutton").click(function () {
        $("#output").text(updateOutput($(this).val()));
    });

    $(".numberdoublebutton").click(function () {
        $("#output").text(updateOutput($(this).val()));
    });

    $("#add").click(function () {
        $("#operationToken").text(add());
    });

    $("#subtract").click(function () {
        $("#operationToken").text(subtract());
    });

    $("#multiply").click(function () {
        $("#operationToken").text(multiply());
    });

    $("#div").click(function () {
        $("#operationToken").text(div());
    });

    $("#clear").click(function () {
        $("#output").text("0");
        $("#operationToken").text("");
    });

    $("#calculate").click(function () {
        $("#output").text(calculate());
        $("#operationToken").text("");
    });
};
