var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', function ($scope) {
    $scope.output = "0";
    $scope.newNumber = true;
    $scope.pendingOperation = null;
    $scope.operationToken = "";
    $scope.runningTotal = null;
    $scope.pendingValue = null;
    $scope.lastValue = null;
    $scope.lastOperation = null;

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

    $scope.updateOutput = function (btn) {
        if ($scope.output == "0" || $scope.newNumber) {
            $scope.output = btn;
            $scope.newNumber = false;
        } else {
            $scope.output += String(btn);
        }
        $scope.pendingValue = toNumberAngular($scope.output);
        FLAG = "NUMBER";
    };

    $scope.add = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && $scope.pendingOperation == SUBSTRACT) {
                $scope.runningTotal -= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == MULTIPLY) {
                $scope.runningTotal = $scope.runningTotal * $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == DIV) {
                $scope.runningTotal = $scope.runningTotal / $scope.pendingValue;
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationTokenAngular(ADD);
        setOutputAngular(String($scope.runningTotal));
        $scope.pendingOperation = ADD;
        $scope.pendingValue = null;
        FLAG = "ADD";
    };

    $scope.subtract = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && $scope.pendingOperation == SUBSTRACT) {
                $scope.runningTotal -= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == MULTIPLY) {
                $scope.runningTotal = $scope.runningTotal * $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == DIV) {
                $scope.runningTotal = $scope.runningTotal / $scope.pendingValue;
            }  else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationTokenAngular(SUBSTRACT);
        setOutputAngular(String($scope.runningTotal));
        $scope.pendingOperation = SUBSTRACT;
        $scope.pendingValue = null;
        FLAG = "SUBSTRACT";
    };

    $scope.multiply = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && $scope.pendingOperation == SUBSTRACT) {
                $scope.runningTotal -= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == MULTIPLY) {
                $scope.runningTotal = $scope.runningTotal * $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == DIV) {
                $scope.runningTotal = $scope.runningTotal / $scope.pendingValue;
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationTokenAngular(MULTIPLY);
        setOutputAngular(String($scope.runningTotal));
        $scope.pendingOperation = MULTIPLY;
        $scope.pendingValue = null
        FLAG = "MULTIPLY";
    };

    $scope.div = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && $scope.pendingOperation == SUBSTRACT) {
                $scope.runningTotal -= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == MULTIPLY) {
                $scope.runningTotal = $scope.runningTotal * $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == DIV) {
                $scope.runningTotal = $scope.runningTotal / $scope.pendingValue;
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationTokenAngular(DIV);
        setOutputAngular(String($scope.runningTotal));
        $scope.pendingOperation = DIV;
        $scope.pendingValue = null;
        FLAG = "DIV";
    };

    $scope.calculate = function () {
        if (!$scope.newNumber) {
            $scope.pendingValue = toNumberAngular($scope.output);
            $scope.lastValue = $scope.pendingValue;
        }

        if ($scope.pendingOperation == ADD) {
            if (FLAG == "ADD") {
                CURRENT_VALUE = $scope.runningTotal;
                $scope.runningTotal += $scope.runningTotal;
            } else {
                $scope.runningTotal += $scope.pendingValue;
            }
            $scope.lastOperation = ADD;
        } else if ($scope.pendingOperation == SUBSTRACT) {
            if (FLAG == "SUBSTRACT") {
                CURRENT_VALUE = $scope.runningTotal;
                $scope.runningTotal -= $scope.runningTotal;
            } else {
                $scope.runningTotal -= $scope.pendingValue;
            }
            $scope.lastOperation = SUBSTRACT;
        } else if ($scope.pendingOperation == MULTIPLY) {
            if (FLAG == "MULTIPLY") {
                CURRENT_VALUE = $scope.runningTotal;
                $scope.runningTotal = $scope.runningTotal * $scope.runningTotal;
            } else {
                $scope.runningTotal = $scope.runningTotal * $scope.pendingValue;
            }
            $scope.lastOperation = MULTIPLY;
        } else if ($scope.pendingOperation == DIV) {
            if (FLAG == "DIV") {
                CURRENT_VALUE = $scope.runningTotal;
                $scope.runningTotal = $scope.runningTotal / $scope.runningTotal;
            } else {
                $scope.runningTotal = $scope.runningTotal / $scope.pendingValue;
            }
            $scope.lastOperation = DIV;
        } else {
            if ($scope.lastOperation) {
                if ($scope.lastOperation == ADD) {
                    if (FLAG == "NUMBER") {
                        $scope.runningTotal = $scope.pendingValue + CURRENT_VALUE;
                    } else {
                        $scope.runningTotal += CURRENT_VALUE;
                    }
                } else {
                    if ($scope.lastOperation == SUBSTRACT) {
                        if (FLAG == "NUMBER") {
                            $scope.runningTotal = $scope.pendingValue - CURRENT_VALUE;
                        } else {
                            $scope.runningTotal -= CURRENT_VALUE;
                        }
                    } else if ($scope.lastOperation == MULTIPLY) {
                        if (FLAG == "NUMBER") {
                            $scope.runningTotal = $scope.pendingValue * CURRENT_VALUE;
                        } else {
                            $scope.runningTotal = $scope.runningTotal * CURRENT_VALUE;
                        }
                    } else {
                        if (FLAG == "NUMBER") {
                            $scope.runningTotal = $scope.pendingValue / CURRENT_VALUE;
                        } else {
                            $scope.runningTotal = $scope.runningTotal / CURRENT_VALUE;
                        }
                    }
                } 
            } else {
                $scope.runningTotal = 0;
            }
        }
        setOutputAngular($scope.runningTotal);
        setOperationTokenAngular();
        if ($scope.pendingValue && !SET_CURRENT_VALUE)
            CURRENT_VALUE = $scope.pendingValue;
        $scope.pendingOperation = null;
        $scope.pendingValue = null;
        FLAG = null
        SET_CURRENT_VALUE = true;
    };

    $scope.clear = function () {
        $scope.pendingValue = null;
        $scope.runningTotal = null;
        $scope.pendingOperation = null;
        $scope.newNumber = true;
        $scope.lastOperation = null;
        FLAG = null;
        SET_CURRENT_VALUE = false;
        CURRENT_VALUE = 0;
        setOutputAngular("0");
        setOperationTokenAngular();
    };

    toNumberAngular = function (numberString) {
        var result = 0;
        if (numberString) {
            result = numberString * 1;
        }

        return result;
    };

    setOperationTokenAngular = function (operation) {
        if (operation == ADD) {
            $scope.operationToken = ADD_TOKEN;
        } else if (operation == SUBSTRACT) {
            $scope.operationToken = SUBTRACT_TOKEN;
        } else if (operation == MULTIPLY) {
            $scope.operationToken = MULTIPLY_TOKEN;
        } else if (operation == DIV) {
            $scope.operationToken = DIV_TOKEN;
        } else {
            $scope.operationToken = "";
        }
    };

    setOutputAngular = function (outputString) {
        $scope.output = outputString;
        $scope.newNumber = true;
    };
}]);