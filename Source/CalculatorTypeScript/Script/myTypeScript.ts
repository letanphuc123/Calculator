// main class
class Calculator implements IResultFunction {
	getResultOperation() {

	}
}

// main interface
interface IResultInformation {
	result: string;
	resultToken: string;
}

interface IResultFunction {
	getResultOperation();
}

// implement function
window.onload = function () {
	$("#resultValue").val("0");
	$(".calbtnumber").click(function () {
		//$("#resultValue").val(string => );
	});
}