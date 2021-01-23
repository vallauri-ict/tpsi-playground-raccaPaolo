"use strict";
const X_OFFSET = 180;
const Y_OFFSET = 210;
const MMG = 24*3600*1000; // msec in un giorno
const RIGHE = 18;
const COLONNE = 37;

let ombrelloni;

$(document).ready(function(){	
	
	let _wrapper = $("#wrapper")
	let _mappa = $("#wrapper").children("div")
	let _btnVisualizzaMappa = $("#wrapper").children("button").eq(0)
	//  tag input sono NIPOTI d wrapper
	let _dataInizio = $("#wrapper").find("input").eq(0)
	let _dataFine = $("#wrapper").find("input").eq(1)
	let _msg = $("#wrapper").children("label").eq(2)
	let dataStart;
	let dataEnd;
		
	_mappa.hide();
	_btnVisualizzaMappa.prop("disabled",true);
	_dataFine.prop("disabled",true);
	_dataInizio.on("change",function(){
		_dataFine.prop("disabled",false);
		_dataFine.prop("min",$(this).val());
		dataStart= new Date($(this).val());//definisco oggetto data
		_btnVisualizzaMappa.prop("disabled",true);
		_btnVisualizzaMappa.removeClass("buttonEnabled");
		_dataFine.val("");
		_msg.html("");
	})
	_dataFine.on("change",function(){
		_btnVisualizzaMappa.prop("disabled",false);
		_btnVisualizzaMappa.addClass("buttonEnabled");
		dataEnd= new Date($(this).val())
		_msg.html(`Giorni scelti: ${(dataEnd-dataStart)/MMG+1}`)
	});
	_btnVisualizzaMappa.on("click",function(){
		_mappa.show();
		$.ajax({
			"url":"http://localhost:3000/ombrelloni",
			"error":errore,
			"success":function(data){
				console.log(data);
				ombrelloni=data;
				let pos = 0;
				for (let i = 0; i < RIGHE+1; i++) {
					if(i!=9){
						for (let j = 0; j < COLONNE+1; j++) {
								if(j!=22){
									
									let div = $("<div>");
									div.appendTo(_mappa);
									div.addClass("ombrellone")
									div.css({
										"top":Y_OFFSET+(i*16),
										"left":X_OFFSET+(j*(16)+(-2*i))
									});
									if(!isDisponibile(ombrelloni[pos++])){//ombrelloni[$(".ombrellone").index(div)]
										div.addClass("red");
									}
									else{
										div.on("click",function() {$(this).addClass("blue")});
									}
								}
							}
					}		
				}
			}
		})
	});
	function errore (jqXHR, textStatus, str_error){
		if(jqXHR.status==0)
			alert("connection refused or server timeout");
			else if (jqXHR.status == 200)
			alert("Errore Formattazione dati\n" + jqXHR.responseText);
			else
			alert("Server Error: "+jqXHR.status+ " - " +jqXHR.responseText);
	}
	function isDisponibile(item){
		let pos1= (dataStart-Date.parse(_dataInizio.prop("min")))/MMG;
		let pos2= (dataEnd-Date.parse(_dataInizio.prop("min")))/MMG;
		for (let i = pos1; i < pos2; i++) {
			if(item.stato[i]!=0){
				return false
			}			
		}
		return true;
	}
})



