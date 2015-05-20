/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="mytypescript.ts" />
// implement function
window.onload = function () {
    var cal = new CalculatorModule.Calculator("0", false, 0 /* isNumber */, 0, "", 0, false, "");
    var valueElement = $(".calbody #resultValue");
    var tokenElement = $(".calbody #resultToken");
    valueElement.val(cal._result.toString());
    $(".calbody .calbtnumber").click(function () {
        showResultElement(cal.getResultOutput($(this).val()).toString(), tokenElement.text());
    });
    $(".calbody #calPlus").click(function () {
        var resultOperation = cal.getResultOperation(0 /* add */, 1 /* isPlus */);
        showResultElement(resultOperation.result.toString(), resultOperation.resultToken);
    });
    $(".calbody #calSub").click(function () {
        var resultOperation = cal.getResultOperation(1 /* sub */, 2 /* isSub */);
        showResultElement(resultOperation.result.toString(), resultOperation.resultToken);
    });
    $(".calbody #calDiv").click(function () {
        var resultOperation = cal.getResultOperation(2 /* div */, 3 /* isDiv */);
        showResultElement(resultOperation.result.toString(), resultOperation.resultToken);
    });
    $(".calbody #calMul").click(function () {
        var resultOperation = cal.getResultOperation(3 /* mult */, 4 /* isMul */);
        showResultElement(resultOperation.result.toString(), resultOperation.resultToken);
    });
    $(".calbody #calClear").click(function () {
        var resultOperation = cal.clearResult();
        showResultElement(resultOperation.result.toString(), resultOperation.resultToken);
    });
    $(".calbody #calEqual").click(function () {
        var resultOperation = cal.getFinalResult();
        showResultElement(resultOperation.result.toString(), resultOperation.resultToken);
    });
    function showResultElement(value, token) {
        valueElement.val(function (string) { return value; });
        tokenElement.text(function (string) { return token; });
    }
    ;
};
//# sourceMappingURL=Application.js.map