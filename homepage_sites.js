function success_handler(data){
    console.log("success!", data);
	return data;
}

function failure_handler(data){
    console.log("failure!", data);
    return data;
}

var a = new AJAX(false);
a.getJSON("test.json", success_handler, failure_handler);