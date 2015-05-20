/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="interface.ts" />
/// <reference path="mytypescript.ts" />

// implement function
window.onload = function () {
	var resultInformation = <CalculatorModule.IResultInformation>{
		_outputString: "0", _isNumber: false,
		_flag: CalculatorModule.ConstantFlag.isNumber, _result: 0, _resultToken: ""
	};
	var cal = new CalculatorModule.Calculator(resultInformation._outputString, resultInformation._isNumber,
		resultInformation._flag, resultInformation._result, resultInformation._resultToken);

	$("#resultValue").val(cal._result.toString());
	$(".calbtnumber").click(function () {
		$("#resultValue").val(string => cal.getResultOutput($(this).val()).toString());
	});

	$("#calPlus").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.add, CalculatorModule.ConstantFlag.isPlus);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});
	$("#calSub").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.sub, CalculatorModule.ConstantFlag.isSub);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});

	$("#calDiv").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.div, CalculatorModule.ConstantFlag.isDiv);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});

	$("#calMul").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.mult, CalculatorModule.ConstantFlag.isMul);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});

	$("#calClear").click(function () {
		var resultOperation = cal.clearResult();
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});

	$("#calEqual").click(function () {
		var resultOperation = cal.getFinalResult();
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken)
	});
}