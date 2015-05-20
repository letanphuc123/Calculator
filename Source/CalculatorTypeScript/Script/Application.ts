/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="mytypescript.ts" />

// implement function
window.onload = function () {
	var cal = new CalculatorModule.Calculator("0", false, CalculatorModule.ConstantFlag.isNumber, 0, "", 0, false, "");
	var valueElement = $(".calbody #resultValue");
	var tokenElement = $(".calbody #resultToken");
	valueElement.val(cal._result.toString());

	$(".calbody .calbtnumber").click(function () {
		showResultElement(cal.getResultOutput($(this).val()).toString(), tokenElement.text());
	});

	$(".calbody #calPlus").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.add, CalculatorModule.ConstantFlag.isPlus);
		showResultElement(resultOperation.result.toString(), resultOperation.resultToken);
	});
	$(".calbody #calSub").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.sub, CalculatorModule.ConstantFlag.isSub);
		showResultElement(resultOperation.result.toString(), resultOperation.resultToken);
	});

	$(".calbody #calDiv").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.div, CalculatorModule.ConstantFlag.isDiv);
		showResultElement(resultOperation.result.toString(), resultOperation.resultToken);
	});

	$(".calbody #calMul").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.mult, CalculatorModule.ConstantFlag.isMul);
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

	function showResultElement(value: string, token: string): void {
		valueElement.val(string => value);
		tokenElement.text(string => token);
	};
}