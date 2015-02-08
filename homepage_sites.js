var categories=[];
var sites=[];

function success_handler(data){
  //console.log("success!", data);
  categories = data["categories"];
  sites = data["sites"];
  draw_canvas();
}

function failure_handler(data){
  console.log("failure!", data);
}

var a = new AJAX(false);
a.getJSON("test.json", success_handler, failure_handler);