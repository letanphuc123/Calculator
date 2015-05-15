/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="interface.ts" />
/// <reference path="mytypescript.ts" />

// implement function
window.onload = function () {
	var resultInformation = <CalculatorModule.IResultInformation>{
		_outputString: "0", _newNumber: true,
		_flag: CalculatorModule.ConstantFlag.isNumber, _result: 0, _resultToken: ""
	};
	var cal = new CalculatorModule.Calculator(resultInformation._outputString, resultInformation._newNumber,
		resultInformation._flag, resultInformation._result, resultInformation._resultToken);

	$("#resultValue").val(cal._result.toString());
	$(".calbtnumber").click(function () {
		$("#resultValue").val(string => cal.getResultOutput($(this).val()).toString());
	});

	$("#calPlus").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.add);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});
	$("#calSub").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.sub);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});

	$("#calDiv").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.div);
		$("#resultValue").val(string => resultOperation.result.toString());
		$("#resultToken").text(string => resultOperation.resultToken);
	});

	$("#calMul").click(function () {
		var resultOperation = cal.getResultOperation(CalculatorModule.ConstantVariable.mult);
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