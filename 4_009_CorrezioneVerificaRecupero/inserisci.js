"use strict";

window.onload=function () {
	let list = JSON.parse(localStorage.getItem("orologi.json"))
	let _txtCode=document.getElementById("txtCode");
	let _txtPrice=document.getElementById("txtPrice");
	let _lstColor=document.getElementById("lstColor");
	let _btnSalva=document.getElementById("btnSalva");
	let _btnAnnulla=document.getElementById("btnAnnulla");
	let _radioGender=document.getElementsByName("gender");
	_btnAnnulla.addEventListener("click",function(){
		window.location.href="index.html";
	})
	
	_btnSalva.addEventListener("click",function(){
		let code=_txtCode.value;
		let price=_txtPrice.value;
		let color = _lstColor.value.toLowerCase();//se non trova value mette innerHtml dell'elemento selezionato
		let gender=_radioGender[0].checked?"male":"female";
		/*let gender;
		for (const _item of _radioGender) {
			gender=value;
			break;
		}*/

		//test del gender
		let models;
		if(gender=="male"){
			models=list[0].models;
		}else{
			models=list[1].models;
		}
		//creo new swatch
		let newSwatch={};//potrei creare struttura direttamente qui dentro
		newSwatch.code=code;
		newSwatch.price=price;
		newSwatch.swatches=[{"color":color,"image":color+"_cardigan.jpg"}];
		//newSwatch.swatches.push({"image":color+"_cardigan.jpg"});
		//aggiungo swatch a list
		models.push(newSwatch);
		localStorage.setItem("orologi.json",JSON.stringify(list));
		window.location.href="index.html";
	}
	)



	
}

