"use strict"
let _btnNum,_btnOpe,_btnCalcola,_txtDisplay;
let input1=new String;
let input2=new String;
let op1,op2,ris;
let contOper=0;
window.onload=function() {
	_btnNum = document.getElementsByName("btnNum");
	_btnOpe = document.getElementsByName("btnOperatore");
	_btnCalcola = document.getElementById("btnCalcola");
	_txtDisplay = document.getElementById("txtDisplay");
	for (let i = 0; i < _btnNum.length; i++) {
		_btnNum[i].setAttribute("onclick", "numero(" + (_btnNum[i].value) + ")");
	}
	for (let i = 0; i < _btnOpe.length; i++){
		_btnOpe[i].setAttribute("onclick","operazione("+i+")");
	}
}

function numero(valore) {
	if (contOper % 2 == 0) {
		input1 += valore;
	} else if (contOper % 2 == 1) {
		input2 += valore;
	}
	_txtDisplay.value += valore;



}

function operazione(indice) {
if (contOper%2==1){
	alert("Devi prima concludere l'operazione attuale");
}
else {
	op1 = parseInt(input1);
	contOper++;
	 operatore = (_btnOpe[indice].value);

}
_txtDisplay.value=null;
}
let operatore

function calcola() {
op2=parseInt(input2);
if (input1 == "" || input2 == "") {
	alert("Inserisci gli operatori da capo");
	resetta();
}
else{
	//ris=operatore=="+"?op1+op2:operatore=="-"?op1-op2:operatore=="*"?op1*op2:op1/op2;
	 switch (operatore) {
		case "+":
			ris=op1+op2;
			break;
		case "-":
			ris=op1-op2;
			break;
		case "*":
			ris=op1*op2;
			break;
		case "/":
			console.log(op1+" "+op2);
			ris=op1/op2;
			break;
		}
	console.log(ris);
	_txtDisplay.value=ris.toString();
	input1=ris.toString();
	op1=ris;
	contOper=0;
	input2=0;
	}
}

function resetta() {
	op1 = undefined;
	op2 = undefined;
	_txtDisplay.value=null;
	ris=0;
	contOper=0;
	input1="";
	input2="";
}