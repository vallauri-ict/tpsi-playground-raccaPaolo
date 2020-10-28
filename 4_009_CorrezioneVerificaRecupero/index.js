"use strict";
let intestazioni = ["Gender", "Code", "Price", "Color", "Image"];


window.onload=function () {
	let _table=document.getElementById("table");
	_table.style.width="1020px";
	_table.style.border="2px solid black";
	_table.border="1";

	let _btnInserisci=document.getElementsByTagName("button")[0];
	_btnInserisci.addEventListener("click", function(){
		//window.open("inserisci.html"); nuova finestra
		window.location.href="inserisci.html";
	});

	_table.style.margin="20px auto"
	let list = JSON.parse(localStorage.getItem("orologi.json"))
	console.log(list);
	creaTabella();

	//#region funzioni
	function creaIntestazioni(){
		let _tr= document.createElement("tr");
		_tr.style.backgroundColor="#CCC";//distribuito su ogni cella
		for (const item of intestazioni) {
			let _th= document.createElement("th");
			_th.innerHTML=item;
			_th.style.height="25px";
			_tr.appendChild(_th);
		}
		_table.appendChild(_tr);
	}

	function creaTabella(){
		creaIntestazioni();
		for (const item of list) {
			let gender = item.gender;
			let models = item.models;
			for (const model of models) {
				let code=model.code;
				let price=model.price;
				let swatches = model.swatches;
				for (const swatch of swatches) {
					let color = swatch.color;
					let image= swatch.image;
					let _tr= document.createElement("tr");
					_tr.style.textAlign="center";

					//gender
					let _td = document.createElement("td");
					_td.innerHTML=gender;
					_tr.appendChild(_td);

					//code
					_td = document.createElement("td");
					_td.innerHTML=code;
					_tr.appendChild(_td);

					//price
					_td = document.createElement("td");
					_td.innerHTML=price;
					_tr.appendChild(_td);

					//color
					_td = document.createElement("td");
					_td.innerHTML=color;
					_tr.appendChild(_td);

					//gender
					_td = document.createElement("td");
					let _img = document.createElement("img");
					_img.src="img/"+image;
					_img.style.width="50px";
					_td.appendChild(_img);
					_tr.appendChild(_td);

					_table.appendChild(_tr);
				}
			}
		}
	}

	//#endregion
}

