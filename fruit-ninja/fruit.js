function $(id){
	return document.getElementById(id);
}
function addListener(element,e,fn){ 
	return element.addEventListener?element.addEventListener(e,fn,false):element.attachEvent("on" + e,fn);
}
function removeListener(element,e,fn){ 
	return element.removeEventListener?element.removeEventListener(e,fn,false):element.detachEvent("on" + e,fn);
}
var box = $('fruit-nanja');
var flag = 0;
var fruitFlag = [true,true,true];
var runTime = 0;
var fruitxx = new Array();
addListener(box, 'mousedown', function(e){
	var tar = e.target;
	if(tar.id == 'fruit-nanja' || tar.id == 'fruits-1' || tar.id == 'fruits-2' || tar.id == 'fruits-3'){
		flag = 1;
	}
})

addListener(box, 'mouseover', function(e){
	var tar = e.target;
	if(	tar.id == 'fruits-1' || tar.id == 'fruits-2' || tar.id == 'fruits-3'){
		flag = 2;
		var idx = tar.id.substr(7);
		fruitFlag[idx-1]=false;
		drawFruit();
	}
})

addListener(box, 'mouseup', function(e){
	var tar = e.target;
	if(tar.id == 'fruit-nanja' || tar.id == 'fruits-1' || tar.id == 'fruits-2' || tar.id == 'fruits-3'){
		flag = 3;
	}
})

var fruitx = new Array();
var fruity = new Array();
var canvas = $('myCanvas');
var ctx=canvas.getContext('2d');
var deskImg = new Image();
var max = 3;
function init(){


deskImg.src = "images/SKY.jpg";
deskImg.onload = function(){
	ctx.drawImage(deskImg,0,0);
	drawFruit();
	setInterval(reDraw, 50);
}

	for(i=0;i<max;i++){	
		x = Math.random()*800;
		y = Math.random()*500;	
		fruitx[i]=x;
		fruity[i]=y;		
	};
	fruitRandom();
	
setInterval(reStart, 10000);
};

function reStart(){
	runTime = 0;
	fruitRandom();
	reDraw();
	
}
function drawDesk(){
	ctx.drawImage(deskImg,0,0);
	
}
function fruitRandom(){
	for(i=0;i<max;i++){	
	x = Math.random()*800;
	y = Math.random()*500+600;
	
	fruitx[i]=x;
	fruity[i]=y;		
	fruitxx[i]=Math.random()-0.5;
	fruitFlag[i]=true;
	};
}

function fruitMove(){
	for(i=0;i<max;i++){
		fruity[i]=fruity[i] - 10 + runTime*runTime/1000;
		fruitx[i]=fruitx[i] + runTime*fruitxx[i]*0.1;
		
	};
};

function drawFruit(){
	for(var i=0; i<max; i++){
	console.log(fruitFlag[i]);
		if(!fruitFlag[i]){
			ctx.drawImage(img2,fruitx[i],fruity[i]);
		}else{
			ctx.drawImage(img,fruitx[i],fruity[i]);
		}
		$('fruits-'+(i+1)).style.left = fruitx[i]+'px';
		$('fruits-'+(i+1)).style.top = fruity[i]+'px';
	}
}

function reDraw(){
	runTime = runTime + 1;
	fruitMove();
	drawDesk();
	drawFruit();
}

function fruitConflit(i,x,y){
	if(Math.abs(x-fruitx[i])<50||Math.abs(y-fruity[i]<50))
		return false;
	return true;
}
function allConflit(){
	for(i=0;i<10;i++){
		//if()
	}
}
function mouseMove(){
	var clickX=parseInt(window.event.offsetX);
     	var clickY=parseInt(window.event.offsetY);
	ctx.drawImage(img,clickX,clickY);
}

var img=new Image();
img.src="images/A1.png";
var img2 = new Image();
img2.src = "images/A2.png";
img.onload = function(){
	init();
}

function startTime(){
    var target = $("leftTime");
    var value =  target.value;
	if(value>0){
	    value--;
		target.value = value;
		setTimeout(startTime,1000);
	}else{
	    alert("game over ");
	}
}