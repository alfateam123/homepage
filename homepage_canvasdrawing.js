(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();
 

var x = 0; //canvas.width / 2;
 var y = 0; //canvas.height ;// / 2 ;
 var radius = 300;
 var endPercent = 35;
 var curPerc = 0;
 var counterClockwise = false;
 var circ = Math.PI * 2;
 var quart = Math.PI / 2;
 var drawnitems = 0;
 var offsetFromLine = 50;
 var items = []; //categories;
var canvas;
var context;
var bg = new Image();




function draw_canvas(){
canvas = document.getElementById('a_cute_canvas');
 canvas.width = window.innerWidth - 20;
 canvas.height = window.innerHeight - 20;
context = canvas.getContext('2d');
y = canvas.height;
  items = categories;
  console.log("[draw_canvas]", items);
  load_it();
}

 var load_image = function(){
  bg.src = "wallhaven-5361-adapted.png";
  bg.onload = function() {
    context.drawImage(bg, 0, 0);
    };
  }

 function animate(current) {
     //context.clearRect(0, 0, canvas.width, canvas.height);
     context.beginPath();
     context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
     context.stroke();

     console.log(curPerc);
     if ((curPerc > endPercent>>1) && curPerc >= (drawnitems * (endPercent) / items.length))
     {
        console.log("draw cat!", curPerc, (drawnitems * (endPercent) / items.length), drawnitems);
        drawCat(current);
        //drawnitems %= items.length;
     }
     curPerc++;
     if (curPerc < endPercent) {
         requestAnimationFrame(function () {
             console.log("inside animate", curPerc / 100);
             animate(curPerc / 100)
         });
     }
 }

function drawCat(current){
     var h =    Math.sin(current * 10)*(radius+offsetFromLine);
     var w = y+Math.cos(current *10)*(radius+offsetFromLine);
     console.log("cat!", items[drawnitems].shown_name, current, Math.cos(current *10), Math.sin(current*10), h , w);
    //if(drawnitems >= items.length){
     context.save();
     context.translate(h, w);
     context.rotate(Math.cos(current*10));
     context.fillStyle='white';
     context.font="14pt Calibri";
     context.fillText(items[drawnitems%items.length].shown_name, 0, 0); //h , w );
     context.restore();
    //}
    drawnitems++;
}

document.onkeydown= function(evt){
    //alert(String.fromCharCode(evt.keyCode));
    if(evt.ctrlKey)
    {
        //alert("CTRL!!!!");
        items = categories;
        load_it();
    }
    for(var i=0; i<items.length; i++)
    {
        if(items[i].keycode === String.fromCharCode(evt.keyCode).toLowerCase()){
            if(items[i].category){
                say_it("loading "+items[i].link_properties.link+"...", y/2, y/2);
                redir(items[i].link_properties.link)
            }
            else{
            console.log("got", items[i].keycode)
            items = sites.filter(function(x){return x.category === items[i].name});
            console.log("do items pls", items);
            load_it();
            }
            break;
        }
    }
}

function say_it(text, x, y){
    context.font="14pt Arial";
    context.fillStyle="white"
    context.fillText(text, x, y);
}

function load_it(){
    curPerc=0;
    canvas.width = canvas.width;
     context.lineWidth = 10;
 context.strokeStyle = '#ffffff';
 context.shadowOffsetX = 0;
 context.shadowOffsetY = 0;
 context.shadowBlur = 10;
 context.shadowColor = '#656565';
    load_image();
    drawnitems=0;
    animate(0);
}

//load_it();
//drawCat();