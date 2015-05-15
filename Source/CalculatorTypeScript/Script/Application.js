/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="interface.ts" />
/// <reference path="mytypescript.ts" />
// implement function
window.onload = function () {
    var resultInformation = {
        _outputString: "0",
        _newNumber: true,
        _flag: 0 /* isNumber */,
        _result: 0,
        _resultToken: ""
    };
    var cal = new CalculatorModule.Calculator(resultInformation._outputString, resultInformation._newNumber, resultInformation._flag, resultInformation._result, resultInformation._resultToken);
    $("#resultValue").val(cal._result.toString());
    $(".calbtnumber").click(function () {
        var _this = this;
        $("#resultValue").val(function (string) { return cal.getResultOutput($(_this).val()).toString(); });
    });
    $("#calPlus").click(function () {
        var resultOperation = cal.getResultOperation(0 /* add */);
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
    $("#calSub").click(function () {
        var resultOperation = cal.getResultOperation(1 /* sub */);
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
    $("#calDiv").click(function () {
        var resultOperation = cal.getResultOperation(2 /* div */);
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
    $("#calMul").click(function () {
        var resultOperation = cal.getResultOperation(3 /* mult */);
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
    $("#calClear").click(function () {
        var resultOperation = cal.clearResult();
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
    $("#calEqual").click(function () {
        var resultOperation = cal.getFinalResult();
        $("#resultValue").val(function (string) { return resultOperation.result.toString(); });
        $("#resultToken").text(function (string) { return resultOperation.resultToken; });
    });
};
//# sourceMappingURL=Application.js.map