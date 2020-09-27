"use strict"
let _lstImmagini,_radioBtns,_imgBox,_imgRoll
window.onload=function () {
	_lstImmagini=document.getElementById("lstImmagini");
	_radioBtns=document.getElementsByName("opt");
	_imgBox=document.getElementById("imgBox");
	_imgRoll=document.getElementById("imgRoll");
	_imgBox.style.backgroundImage=("url('img/img1.jpg')");//attenzione a apici per annidare stringhe
	_imgRoll.style.backgroundImage=("url('img/img1.jpg')");
	for (let i=0;i<_radioBtns.length;i++){
		_radioBtns[i].addEventListener("click", function () { cambiaImmagine(this.value)});//this riferisce al radio button preso in considerazione
	}
}

function cambiaImmagine(num) {
	//faccio corrispondere listBox e radioBtn
	_lstImmagini.value=num;
	_radioBtns[num].checked=true;
	//conversione stringa-numero
	let imgNum=parseInt(num)+1;
	_imgBox.style.backgroundImage="url('img/img"+imgNum+".jpg')";


}
function rollOn() {
	let nImg=generaNumero(2,4);
	_imgRoll.style.backgroundImage=("url('img/img"+nImg+".jpg')");
	
}
function rollOff() {
	_imgRoll.style.backgroundImage=("url('img/img1.jpg')");
}

function generaNumero(min,max){
	let n = Math.floor((max-min+1)*Math.random()+min);//estremi inclusi
	return n;
}