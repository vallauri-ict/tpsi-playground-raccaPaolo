"use strict"

let _btnColore,_btnDimensione,_btnSfondo,_btnBordo,_btnImg1,_btnImg2,_btnImg3,_imgBox,_btnClear;
let _titolo,_txtSize,_wrapper;
window.onload=function(){
	_btnBordo=document.getElementById("btnBordo");
	_btnColore=document.getElementById("btnColore");
	_btnDimensione=document.getElementById("btnDimensione");
	_btnSfondo=document.getElementById("btnSfondo");
	_btnImg1=document.getElementById("btnImg1");
	_btnImg2=document.getElementById("btnImg2");
	_btnImg3=document.getElementById("btnImg3");
	_imgBox=document.getElementById("imgBox");
	_btnClear=document.getElementById("btnClear");
	_wrapper=document.getElementById("wrapper");
	_titolo=document.getElementById("titolo");
	_txtSize=document.getElementById("txtSize");
	_btnColore.setAttribute("onclick","colore()");
	_btnDimensione.setAttribute("onclick","dimensione()");
	_btnSfondo.setAttribute("onclick","sfondo()");
	_btnBordo.setAttribute("onclick","bordo()");
	_btnImg1.setAttribute("onclick","img(1)");
	_btnImg2.setAttribute("onclick","img(2)");
	_btnImg3.setAttribute("onclick","img(3)");
	_btnClear.setAttribute("onclick","pulisci()");
}
let contCol,contSfo,contBord;
function colore () {
	if(_titolo.style.backgroundColor=="blue"||_titolo.style.backgroundColor==""){//inserisco stringa vuota perchè inizialmente non essendo impostato dinamicamente è questo il valore assunto
		_titolo.style.backgroundColor="yellow";
		_titolo.style.color="blue";
	}
	else{
		_titolo.style.backgroundColor="blue";
		_titolo.style.color="yellow";
	}
}
function dimensione() {
	if (_txtSize.value==""){
		alert("Valore errato");
	}
	else{
		console.log(_txtSize.value.toString())
		_titolo.style.fontSize=_txtSize.value.toString()+"pt";//senza spazi
	}
}
function sfondo() {//applico a wrapper?
	if (_wrapper.style.background==""){
		_wrapper.style.background="#eaeaea url(img/bg.gif) center repeat-y";//non si vede ma funziona, con altre immagini si vede e controllato con debugger
	}
	else{
	_wrapper.style.background="";
	}
}
function bordo() {
	if(_titolo.style.border!=""&&_titolo.style.border!="2px solid red"){
		_titolo.style.border="2px solid red";

	}
	else{
		_titolo.style.border="0px";
	}
}

function img(n) {
	_imgBox.src="img/img"+n+".jpg"
}


function pulisci() {
	_imgBox.src="";
}